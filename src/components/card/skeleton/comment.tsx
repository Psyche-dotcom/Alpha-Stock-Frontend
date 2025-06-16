import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

const CommentSkeleton = () => {
  return (
    <Box
      bg="#FFFFFF"
      p={6}
      borderRadius="8px"
      border="1px solid #E5E7EB"
      boxShadow="customLight"
    >
      <Flex alignItems={"center"} gap="8px" mb="11px">
        <SkeletonCircle size="24px" />
        <Skeleton width="120px" height="14px" />
        <Skeleton width="80px" height="12px" />
      </Flex>

      <SkeletonText mt={4} noOfLines={2} spacing="4" />
      <Flex
        py="10px"
        ps={5}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box display="flex" gap={5}>
          <Skeleton width="60px" height="14px" />
          <Skeleton width="60px" height="14px" />
          <Skeleton width="60px" height="14px" />
        </Box>
        <Box>
          <Skeleton width="24px" height="24px" />
        </Box>
      </Flex>

      <Skeleton height="50px" mt={5} />
    </Box>
  );
};

export default CommentSkeleton;
