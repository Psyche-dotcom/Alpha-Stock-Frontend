"use client";


import PlanCard from "@/components/card/plan-card";
import { planList } from "@/constants";
import { Box, Flex } from "@chakra-ui/react";
import StockAnalyser from "./stock-analyzer";
import FinancialInsight from "./financial-insight";
import { ISubscription } from "@/types";
import { useState } from "react";

const Plans = () => {
  const [selectedId, setSelectedId] = useState<string>("");

  return (
    <Box mt={8}>
      <Box display={"flex"} justifyContent={"end"} mb={4}>
        <Flex gap={3}>
          {planList?.map((plan: ISubscription, index: number) => (
            <PlanCard
              plan={plan}
              key={index}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ))}
        </Flex>
      </Box>
      <StockAnalyser />
      <FinancialInsight />
    </Box>
  );
};

export default Plans;
