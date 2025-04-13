import DropdownComponent from "@/components/drop-down";
import { communityMenuList } from "@/constants";
import { Box } from "@chakra-ui/react";
interface iProps {}
const CommunityLeftContent: React.FC<iProps> = () => {
  return (
    <Box
      overflowY="auto"
      height="md:calc(100vh - 80px) h-full"
      position="fixed"
      left={{ base: 0, md: 3, lg: 5 }}
      flexShrink={0}
      pb={{ base: 3, sm: 8 }}
      zIndex={10}
      className="lg:w-[349px] md:w-[275px] w-full"
    >
      <DropdownComponent
        itemList={communityMenuList}
        header="Community"
        mb={4}
      />
      <DropdownComponent
        itemList={communityMenuList}
        header="Webinar Discussions"
        mb={4}
      />
      <DropdownComponent
        itemList={communityMenuList}
        header="Intelligent Investors"
      />
    </Box>
  );
};

export default CommunityLeftContent;
