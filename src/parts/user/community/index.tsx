"use client";

import { Box } from "@chakra-ui/react";
import CommunityLeftContent from "./left-content";
import CommunityMain from "./main";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import useMediaSize from "@/hooks/use-mediasize";
import { useUserSession } from "@/app/context/user-context";
import { useEffect, useState, useMemo } from "react";
import * as signalR from "@microsoft/signalr";
import {
  useGetCategory,
  useGetCategoryChannelCount,
} from "@/services/community";
const Community = () => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const isAbove768 = useMediaSize(768);
  const { isOpen, setIsOpen, profileData, setRedirectModalOpen } =
    useUserSession();

  useEffect(() => {
    if (!profileData?.result?.isSubActive) {
      setRedirectModalOpen(true);
    }
  }, []);
  useEffect(() => {
    if (isAbove768) {
      setIsOpen(false);
    }
  }, [isAbove768]);

  const {
    setChannelCategoryCountFilter,
    refetchChannelCategoryCount,
    getChannelCategoryCountError,
    getChannelCategoryCountData,
  } = useGetCategoryChannelCount();

  const channelRoomIds = useMemo(() => {
    if (!getChannelCategoryCountData) return [];
    return getChannelCategoryCountData.flatMap(
      (item: any) =>
        item.channels?.map((channel: { channelRoomName: string }) =>
          channel.channelRoomName.trim()
        ) || []
    );
  }, [getChannelCategoryCountData]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7013/chatHub")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    return () => {
      newConnection.stop();
    };
  }, []);

  useEffect(() => {
    if (!connection || channelRoomIds.length === 0) return;

    const startConnection = async () => {
      try {
        if (connection.state === signalR.HubConnectionState.Disconnected) {
          await connection.start();
          console.log("Connected to SignalR hub.");

          await connection.invoke("JoinMultipleChannels", channelRoomIds);
          console.log("Joined channels:", channelRoomIds);

          connection.on("ReceiveChannelMessage", (message) => {
            console.log("Received message:", message);
          });
        }
      } catch (error) {
        console.error("SignalR connection error:", error);
      }
    };

    startConnection();

    return () => {
      if (connection.state === signalR.HubConnectionState.Connected) {
        connection.stop();
      }
    };
  }, [connection, channelRoomIds]);
  console.log("others", getChannelCategoryCountData);
  return (
    <div className="max-w-[1440px] mx-auto">
      <Box
        display="flex"
        gap={4}
        overflowY={"auto"}
        my={4}
        justifyContent={"end"}
      >
        <div className="md:block hidden">
          <CommunityLeftContent data={getChannelCategoryCountData} />
        </div>
        <Box
          flex="1"
          marginLeft={{ base: "16px", md: "280px", lg: "349px" }}
          justifySelf={"end"}
        >
          <CommunityMain />
        </Box>
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
          <DialogContent
            className={`left-0 w-[20rem] h-screen overflow-y-auto bg-white p-[2rem] pt-[3.5rem]`}
          >
            <CommunityLeftContent data={getChannelCategoryCountData} />
          </DialogContent>
        </Dialog>
      </Box>
    </div>
  );
};

export default Community;
