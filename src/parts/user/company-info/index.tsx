"use client";

import CompanyAnalysisCard from "@/components/card/company-analysis-card";
import CompanyCard from "@/components/card/company-card";
import CompanyStockCard from "@/components/card/company-stock-card";
import AreaChartComponent from "@/components/charts/area-graph";
import { Button } from "@/components/ui/button";
import { IButtonFilter } from "@/interface/button-filter";
import { ICompanyStockCard } from "@/interface/company-stock-card";
import { IStockComponent } from "@/interface/stock";
import { ArrowNarrowRight } from "@/utils/icons";
import {
  Box,
  Flex,
  Grid,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetStockInfo, useGetStockInfoEod } from "@/services/stock";
import CompanyCardSkeleton from "@/components/card/skeleton/CompanyCardSkeleton";
import { IStockData } from "@/interface/stock-view";
import CompanyStockCardSkeleton from "@/components/card/skeleton/CompanyStockCardSkeleton";
import CompanyAnalysisCardSkeleton from "@/components/card/skeleton/CompanyAnalysisCardSkeleton ";

const CompanyInfo: React.FC<IStockComponent> = ({ symbol }) => {
  const [btnFilter, setBtnFilter] = useState<string>("daily");
  const [stockNewData, setNewStockData] = useState<ICompanyStockCard[]>([]);

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
  const currentDate = new Date();
  const oneDayBefore = new Date(currentDate);
  oneDayBefore.setDate(currentDate.getDate() - 1);

  const twoDaysBefore = new Date(currentDate);
  twoDaysBefore.setDate(currentDate.getDate() - 2);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const oneDayBeforeFormatted = formatDate(oneDayBefore);
  const twoDaysBeforeFormatted = formatDate(twoDaysBefore);

  const {
    getStockInfoData,
    getStockInfoFilter,
    getStockInfoIsLoading,
    setGetStockInfoFilter,
    getStockInfoError,
  } = useGetStockInfo({ enabled: true });
  const {
    getStockInfoEodData,
    getStockInfoEodFilter,
    getStockInfoEodIsLoading,
    setGetStockInfoEodFilter,
    getStockInfoEodError,
  } = useGetStockInfoEod({ enabled: true });

  useEffect(() => {
    setGetStockInfoFilter({ symbol: symbol });
    setGetStockInfoEodFilter({
      symbol: symbol,
      endDate: oneDayBeforeFormatted,
      startDate: twoDaysBeforeFormatted,
    });
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/api/stock/stream/market_performance?leaderType=MostTraded`
    );

    eventSource.onmessage = (event) => {
      const stockPrice = event;
      const parsedData: any = JSON.parse(stockPrice.data);
      const parsedCompleteData: IStockData[] = JSON.parse(parsedData);
      console.log("Parsed Data", parsedCompleteData);
      const transformedData: ICompanyStockCard[] = parsedCompleteData
        .slice(0, 6)
        .map((stock: any) => ({
          name: stock.symbol,
          amount: stock.price.toFixed(2),
          isProgressive: stock.change > 0,
          value: stock.changesPercentage.toFixed(2),
        }));

      setNewStockData(transformedData);
    };

    eventSource.onerror = (err) => {
      console.error("EventSource failed:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <div className="xl:hidden gap-1 bg-[#351F05] mb-3 rounded-[12px] p-4 flex items-center w-fit-content">
        <p className="font-semibold text-sm text-white">
          Download Annual Report
        </p>
        <ArrowNarrowRight />
      </div>
      <div className="lg:flex xl:gap-4 gap-2 mb-[34.5px]">
        {getStockInfoIsLoading ? (
          <CompanyCardSkeleton />
        ) : (
          <CompanyCard
            companyName={getStockInfoData[0]?.companyName}
            urlCompanyImg={getStockInfoData[0]?.image}
            price={getStockInfoData[0]?.price}
          />
        )}

        <div className="grid md:grid-cols-2 xl:gap-4 gap-2">
          {getStockInfoEodIsLoading ? (
            [...Array(2)].map((_, index) => <CompanyAnalysisCardSkeleton />)
          ) : (
            <>
              <CompanyAnalysisCard
                count={getStockInfoEodData[1]?.close}
                isProgressive={getStockInfoEodData[1]?.change > 0}
                value={getStockInfoEodData[1]?.changePercent.toFixed(2)}
                isOpen={true}
              />
              <CompanyAnalysisCard
                count={getStockInfoEodData[0]?.close}
                isProgressive={getStockInfoEodData[0]?.change > 0}
                value={getStockInfoEodData[0]?.changePercent.toFixed(2)}
                isOpen={false}
              />
            </>
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
          {getStockInfoIsLoading ? (
            <>
              <Skeleton height="28px" width="50%" mb="10px" />
              <SkeletonText noOfLines={10} spacing="4" skeletonHeight="16px" />
            </>
          ) : (
            <>
              <Text fontWeight={700} fontSize={24} color="#111928" mb="10px">
                About {getStockInfoData[0]?.companyName}
              </Text>
              <Text fontWeight={400} fontSize={16}>
                {getStockInfoData[0]?.description}
              </Text>
            </>
          )}
        </div>
        <Box
          borderRadius="12px"
          p={"10px"}
          mt={{ base: 4, lg: 0 }}
          bg="#fff"
          w="100%"
          h="fit-content"
        >
          <Text fontWeight={700} fontSize={24} color="#111928" mb="10px">
            Top Traded Trending Stocks
          </Text>
          <Grid
            gap={{ base: 2, md: 4 }}
            gridTemplateColumns={{ sm: "repeat(2, 1fr)" }}
          >
            {stockNewData.length === 0
              ? [...Array(6)].map((_, index) => (
                  <Box key={index} pb={{ base: 3, sm: 0 }}>
                    <CompanyStockCardSkeleton />
                  </Box>
                ))
              : stockNewData?.map(
                  (company: ICompanyStockCard, index: number) => (
                    <Box key={index} pb={{ base: 3, sm: 0 }}>
                      <CompanyStockCard company={company} />
                    </Box>
                  )
                )}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default CompanyInfo;
