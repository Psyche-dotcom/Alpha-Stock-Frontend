import PlanCard from "@/components/card/plan-card";
import { planList } from "@/constants";
import { IPlan } from "@/interface/plan";
import { Box, Flex } from "@chakra-ui/react";
import AdminStockAnalyser from "./stock-analyzer";
import AdminFinancialInsight from "./financial-insight";

const StockPlans = () => {
  return (
    <Box mt={8}>
      <Box display={"flex"} justifyContent={"end"} mb={4}>
        <Flex gap={3}>
          {planList?.map((plan: IPlan, index: number) => (
            <PlanCard plan={plan} key={index} />
          ))}
        </Flex>
      </Box>
      <AdminStockAnalyser />
      <AdminFinancialInsight />
    </Box>
  );
};

export default StockPlans;
