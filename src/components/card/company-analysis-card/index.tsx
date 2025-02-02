import { ICompanyAnalysis } from "@/interface/company-analysis";
import { StockFallIcon, StockRiseIcon } from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";
interface ICompanyAnalysisProp {
  analysis: ICompanyAnalysis;
}

const CompanyAnalysisCard: React.FC<ICompanyAnalysisProp> = ({ analysis }) => {
  return (
    <Box bg="#fff" py={"19px"} px="10px" borderRadius={"12px"} w={"100%"}>
      <Box
        className="font-bold xl:text-[36px] lg:text-[32px] text-[28px] flex items-center justify-between gap-[10px] text-[#111928]"
        mb={"10px"}
      >
        <Text>{analysis.count}</Text>
        <div className="flex items-center gap-2.5">
          <Box>
            {analysis?.isProgressive ? <StockRiseIcon /> : <StockFallIcon />}
          </Box>
          <Text color={analysis?.isProgressive ? "#0E9F6E" : "#E74694"}>
            {analysis?.isProgressive ? "+" : "-"}
            {analysis?.value}
          </Text>
        </div>
      </Box>
      <Text color="#6B7280" fontWeight={400} fontSize={12}>
        At close: Nov 25, 16:00 PM (EST)
      </Text>
    </Box>
  );
};

export default CompanyAnalysisCard;
