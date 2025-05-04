import { useUserSession } from "@/app/context/user-context";
import DropdownComponent from "@/components/drop-down";

import { Box, Text } from "@chakra-ui/react";
import { BookmarkCheck } from "lucide-react";
import { useEffect } from "react";

interface iProps {
  data: any;
}

const CommunityLeftContent: React.FC<iProps> = ({ data }) => {
  const { setSelectedChannel, setShowSavedMessages } = useUserSession();
  useEffect(() => {
    const firstChannelRoomName = data.find(
      (category: any) => category.channels.length > 0
    )?.channels[0]?.channelRoomName;

    if (firstChannelRoomName !== null && firstChannelRoomName !== undefined) {
      setSelectedChannel(firstChannelRoomName);
    }
  }, [data]);

  return (
    <Box
      overflowY="auto"
      height="md:calc(100vh - 80px) h-full"
      position="sticky"
      top={0}
      left={{ base: 0, md: 3, lg: 5 }}
      flexShrink={0}
      pb={{ base: 3, sm: 8 }}
      zIndex={1}
      className="lg:w-[349px] md:w-[275px] w-full"
    >
      <Box
        bg="#ffffff"
        color="#111928"
        border="1px solod #E5E7EB"
        borderRadius="8px"
        w={"100%"}
        display="flex"
        gap={"5px"}
        alignItems={"center"}
        px={5}
        py={4}
        cursor={"pointer"}
        mb={3}
        onClick={() => setShowSavedMessages("messages")}
      >
        <Text fontWeight={500} fontSize="16px">
          Saved Messages
        </Text>
        <BookmarkCheck size={16} />
      </Box>
      {data?.map((category: any) => {
        if (!category.channels || category.channels.length === 0) return null;

        const itemList = category.channels.map((channel: any) => ({
          id: channel.id,
          text: `# ${channel.name.trim()}`,
          roomid: channel.channelRoomName,
          ...(channel.unreadCount > 0 && { count: channel.unreadCount }),
        }));

        return (
          <DropdownComponent
            key={category.categoryId}
            itemList={itemList}
            header={category.categoryName}
            mb={4}
          />
        );
      })}
    </Box>
  );
};

export default CommunityLeftContent;
