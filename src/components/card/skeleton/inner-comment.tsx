import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

const InnerCommentSkeleton = () => {
  return (
    <Box
      bg="#FFFFFF"
      p={1}
      borderRadius="8px"
      border="1px solid #E5E7EB"
      boxShadow="customLight"
    >
      <Flex alignItems={"center"} gap="8px" mb="11px">
        <SkeletonCircle size="24px" />
        <Skeleton width="100%" height="14px" />
        <Skeleton width="100%" height="12px" />
      </Flex>

      <SkeletonText mt={4} noOfLines={2} spacing="4" />
    </Box>
  );
};

export default InnerCommentSkeleton;
