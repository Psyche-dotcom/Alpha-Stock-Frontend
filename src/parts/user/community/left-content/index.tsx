import { useUserSession } from "@/app/context/user-context";
import DropdownComponent from "@/components/drop-down";

import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

interface iProps {
  data: any;
}

const CommunityLeftContent: React.FC<iProps> = ({ data }) => {
  const { setSelectedChannel } = useUserSession();
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
      {data?.map((category: any) => {
        // Skip if no channels
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
      {/* <DropdownComponent
        itemList={communityMenuList}
        header="Community"
        mb={4}
      />
     
      <DropdownComponent
        itemList={communityMenuList}
        header="Intelligent Investors"
      /> */}{" "}
    </Box>
  );
};

export default CommunityLeftContent;
