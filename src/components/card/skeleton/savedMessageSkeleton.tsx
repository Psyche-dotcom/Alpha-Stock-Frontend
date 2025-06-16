"use client";

import { Box, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";

const SavedMessageCardSkeleton = () => {
  return (
    <Box
      bg="#FFFFFF"
      p={{ base: 3, sm: 4, md: 6 }}
      borderRadius="8px"
      border="1px solid #E5E7EB"
      boxShadow="customLight"
    >
      <Flex alignItems="center" gap="8px" mb="11px">
        <Skeleton
          height="24px"
          width="24px"
          borderRadius="full"
          flexShrink={0}
        />
        <Skeleton height="14px" width="100px" />
        <Skeleton height="12px" width="60px" ml="auto" />
      </Flex>

      <SkeletonText noOfLines={2} spacing="4px" skeletonHeight="14px" mb={4} />

      <Skeleton height="148px" width="100%" borderRadius="4px" mb={4} />
    </Box>
  );
};

export default SavedMessageCardSkeleton;
