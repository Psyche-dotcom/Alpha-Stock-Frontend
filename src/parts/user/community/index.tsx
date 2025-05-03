"use client";

import { Box } from "@chakra-ui/react";
import CommunityLeftContent from "./left-content";
import CommunityMain from "./main";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useMediaSize from "@/hooks/use-mediasize";
import { useUserSession } from "@/app/context/user-context";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import * as signalR from "@microsoft/signalr";

import {
  useGetCategory,
  useGetCategoryChannelCount,
  useGetChannelMessages,
} from "@/services/community";
import { CommentData, mapApiToComment, mapApiToCommentSignalR } from "@/utils";

const Community = () => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [communityList, setCommunityList] = useState<CommentData[]>([]);
  const isAbove768 = useMediaSize(768);
  const selectedChannelRef = useRef<string | null>(null);
  const {
    isOpen,
    setIsOpen,
    profileData,
    selectedChannel,
    setRedirectModalOpen,
  } = useUserSession();

  const {
    setChannelCategoryCountFilter,
    refetchChannelCategoryCount,
    getChannelCategoryCountData,
  } = useGetCategoryChannelCount();

  const {
    setGetChannelMesaggesFilter,
    getChannelMesaggesData,
    getChannelMesaggesIsLoading,
  } = useGetChannelMessages({ enabled: true });
  console.log("channel", selectedChannel);
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

  // 👇 Setup SignalR connection once
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(process.env.NEXT_PUBLIC_API_URL + "/chatHub")
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
        console.log("Connected to SignalR hub.");
        await connection.invoke("JoinMultipleChannels", channelRoomIds);
        console.log("Joined channels:", channelRoomIds);

        // Register handler once
        connection.off("ReceiveChannelMessage"); // Prevent duplicate handlers
        connection.on("ReceiveChannelMessage", (message) => {
          console.log("Received message:", message);
          console.log("selectedChannel ref:", selectedChannelRef.current);
          console.log("message.roomId:", message.roomId);
          if (message.roomId === selectedChannelRef.current) {
            const newComment = mapApiToCommentSignalR(message);
            console.log("New comment:", newComment);
            setCommunityList((prevList) => [...prevList, newComment]);
          }
        });
      } catch (error) {
        console.error("SignalR connection error:", error);
      }
    };

    startSignalR();
  }, [connection, channelRoomIds, selectedChannel]);

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

  return (
    <div className="max-w-[1440px] mx-auto">
      <Box display="flex" gap={4} overflowY="auto" my={4} justifyContent="end">
        <div className="md:block hidden">
          <CommunityLeftContent data={getChannelCategoryCountData} />
        </div>
        <Box
          flex="1"
          // marginLeft={{ base: "16px", md: "280px", lg: "349px" }}
          justifySelf="end"
        >
          <CommunityMain data={communityList} funSend={sendMessage} isLoading={getChannelMesaggesIsLoading}/>
        </Box>

        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
          <DialogContent className="left-0 w-[20rem] h-screen overflow-y-auto bg-white p-[2rem] pt-[3.5rem]">
            <CommunityLeftContent data={getChannelCategoryCountData} />
          </DialogContent>
        </Dialog>
      </Box>
    </div>
  );
};

export default Community;
