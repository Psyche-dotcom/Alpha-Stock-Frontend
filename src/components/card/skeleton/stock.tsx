import { Box, Text, Skeleton } from "@chakra-ui/react";

const StockSkeletonCard: React.FC = () => {
  return (
    <Box borderRadius={12} p={2.5} w="100%" bg="#FFFFFF">
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={"13px"}
      >
        <Skeleton height="20px" width="40%" />
        <Skeleton height="20px" width="30%" />
      </Box>
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Skeleton height="20px" width="40%" />
        <Skeleton height="20px" width="10%" />
      </Box>
    </Box>
  );
};

export default StockSkeletonCard;
