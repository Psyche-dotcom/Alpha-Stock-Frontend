import { Box } from "@chakra-ui/react";

const WishlistSkeleton: React.FC = () => {
  return (
    <Box
      border="1px solid #C2BAB2"
      px={4}
      py={2}
      borderRadius="12px"
      bg="#fff"
      opacity={0.5}
      pointerEvents="none"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box bg="#E5E7EB" borderRadius="4px" width="50px" height="14px" />
        <Box bg="#E5E7EB" borderRadius="50%" width="20px" height="20px" />
      </Box>

      <Box display="flex" justifyContent="space-between" mb={4}>
        <Box className="flex items-center gap-[10px] mb-2.5">
          <Box bg="#E5E7EB" borderRadius="4px" width="20px" height="20px" />
          <Box bg="#E5E7EB" borderRadius="4px" width="100px" height="20px" />
        </Box>
        <Box bg="#E5E7EB" borderRadius="4px" width="60px" height="24px" />
      </Box>

      <Box display="flex" justifyContent="space-between" mb={4}>
        <Box className="flex items-center gap-[10px] mb-2.5">
          <Box bg="#E5E7EB" borderRadius="4px" width="20px" height="20px" />
          <Box bg="#E5E7EB" borderRadius="4px" width="50px" height="14px" />
        </Box>
        <Box className="flex items-center gap-[10px] mb-2.5">
          <Box bg="#E5E7EB" borderRadius="4px" width="20px" height="20px" />
          <Box bg="#E5E7EB" borderRadius="4px" width="50px" height="14px" />
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Box className="flex items-center gap-[10px] mb-2.5">
          <Box bg="#E5E7EB" borderRadius="4px" width="20px" height="20px" />
          <Box bg="#E5E7EB" borderRadius="4px" width="100px" height="14px" />
        </Box>
        <Box bg="#E5E7EB" borderRadius="50%" width="20px" height="20px" />
      </Box>
    </Box>
  );
};

export default WishlistSkeleton;
