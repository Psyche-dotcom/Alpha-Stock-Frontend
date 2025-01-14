"use client";
import { ButtonIcon } from "@/components/button/button-icon";
import CompanyAnalysisCard from "@/components/card/company-analysis-card";
import CompanyCard from "@/components/card/company-card";
import CompanyStockCard from "@/components/card/company-stock-card";
import AreaChartComponent from "@/components/charts/area-graph";
import {
  CompanyAnalysisList,
  CompanyStockList,
  trendingList,
} from "@/constants";
import { IButtonFilter } from "@/interface/button-filter";
import { ICompanyAnalysis } from "@/interface/company-analysis";
import { ICompanyStockCard } from "@/interface/company-stock-card";
import { ArrowNarrowRight } from "@/utils/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

const CompanyInfo: React.FC = () => {
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
      <Box display="flex" gap={4} mb={"34.5px"}>
        <CompanyCard />
        <Flex gap={4} flex={1}>
          {CompanyAnalysisList.map(
            (analysis: ICompanyAnalysis, index: number) => (
              <CompanyAnalysisCard analysis={analysis} key={index} />
            )
          )}
        </Flex>
        <Box
          bg="#351F05"
          borderRadius="12px"
          px={"10px"}
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
          w="fit-content"
        >
          <Text fontWeight={600} fontSize={14} color="#fff">
            Download Annual Report
          </Text>
          <ArrowNarrowRight />
        </Box>
      </Box>
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
      <Box mt={8} display="flex" gap={4}>
        <Box borderRadius="12px" p={"10px"} bg={"#fff"} w="100%">
          <Text fontWeight={700} fontSize={24} color="#111928" mb="10px">
            About NVIDIA Corp
          </Text>
          <Text fontWeight={400} fontSize={16}>
            Nvidia Corporation[a] (/ɛnˈvɪdiə/, en-VID-ee-ə) is an
            American multinational corporation and technology
            company headquartered in Santa Clara, California, and incorporated
            in Delaware.[5] It is a software and fabless company which designs
            and supplies graphics processing units (GPUs), application
            programming interfaces (APIs) for data science and high-performance
            computing, as well as system on a chip units (SoCs) for the mobile
            computing and automotive market. Nvidia is also a dominant supplier
            of artificial intelligence (AI) hardware and software.[6][7][8]
            Nvidia's professional line of GPUs are used
            for edge-to-cloud computing and
            in supercomputers and workstations for applications in fields such
            as architecture, engineering and construction, media and
            entertainment, automotive, scientific research, and manufacturing
            design.[9] Its GeForce line of GPUs are aimed at the consumer market
            and are used in applications such as video editing, 3D rendering,
            and PC gaming. With a market share of 80.2% in the second quarter of
            2023,[10] Nvidia leads the market for discrete desktop GPUs by a
            wide margin. The company expanded its presence in the gaming
            industry with the introduction of the Shield Portable (a handheld
            game console), Shield Tablet (a gaming tablet), and Shield
            TV (a digital media player), as well as its cloud
            gaming service GeForce Now.[11]
          </Text>
        </Box>
        <Box borderRadius="12px" p={"10px"} bg="#fff" w="100%" h="fit-content">
          <Text fontWeight={700} fontSize={24} color="#111928" mb="10px">
            Trending Companies
          </Text>
          <Flex wrap="wrap" gap={4}>
            {CompanyStockList.map(
              (company: ICompanyStockCard, index: number) => (
                <Box
                  key={index}
                  flexBasis="calc(50% - 1rem)"
                  maxWidth="calc(50% - 1rem)"
                  flexGrow={1}
                >
                  <CompanyStockCard company={company} />
                </Box>
              )
            )}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyInfo;
