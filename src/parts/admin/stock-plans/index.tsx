"use client";

import PlanCard from "@/components/card/plan-card";
import { planList } from "@/constants";
import { IPlan } from "@/interface/plan";
import { Box, Flex } from "@chakra-ui/react";
import AdminStockAnalyser from "./stock-analyzer";
import AdminFinancialInsight from "./financial-insight";
import { ButtonIcon } from "@/components/button/button-icon";
import { useState } from "react";
import { EditPlanIcon, ViewPlanIcon } from "@/utils/icons";
import AddStockPlan from "./add-stock-plan";

const StockPlans = () => {
  const [selectOption, setSelectOption] = useState<string>("view");

  const btnOption = [
    {
      id: 1,
      text: "View Plan",
      value: "view",
      icon: <ViewPlanIcon />,
    },
    {
      id: 2,
      text: "Edit Plan",
      value: "edit",
      icon: <EditPlanIcon />,
    },
    {
      id: 3,
      text: "New Plan",
      value: "create",
      icon: <ViewPlanIcon />,
    },
  ];

  return (
    <Box mt={8}>
      {selectOption === "create" ? (
        <AddStockPlan setSelectOption={setSelectOption} />
      ) : (
        <Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mb={4}
            alignItems="end"
          >
            <Flex gap={3}>
              {btnOption.map((btn, index: number) => (
                <ButtonIcon
                  key={index}
                  text={btn?.text}
                  variant={selectOption === btn?.value ? "solid" : "outline"}
                  border={
                    selectOption === btn?.value ? "" : "1px solid #291804"
                  }
                  bg={selectOption === btn?.value ? "#351F05" : ""}
                  fontWeight={500}
                  color={selectOption === btn?.value ? "#ffffff" : "#291804"}
                  fontSize="18px"
                  p={"12px 16px"}
                  flexDirection="row-reverse"
                  icon={btn.icon}
                  gap={2}
                  onClick={() => setSelectOption(btn?.value)}
                />
              ))}
            </Flex>
            <Flex gap={3}>
              {planList?.map((plan: IPlan, index: number) => (
                <PlanCard plan={plan} key={index} />
              ))}
            </Flex>
          </Box>
          <AdminStockAnalyser selectOption={selectOption} />
          <AdminFinancialInsight selectOption={selectOption} />
        </Box>
      )}
    </Box>
  );
};

export default StockPlans;
