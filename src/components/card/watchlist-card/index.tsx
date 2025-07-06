import { IWatchlistData } from "@/interface/company-stock-card";
import {
  AlarmIcon,
  DeletePreferenceIcon,
  StockFallIcon, // Re-import StockFallIcon
  StockRiseIcon, // Re-import StockRiseIcon
} from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Create a motion-enabled Chakra Box component
const MotionBox = motion(Box);

interface IWatchlistProp {
  watchlist: IWatchlistData;
  handlePreference: () => void;
  handleDelete: () => void;
}

const WatchlistCard: React.FC<IWatchlistProp> = ({
  watchlist,
  handleDelete,
  handlePreference,
}) => {
  // State to manage image source for fallback.
  const [currentImgSrc, setCurrentImgSrc] = useState<string | null>(
    watchlist?.imgUrl || null
  );

  // Reset currentImgSrc when watchlist.imgUrl changes to try loading new image
  useEffect(() => {
    setCurrentImgSrc(watchlist?.imgUrl || null);
  }, [watchlist?.imgUrl]);

  return (
    <Box
      border="1px solid"
      borderColor="gray.300"
      px={4}
      py={4}
      borderRadius="12px"
      bg="white"
      boxShadow="sm"
      display="flex"
      flexDirection="column"
      gap={4}
      width="100%"
    >
      {/* Top Section: Company Logo, Symbol, and Current Price */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={2.5}>
          {/* Stock Logo Container */}
          <Box
            className="w-10 h-10 flex-shrink-0"
            borderRadius="full"
            bg="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
            border="1px solid"
            borderColor="gray.200"
          >
            {currentImgSrc ? (
              <Image
                width={40}
                height={40}
                alt={`${watchlist?.stockSymbols} company logo`}
                src={currentImgSrc}
                className="rounded-full object-cover w-full h-full"
                onError={() => setCurrentImgSrc(null)}
              />
            ) : null}
          </Box>
          <Text fontSize="xl" fontWeight="bold" color="gray.800">
            {watchlist?.stockSymbols}
          </Text>
        </Box>
        <Text fontSize="3xl" fontWeight="semibold" color="gray.700">
          ${watchlist?.price?.toFixed(2) || "N/A"}
        </Text>
      </Box>

      {/* Limits Section: Upper and Lower Limits with Animated Stock Icons */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* Upper Limit */}
        <Box display="flex" alignItems="center" gap={2}>
          <StockRiseIcon /> {/* Use StockRiseIcon */}
          <Text fontSize="md" fontWeight="semibold" color="gray.600">
            High: ${watchlist?.upperLimit?.toFixed(2) || "N/A"}
          </Text>
        </Box>

        {/* Lower Limit */}
        <Box display="flex" alignItems="center" gap={2}>
          <StockFallIcon /> {/* Use StockFallIcon */}
          <Text fontSize="md" fontWeight="semibold" color="gray.600">
            Low: ${watchlist?.lowerLimit?.toFixed(2) || "N/A"}
          </Text>
        </Box>
      </Box>

      {/* Bottom Section: Action Buttons */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          cursor="pointer"
          onClick={handlePreference}
          _hover={{ opacity: 0.8 }}
        >
          <AlarmIcon />
          <Text fontSize="md" fontWeight="semibold">
            Edit Preferences
          </Text>
        </Box>
        <Box
          cursor="pointer"
          onClick={handleDelete}
          color="red.500"
          _hover={{ opacity: 0.8 }}
        >
          <DeletePreferenceIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default WatchlistCard;
