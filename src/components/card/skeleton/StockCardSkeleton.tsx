import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const StockCardSkeleton: React.FC = () => {
  return (
    <Box borderRadius={12} p={2.5} w="100%" bg="#FFFFFF">
      {/* Title and Total Skeleton */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb="13px"
      >
        <Skeleton height="20px" width="40%" />
        <Skeleton height="24px" width="20%" />
      </Box>
      {/* Value and Icon Skeleton */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Skeleton height="20px" width="30%" />
        <Skeleton height="24px" width="24px" borderRadius="full" />
      </Box>
    </Box>
  );
};

export default StockCardSkeleton;
