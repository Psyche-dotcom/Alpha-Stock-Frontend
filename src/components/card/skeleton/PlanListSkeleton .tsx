import { Box, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";

const PlanListSkeleton = () => {
  return (
    <Box display={"flex"} justifyContent={"end"} mb={4}>
      <Flex gap={3}>
        {[...Array(3)].map((_, index) => (
          <Box key={index} w="200px" h="300px">
            <Skeleton height="100%" width="100%" borderRadius="lg" />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default PlanListSkeleton;
