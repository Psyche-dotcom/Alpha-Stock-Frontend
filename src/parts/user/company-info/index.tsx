"use client";

import CompanyAnalysisCard from "@/components/card/company-analysis-card";
import CompanyCard from "@/components/card/company-card";
import CompanyStockCard from "@/components/card/company-stock-card";

import { Button } from "@/components/ui/button";
import { IButtonFilter } from "@/interface/button-filter";
import { ICompanyStockCard } from "@/interface/company-stock-card";
import { IStockComponent } from "@/interface/stock";
import { ArrowNarrowRight } from "@/utils/icons";
import { Box, Grid, Skeleton, SkeletonText, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetStockInfo, useGetStockInfoEod } from "@/services/stock";
import CompanyCardSkeleton from "@/components/card/skeleton/CompanyCardSkeleton";
import { IStockData } from "@/interface/stock-view";
import CompanyStockCardSkeleton from "@/components/card/skeleton/CompanyStockCardSkeleton";
import CompanyAnalysisCardSkeleton from "@/components/card/skeleton/CompanyAnalysisCardSkeleton ";

import StockChartSwitcher from "@/components/charts/stockchart";
import { useUserSession } from "@/app/context/user-context";

const CompanyInfo: React.FC<IStockComponent> = ({ symbol }) => {
  const [btnFilter, setBtnFilter] = useState<number>(1);
  const [stockNewData, setNewStockData] = useState<ICompanyStockCard[]>([]);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const [from, setFrom] = useState(yesterday.toISOString().split("T")[0]);
  const [to, setTo] = useState(today.toISOString().split("T")[0]);

  const filterBtn = [
    { text: "1D", value: 1 },
    {
      text: "5D",
      value: 5,
    },
    {
      text: "1M",
      value: 30,
    },
    {
      text: "3M",
      value: 90,
    },
    {
      text: "6M",
      value: 180,
    },
    {
      text: "1Y",
      value: 365,
    },
  ];
  const currentDate = new Date();

  const getPreviousTradingDay = (date: Date, daysBack: number): Date => {
    let previousDate = new Date(date);
    while (daysBack > 0) {
      previousDate.setDate(previousDate.getDate() - 1);

      if (previousDate.getDay() !== 0 && previousDate.getDay() !== 6) {
        daysBack--;
      }
    }
    return previousDate;
  };

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const oneDayBefore = getPreviousTradingDay(currentDate, 1);
  const twoDaysBefore = getPreviousTradingDay(currentDate, 2);

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
  } = useGetStockInfoEod({ enabled: true, queryKey: "stockInfo" });
  const {
    getStockInfoEodData: getStockInfoEodDataChart,
    getStockInfoEodFilter: getStockInfoEodFilterChart,
    getStockInfoEodIsLoading: getStockInfoEodIsLoadingChart,
    setGetStockInfoEodFilter: setGetStockInfoEodFilterChart,
    getStockInfoEodError: getStockInfoEodErrorChart,
  } = useGetStockInfoEod({ enabled: true, queryKey: "stockInfo-chart" });
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
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);
  const handleFilterClick = (days: number) => {
    const newFrom = new Date();
    newFrom.setDate(today.getDate() - days);
    setFrom(newFrom.toISOString().split("T")[0]);
  };
  useEffect(() => {
    setGetStockInfoEodFilterChart({
      symbol: symbol,
      endDate: to,
      startDate: from,
    });
  }, [from, to]);

  return (
    <div>
      {/* <div className="xl:hidden gap-1 bg-[#351F05] mb-3 rounded-[12px] p-4 flex items-center w-fit-content">
        <p className="font-semibold text-sm text-white">
          Download Annual Report
        </p>
        <ArrowNarrowRight />
      </div> */}
      <div className="lg:flex xl:gap-4 gap-2 mb-[34.5px]">
        {getStockInfoIsLoading ? (
          <CompanyCardSkeleton />
        ) : (
          <CompanyCard
            symbol={symbol}
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
        {/* <div className="hidden  bg-[#351F05] gap-1 rounded-[12px] px-2.5 xl:flex items-center justify-between w-fit-content">
          <p className="font-semibold text-sm text-white">
            Download Annual Report
          </p>
          <ArrowNarrowRight />
        </div> */}
      </div>
      <div className="bg-white p-4 rounded-[12px] mb-4 lg:flex justify-between gap-4">
        <div className="flex gap-2">
          {filterBtn.map((filter: IButtonFilter, index: number) => (
            <Button
              variant={filter?.value === btnFilter ? "secondary" : "ghost"}
              onClick={() => {
                setBtnFilter(filter?.value);
                handleFilterClick(filter?.value);
              }}
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
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex gap-2 items-center">
            <label htmlFor="from" className="text-sm font-medium text-gray-700">
              From:
            </label>
            <input
              type="date"
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="to" className="text-sm font-medium text-gray-700">
              To:
            </label>
            <input
              type="date"
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-[12px]">
        {getStockInfoEodIsLoadingChart ? null : getStockInfoEodIsLoadingChart ==
            false && getStockInfoEodDataChart.length < 1 ? (
          <p className=" text-center">
            There is no EOD chart data for the date range selected
          </p>
        ) : (
          <StockChartSwitcher stockData={getStockInfoEodDataChart} />
        )}
      </div>

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
