import { ICompanyAnalysis } from "@/interface/company-analysis";
import { StockFallIcon, StockRiseIcon } from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Helper function to get yesterday's date in "MMM DD" format
const getYesterdayDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return yesterday.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
};

function calculatePercentageChange(
  currentValue: string,
  changeValue: number
): string {
  // Convert currentValue to a number if it's a string
  const numericCurrentValue =
    typeof currentValue === "string" ? parseFloat(currentValue) : currentValue;

  // Input validation
  if (isNaN(numericCurrentValue) || isNaN(changeValue)) {
    console.error(
      "Invalid input: currentValue or changeValue is not a valid number."
    );
    return "NaN%";
  }

  const originalValue = numericCurrentValue - changeValue;
  let rawPercentage; // To hold the calculated number before formatting

  if (originalValue === 0) {
    if (changeValue === 0) {
      rawPercentage = 0; // No change from zero
    } else {
      // If original was 0 and there was a change, it's an infinite percentage
      rawPercentage = Infinity; // Always positive infinity for absolute value
    }
  } else {
    // Standard percentage calculation, then get the absolute value
    rawPercentage = Math.abs((changeValue / originalValue) * 100);
  }

  // --- Final Formatting to 2 Decimal Places ---
  if (rawPercentage === Infinity) {
    return "∞%"; // Return infinity symbol without a sign
  } else {
    // For finite numbers, format to 2 decimal places.
    // toFixed already handles the absence of a '+' sign for positive numbers
    // and removes the '-' for negative numbers when used on Math.abs() result.
    return `${rawPercentage.toFixed(2)}%`;
  }
}

// Create a motion-enabled Chakra Box component
const MotionBox = motion(Box);

const CompanyAnalysisCard: React.FC<ICompanyAnalysis> = ({
  count,
  isProgressive,
  value,
  isOpen,
}) => {
  const yesterdayDate = getYesterdayDate();
  const percentageChange = calculatePercentageChange(count, value);
  const openTime = "09:30 AM";
  const closeTime = "04:00 PM";

  // Define the animation variants for the up and down movement
  const iconAnimationVariants = {
    // Animation for when isProgressive is true (StockRiseIcon)
    rise: {
      // FIX: Changed "0%" to "0px" for consistency
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
      // FIX: Changed "0%" to "0px" for consistency
      y: ["0px", "5px", "0px"], // Moves down 5px and back
      transition: {
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  return (
    <Box bg="#fff" py={"19px"} px="10px" borderRadius={"12px"} w={"100%"}>
      <Box
        className="font-bold xl:text-[36px] lg:text-[32px] text-[28px] flex items-center justify-between gap-[10px] text-[#111928]"
        mb={"10px"}
      >
        <Text>{"$" + count}</Text>
        <div className="flex items-center gap-2.5">
          <MotionBox
            variants={iconAnimationVariants}
            animate={isProgressive ? "rise" : "fall"}
          >
            {isProgressive ? <StockRiseIcon /> : <StockFallIcon />}
          </MotionBox>
          <Text color={isProgressive ? "#0E9F6E" : "#E74694"}>
            ${value} ({percentageChange})
          </Text>
        </div>
      </Box>
      <Text color="#6B7280" fontWeight={400} fontSize={12}>
        {isOpen ? (
          <>
            {" "}
            At open: {yesterdayDate}, {openTime} (EST)
          </>
        ) : (
          <>
            {" "}
            At close: {yesterdayDate}, {closeTime} (EST)
          </>
        )}
      </Text>
    </Box>
  );
};

export default CompanyAnalysisCard;
