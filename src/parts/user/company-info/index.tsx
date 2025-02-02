"use client";
import { ButtonIcon } from "@/components/button/button-icon";
import CompanyAnalysisCard from "@/components/card/company-analysis-card";
import CompanyCard from "@/components/card/company-card";
import CompanyStockCard from "@/components/card/company-stock-card";
import AreaChartComponent from "@/components/charts/area-graph";
import { Button } from "@/components/ui/button";
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
    <div>
      <div className="xl:hidden gap-1 bg-[#351F05] mb-3 rounded-[12px] p-4 flex items-center w-fit-content">
        <p className="font-semibold text-sm text-white">
          Download Annual Report
        </p>
        <ArrowNarrowRight />
      </div>
      <div className="lg:flex xl:gap-4 gap-2 mb-[34.5px]">
        <CompanyCard />
        <div className="grid md:grid-cols-2 xl:gap-4 gap-2">
          {CompanyAnalysisList.map(
            (analysis: ICompanyAnalysis, index: number) => (
              <CompanyAnalysisCard analysis={analysis} key={index} />
            )
          )}
        </div>
        <div className="hidden  bg-[#351F05] gap-1 rounded-[12px] px-2.5 xl:flex items-center justify-between w-fit-content">
          <p className="font-semibold text-sm text-white">
            Download Annual Report
          </p>
          <ArrowNarrowRight />
        </div>
      </div>
      <div className="bg-white p-4 rounded-[12px] mb-4">
        <div className="flex gap-2">
          {filterBtn.map((filter: IButtonFilter, index: number) => (
            <Button
              variant={filter?.value === btnFilter ? "secondary" : "ghost"}
              onClick={() => setBtnFilter(filter?.value)}
              className={`${
                filter?.value === btnFilter
                  ? "text-white bg-[#351F05] py-3 px-4"
                  : "text-[#6B7280] P-0"
              }`}
              key={index}
              btnText={filter?.text}
            />
          ))}
        </div>
      </div>
      <AreaChartComponent />
      <div className="mt-8 lg:flex gap-4">
        <div className="rounded-[12px] p-2.5 bg-white w-full">
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
        </div>
        <Box borderRadius="12px" p={"10px"} bg="#fff" w="100%" h="fit-content">
          <Text fontWeight={700} fontSize={24} color="#111928" mb="10px">
            Trending Companies
          </Text>
          <Flex wrap="wrap" display={{ sm: "flex", base: "flex-col" }} gap={4}>
            {CompanyStockList.map(
              (company: ICompanyStockCard, index: number) => (
                <Box
                  key={index}
                  flexBasis={{ sm: "calc(50% - 1rem)" }}
                  maxWidth={{ sm: "calc(50% - 1rem)" }}
                  flexGrow={1}
                  pb={{ base: 3, sm: 0 }}
                >
                  <CompanyStockCard company={company} />
                </Box>
              )
            )}
          </Flex>
        </Box>
      </div>
    </div>
  );
};

export default CompanyInfo;
