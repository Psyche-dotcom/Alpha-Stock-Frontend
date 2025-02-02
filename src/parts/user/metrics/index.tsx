"use client";
import { ButtonIcon } from "@/components/button/button-icon";
import CompanyAnalysisCard from "@/components/card/company-analysis-card";
import CompanyCard from "@/components/card/company-card";
import AreaChartComponent from "@/components/charts/area-graph";
import { CompanyAnalysisList, metricsList } from "@/constants";
import { IButtonFilter } from "@/interface/button-filter";
import { ICompanyAnalysis } from "@/interface/company-analysis";
import { ArrowNarrowRight, InformationIcon } from "@/utils/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

const Metrics: React.FC = () => {
  const [btnFilter, setBtnFilter] = useState<string>("daily");
  const filterBtn = [
    { text: "Daily", value: "daily" },
    {
      text: "Weekly",
      value: "weekly",
    },
    {
      text: "Monthly",
      value: "monthly",
    },
    {
      text: "Yearly",
      value: "yearly",
    },
  ];
  return (
    <Box>
      <Box bg={"#fff"} p={4} borderRadius={"12px"} mb={4}>
        <Flex gap={2}>
          {filterBtn.map((filter: IButtonFilter, index: number) => (
            <ButtonIcon
              key={index}
              text={filter?.text}
              variant={filter?.value === btnFilter ? "solid" : "ghost"}
              bg={filter?.value === btnFilter ? "#351F05" : ""}
              fontWeight={500}
              color={filter?.value === btnFilter ? "#ffffff" : "#6B7280"}
              fontSize="12px"
              p={filter?.value === btnFilter ? "12px 16px" : "0px"}
              onClick={() => setBtnFilter(filter?.value)}
            />
          ))}
        </Flex>
      </Box>
      <AreaChartComponent />
      {/* <Box mt={8} display="flex" gap={4}> */}
      <Box display={{ md: "flex" }} gap={4} mt={{ base: 4, md: 8 }}>
        <Box flex={1} borderRadius="12px" bg={"#fff"} mb={{ base: 2, md: 4 }}>
          {metricsList.map((metrics, index: number) => (
            <Box
              p={4}
              border={"1px solid #E5E7EB"}
              display="flex"
              justifyContent={"space-between"}
              alignItems={"center"}
              key={index}
            >
              <Text
                fontWeight={500}
                fontSize={16}
                color="#111928"
                display="inline-flex"
                alignItems={"center"}
              >
                {metrics?.title} <InformationIcon />
              </Text>
              <Text fontWeight={700} fontSize={"16px"} color="#111928">
                {metrics?.text}
              </Text>
            </Box>
          ))}
        </Box>
        <Box borderRadius="12px" flex={1} bg={"#fff"} mb={4}>
          {metricsList.map((metrics, index: number) => (
            <Box
              p={4}
              border={"1px solid #E5E7EB"}
              display="flex"
              justifyContent={"space-between"}
              alignItems={"center"}
              key={index}
            >
              <Text
                fontWeight={500}
                fontSize={16}
                color="#111928"
                display="inline-flex"
                alignItems={"center"}
              >
                {metrics?.title} <InformationIcon />
              </Text>
              <Text fontWeight={700} fontSize={"16px"} color="#111928">
                {metrics?.text}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
      <Box display={{ md: "flex" }} gap={4} mt={{ base: 4, md: 8 }}>
        <Box borderRadius="12px" bg={"#fff"} flex={1} mb={{ base: 2, md: 4 }}>
          {metricsList.map((metrics, index: number) => (
            <Box
              p={4}
              border={"1px solid #E5E7EB"}
              display="flex"
              justifyContent={"space-between"}
              alignItems={"center"}
              key={index}
            >
              <Text
                fontWeight={500}
                fontSize={16}
                color="#111928"
                display="inline-flex"
                alignItems={"center"}
              >
                {metrics?.title} <InformationIcon />
              </Text>
              <Text fontWeight={700} fontSize={"16px"} color="#111928">
                {metrics?.text}
              </Text>
            </Box>
          ))}
        </Box>
        <Box borderRadius="12px" bg={"#fff"} flex={1}>
          {metricsList.map((metrics, index: number) => (
            <Box
              p={4}
              border={"1px solid #E5E7EB"}
              display="flex"
              justifyContent={"space-between"}
              alignItems={"center"}
              key={index}
            >
              <Text
                fontWeight={500}
                fontSize={16}
                color="#111928"
                display="inline-flex"
                alignItems={"center"}
              >
                {metrics?.title} <InformationIcon />
              </Text>
              <Text fontWeight={700} fontSize={"16px"} color="#111928">
                {metrics?.text}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
      {/* </Box> */}
    </Box>
  );
};

export default Metrics;
