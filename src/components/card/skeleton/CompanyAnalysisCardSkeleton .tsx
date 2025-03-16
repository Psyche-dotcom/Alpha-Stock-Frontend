import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const CompanyAnalysisCardSkeleton = () => {
  return (
    <Box bg="#fff" py={"19px"} px="10px" borderRadius={"12px"} w={"100%"}>
      <Box
        className="font-bold xl:text-[36px] lg:text-[32px] text-[28px] flex items-center justify-between gap-[10px] text-[#111928]"
        mb={"10px"}
      >
        <Skeleton height="40px" width="60px" />

        <Box className="flex items-center gap-2.5">
          <Skeleton height="24px" width="24px" borderRadius="50%" />
          <Skeleton height="24px" width="60px" />
        </Box>
      </Box>

      <SkeletonText noOfLines={1} skeletonHeight="14px" width="80%" />
    </Box>
  );
};

export default CompanyAnalysisCardSkeleton;
