import PlanCard from "@/components/card/plan-card";
import { planList } from "@/constants";
import { IPlan } from "@/interface/plan";
import { Box, Flex } from "@chakra-ui/react";
import StockAnalyser from "./stock-analyzer";
import FinancialInsight from "./financial-insight";

const Plans = () => {
  return (
    <Box mt={8}>
      <Box display={"flex"} justifyContent={"end"} mb={4}>
        <Flex gap={3}>
          {planList?.map((plan: IPlan, index: number) => (
            <PlanCard plan={plan} key={index} />
          ))}
        </Flex>
      </Box>
      <StockAnalyser />
      <FinancialInsight />
    </Box>
  );
};

export default Plans;
