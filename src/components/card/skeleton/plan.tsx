import { Box } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";

const PlanSkeleton = () => {
  return (
    <Box p={6} bg="#fff" borderRadius="8px" w="100%">
      <Skeleton height="20px" width="150px" mb={2} />

      <Skeleton height="20px" width="100px" mb={2} />

      <Skeleton height="20px" width="130px" />
    </Box>
  );
};

export default PlanSkeleton;
