import DropdownComponent from "@/components/drop-down";
import { communityMenuList } from "@/constants";
import { Box } from "@chakra-ui/react";

const CommunityLeftContent = () => {
  return (
    <Box width={349}>
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
