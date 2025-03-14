"use client";

import { Box } from "@chakra-ui/react";
import CommunityLeftContent from "./left-content";
import CommunityMain from "./main";
import CommunityRightContent from "./right-content";

const Community = () => {
  return (
    <Box display="flex" gap={4} mt={8}>
      <CommunityLeftContent />
      <Box flex="1">
        <CommunityMain />
      </Box>
      <CommunityRightContent />
    </Box>
  );
};

export default Community;
