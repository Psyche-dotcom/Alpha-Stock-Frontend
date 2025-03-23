import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const MetricsSkeleton = () => (
  <Box
    p={4}
    border="1px solid #E5E7EB"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
  >
    <Skeleton height="20px" width="150px" />
    <Skeleton height="20px" width="50px" />
  </Box>
);

export default MetricsSkeleton;
