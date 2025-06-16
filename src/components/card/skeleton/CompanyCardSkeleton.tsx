import { Box, Skeleton, SkeletonText, Flex } from "@chakra-ui/react";

const CompanyCardSkeleton = () => {
  return (
    <Box className="flex-1 py-[10px] px-[17px] bg-white rounded-[12px] mb-2 lg:mb-0">
      {/* Company Logo and Name */}
      <Flex align="center" gap="10px" mb="2.5">
        <Skeleton width="40px" height="40px" borderRadius="full" />
        <Skeleton height="36px" width="70%" />
      </Flex>

      {/* Price */}
      <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="12px" />

      {/* Add to Watchlist */}
      <Flex justify="space-between" align="center" mt="4">
        <Skeleton height="16px" width="60%" />
        <Flex align="center" gap="8px">
          <Skeleton height="20px" width="20px" borderRadius="full" />
          <Skeleton height="16px" width="100px" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default CompanyCardSkeleton;
