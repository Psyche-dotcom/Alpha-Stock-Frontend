import DropdownComponent from "@/components/drop-down";
import { communityMenuList } from "@/constants";
import { Box } from "@chakra-ui/react";

const CommunityRightContent = () => {
  return (
    <Box width={349}>
      <DropdownComponent
        itemList={communityMenuList}
        header="# Announcements"
        count={6}
        mb={4}
      />
      <DropdownComponent
        itemList={communityMenuList}
        header="Intelligent Investors"
        count={6}
      />
    </Box>
  );
};

export default CommunityRightContent;
