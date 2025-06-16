import { Box, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const SingleCardSkeleton: React.FC = () => {
  return (
    <Box
      borderRadius="12px"
      p={2}
      display={"flex"}
      alignItems={"end"}
      bg="#f5f5f5"
      flex={1}
    >
      <Box
        borderRadius={12}
        p={2.5}
        w="100%"
        bg="#FFFFFF"
        maxWidth="702px"
        mt={{ base: "217px", md: "0px" }}
      >
        <Skeleton height="36px" width="60%" mb={2.5} />
        <Skeleton height="12px" width="40%" mb={2.5} />
        <Box display={"flex"} mt={2.5}>
          <Box
            border="1px solid #614E38"
            borderRadius={"16px"}
            display="flex"
            alignItems={"center"}
            gap={2.5}
            p={"2px"}
            bg="#EBE9E6"
            maxWidth={"702px"}
          >
            <SkeletonCircle size="32px" />
            <Skeleton height="14px" width="50%" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleCardSkeleton;
