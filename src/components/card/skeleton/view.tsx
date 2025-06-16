import { Box, Skeleton } from "@chakra-ui/react";

const SkeletonViewCard: React.FC = () => {
  return (
    <Box
      borderRadius="12px"
      p={2}
      h={"345px"}
      display={"flex"}
      alignItems={"end"}
      bg="#f5f5f5"
    >
      <Box borderRadius={12} p={2.5} w="100%" bg="#FFFFFF">
        <Skeleton height="20px" width="80%" mb={2.5} />
        <Skeleton height="15px" width="50%" mb={2.5} />
        <Skeleton height="10px" width="60%" mb={2.5} />
        <Skeleton height="40px" width="32px" borderRadius="50%" />
        <Box mt={2.5}>
          <Skeleton height="20px" width="50%" />
        </Box>
      </Box>
    </Box>
  );
};

export default SkeletonViewCard;
