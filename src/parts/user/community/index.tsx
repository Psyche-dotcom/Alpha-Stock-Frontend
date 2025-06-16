"use client";

import { Box } from "@chakra-ui/react";
import CommunityLeftContent from "./left-content";
import CommunityMain from "./main";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useMediaSize from "@/hooks/use-mediasize";
import { useUserSession } from "@/app/context/user-context";
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import * as signalR from "@microsoft/signalr";

import {
  useGetCategory,
  useGetCategoryChannelCount,
  useGetChannelMessages,
  useGetChannelReplyMessages,
} from "@/services/community";
import {
  mapApiToComment,
  mapApiToCommentReply,
  mapApiToCommentSignalR,
} from "@/utils";
import { CommentData, IComments } from "@/interface/comment";
import { useAdminSession } from "@/app/context/admin-context";
interface RoleTYpe {
  roleType: string;
}
const Community: React.FC<RoleTYpe> = ({ roleType }) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [communityList, setCommunityList] = useState<CommentData[]>([]);
  const [messageReplyList, setMessageReplyList] = useState<IComments[]>([]);
  const isAbove768 = useMediaSize(768);
  const selectedChannelRef = useRef<string | null>(null);
  const {
    isOpen,
    setIsOpen,
    profileData,
    selectedChannel,
    selectedReplyChannel,
    setRedirectModalOpen,
  } = roleType == "User" ? useUserSession() : useAdminSession();

  const {
    setChannelCategoryCountFilter,
    refetchChannelCategoryCount,
    getChannelCategoryCountData,
  } = useGetCategoryChannelCount();

  const {
    setGetChannelMesaggesFilter,
    getChannelMesaggesData,
    refetchGetChannelMesagges,
    getChannelMesaggesIsLoading,
  } = useGetChannelMessages({ enabled: true });
  const {
    setGetChannelMesaggesReplyFilter,
    getChannelMesaggesReplyData,
    refetchGetChannelMesaggesReply,
    getChannelMesaggesReplyIsLoading,
  } = useGetChannelReplyMessages({ enabled: selectedReplyChannel !== null });

  // 👇 Enforce Subscription Check
  useEffect(() => {
    if (!profileData?.result?.isSubActive) {
      setRedirectModalOpen(true);
    }
  }, [profileData]);

  // 👇 Dialog UI for small screens
  useEffect(() => {
    if (isAbove768) {
      setIsOpen(false);
    }
  }, [isAbove768]);
  useEffect(() => {
    selectedChannelRef.current = selectedChannel;
  }, [selectedChannel]);
  // 👇 Refetch messages for selected channel
  useEffect(() => {
    if (selectedChannel) {
      setGetChannelMesaggesFilter({ roomid: selectedChannel });
    }
  }, [selectedChannel, setGetChannelMesaggesFilter]);
  useEffect(() => {
    if (selectedReplyChannel) {
      setGetChannelMesaggesReplyFilter({ messageid: selectedReplyChannel });
    }
  }, [selectedReplyChannel, setGetChannelMesaggesReplyFilter]);

  // 👇 Extract room IDs
  const channelRoomIds = useMemo(() => {
    if (!getChannelCategoryCountData) return [];
    return getChannelCategoryCountData.flatMap(
      (item: any) =>
        item.channels?.map((channel: { channelRoomName: string }) =>
          channel.channelRoomName.trim()
        ) || []
    );
  }, [getChannelCategoryCountData]);

  // 👇 Set initial message list
  useEffect(() => {
    if (getChannelMesaggesData && getChannelMesaggesData.length > 0) {
      setCommunityList(getChannelMesaggesData.map(mapApiToComment));
    }
  }, [getChannelMesaggesData]);
  useEffect(() => {
    if (getChannelMesaggesReplyData && getChannelMesaggesReplyData.length > 0) {
      setMessageReplyList(
        getChannelMesaggesReplyData.map(mapApiToCommentReply)
      );
    }
  }, [getChannelMesaggesReplyData]);

  // 👇 Setup SignalR connection once
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(process.env.NEXT_PUBLIC_API_URL + "/chatHub")
      //.withUrl("https://localhost:7013" + "/chatHub")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    return () => {
      newConnection.stop();
    };
  }, []);

  // 👇 Handle connection start and message receiving
  useEffect(() => {
    if (
      !connection ||
      connection.state !== signalR.HubConnectionState.Disconnected ||
      channelRoomIds.length === 0
    )
      return;

    const startSignalR = async () => {
      try {
        await connection.start();

        await connection.invoke("JoinMultipleChannels", channelRoomIds);

        // Register handler once
        connection.off("ReceiveChannelMessage"); // Prevent duplicate handlers
        connection.on("ReceiveChannelMessage", (message) => {
          if (message.roomId === selectedChannelRef.current) {
            const newComment = mapApiToCommentSignalR(message);

            setCommunityList((prevList) => [...prevList, newComment]);
          }
        });
      } catch (error) {
        console.error("SignalR connection error:", error);
      }
    };

    startSignalR();
  }, [connection, channelRoomIds, selectedChannel, selectedReplyChannel]);

  // 👇 Send message function
  const sendMessage = useCallback(
    async (message: string, messageType: string) => {
      if (connection && selectedChannel) {
        try {
          await connection.invoke(
            "SendMessageToChannel",
            selectedChannel,
            message,
            messageType,
            profileData?.result?.id,
            false
          );
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }
    },
    [connection, selectedChannel, profileData]
  );
  const sendReplyMessage = useCallback(
    async (message: string) => {
      if (connection && selectedChannel) {
        try {
          await connection.invoke(
            "SendMessageToChannel",
            selectedReplyChannel,
            message,
            "Text",
            profileData?.result?.id,
            true
          );
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }
    },
    [connection, selectedReplyChannel, profileData]
  );

  return (
    <div className="max-w-[1440px] mx-auto">
      <Box display="flex" gap={4} overflowY="auto" my={4} justifyContent="end">
        <div className="md:block hidden">
          <CommunityLeftContent
            data={getChannelCategoryCountData}
            roleType={roleType}
          />
        </div>
        <Box
          flex="1"
          // marginLeft={{ base: "16px", md: "280px", lg: "349px" }}
          justifySelf="end"
        >
          <CommunityMain
            roleType={roleType}
            commentDataInfo={messageReplyList}
            data={communityList}
            funSend={sendMessage}
            funSendReply={sendReplyMessage}
            refreshChannelMessage={refetchGetChannelMesagges}
            isLoading={getChannelMesaggesIsLoading}
          />
        </Box>

        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
          <DialogContent className="left-0 w-[20rem] h-screen overflow-y-auto bg-white p-[2rem] pt-[3.5rem]">
            <CommunityLeftContent
              data={getChannelCategoryCountData}
              roleType={roleType}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </div>
  );
};

export default Community;
