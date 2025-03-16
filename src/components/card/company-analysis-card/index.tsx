import { ICompanyAnalysis } from "@/interface/company-analysis";
import { StockFallIcon, StockRiseIcon } from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";

// Helper function to get yesterday's date in "MMM DD" format
const getYesterdayDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return yesterday.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
};

const CompanyAnalysisCard: React.FC<ICompanyAnalysis> = ({
  count,
  isProgressive,
  value,
  isOpen,
}) => {
  const yesterdayDate = getYesterdayDate();
  const openTime = "09:30 AM";
  const closeTime = "04:00 PM";

  return (
    <Box bg="#fff" py={"19px"} px="10px" borderRadius={"12px"} w={"100%"}>
      <Box
        className="font-bold xl:text-[36px] lg:text-[32px] text-[28px] flex items-center justify-between gap-[10px] text-[#111928]"
        mb={"10px"}
      >
        <Text>{count}</Text>
        <div className="flex items-center gap-2.5">
          <Box>{isProgressive ? <StockRiseIcon /> : <StockFallIcon />}</Box>
          <Text color={isProgressive ? "#0E9F6E" : "#E74694"}>
            {isProgressive ? "+" : ""}
            {value}
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
