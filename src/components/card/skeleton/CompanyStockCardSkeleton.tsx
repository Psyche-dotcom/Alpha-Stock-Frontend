import { Skeleton, SkeletonText, Box, Text, Flex } from "@chakra-ui/react";

const CompanyStockCardSkeleton = () => {
  return (
    <Box border="1px solid #C2BAB2" px={4} py={2} borderRadius="12px">
      <Flex justify="space-between" align="center" mb={2.5}>
        <Flex align="center" gap={2}>
          <Skeleton height="20px" width="100px" />
        </Flex>
        <Skeleton height="30px" width="80px" />
      </Flex>
      <Flex justify="space-between" align="center">
        <Skeleton height="20px" width="50px" />
        <Skeleton boxSize="24px" />
      </Flex>
    </Box>
  );
};

export default CompanyStockCardSkeleton;
