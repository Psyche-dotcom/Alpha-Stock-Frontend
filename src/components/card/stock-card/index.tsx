import { IStock } from "@/interface/stock-view";
import { StockFallIcon, StockRiseIcon } from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface IStockProps {
  stock: IStock;
}

// Create a motion-enabled Chakra Box component
const MotionBox = motion(Box);

const StockCard: React.FC<IStockProps> = ({ stock }) => {
  // Define the animation variants for the up and down movement
  const iconAnimationVariants = {
    // Animation for when isProgressive is true (StockRiseIcon)
    rise: {
      y: ["0px", "-5px", "0px"], // Moves up 5px and back
      transition: {
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
    // Animation for when isProgressive is false (StockFallIcon)
    fall: {
      y: ["0px", "5px", "0px"], // Moves down 5px and back
      transition: {
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  // Helper function to format numbers to 2 decimal places
  const formatToTwoDecimals = (num: number | string | undefined) => {
    if (typeof num === 'number') {
      return num.toFixed(2);
    }
    if (typeof num === 'string' && !isNaN(parseFloat(num))) {
      return parseFloat(num).toFixed(2);
    }
    return num; // Return as is if not a valid number
  };

  return (
    <Box borderRadius={12} p={2.5} w="100%" bg="#FFFFFF">
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={"13px"}
      >
        <Text
          color={"#111928"}
          fontSize={{ base: 16, lg: 20 }}
          fontWeight={700}
        >
          {stock?.title}
        </Text>
        <Text
          color={"#6B7280"}
          fontSize={{ base: 20, xl: 24 }}
          fontWeight={600}
        >
          ${formatToTwoDecimals(stock?.total)} {/* Formatted to 2 decimal places */}
        </Text>
      </Box>
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        {/* Text for value and percent */}
        <Box>
          <Text color={stock?.isProgressive ? "#0E9F6E" : "#E74694"}>
            ${formatToTwoDecimals(stock?.value)} ({formatToTwoDecimals(stock?.percent)}%) {/* Formatted to 2 decimal places */}
          </Text>
        </Box>
        {/* Bouncing icon moved to the other side */}
        <Box>
          <MotionBox
            variants={iconAnimationVariants}
            animate={stock?.isProgressive ? "rise" : "fall"}
          >
            {stock?.isProgressive ? <StockRiseIcon /> : <StockFallIcon />}
          </MotionBox>
        </Box>
      </Box>
    </Box>
  );
};
export default StockCard;
