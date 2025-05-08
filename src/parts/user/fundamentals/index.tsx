"use client";
import { ButtonIcon } from "@/components/button/button-icon";
import FundamentalsCard from "@/components/card/fundamentals-card";
import MetricsSkeleton from "@/components/card/skeleton/MetricsSkeleton";
import { excludedKeys, formatMoneyNumber2 } from "@/components/util";
import { FundamentalsList, metricsList } from "@/constants";
import { IButtonFilter2 } from "@/interface/button-filter";
import { IAlphaMap } from "@/interface/comment";
import { IFundamentalCard } from "@/interface/fundamental-card";
import { IStockComponent } from "@/interface/stock";
import {
  useGetMetrics,
  useGetMyCurrentAlpha,
  useGetStockAlphaStat,
  useGetStockInfo,
} from "@/services/stock";
import {
  generateFundamentalsList,
  generateFundamentalsList2,
  getStockLabel,
} from "@/utils";
import { InformationIcon } from "@/utils/icons";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Fundamentals: React.FC<IStockComponent> = ({ symbol }) => {
  const [btnFilter, setBtnFilter] = useState<string>("my-pillars");
  const [fundamental, setFundamental] = useState<IAlphaMap[]>([]);
  const {
    getStockInfoData,
    getStockInfoFilter,
    getStockInfoIsLoading,
    setGetStockInfoFilter,
    getStockInfoError,
  } = useGetStockInfo({ enabled: true });
  const {
    getMyCurrentAlphaData,
    getMyCurrentAlphaIsLoading,
    setGetMyCurrentAlphaFilter,
    getMyCurrentAlphaError,
  } = useGetMyCurrentAlpha({ enabled: true });

  const {
    getMetricsData,
    getMetricsFilter,
    getMetricsIsLoading,
    setMetricsFilter,
    getMetricsError,
  } = useGetMetrics({ enabled: true });

  const {
    getStockAlphaStatData,
    getStockAlphaStatFilter,
    getStockAlphaStatIsLoading,
    setGetStockAlphaStatFilter,
    getStockAlphaStatError,
  } = useGetStockAlphaStat({ enabled: symbol !== null });
  const filterBtn = [
    {
      text: "Alpha Pillars",
      value: "alpha-pillars",
    },
    { text: "My Pillars", value: "my-pillars" },
  ];

  useEffect(() => {
    setGetStockInfoFilter({ symbol: symbol });
    setGetStockAlphaStatFilter({
      symbol: symbol,
      period: "annual",
    });
    setMetricsFilter({ symbol: symbol, period: "annual" });
  }, []);

  const result = generateFundamentalsList(getStockAlphaStatData);
  const userPiller = generateFundamentalsList2(
    getStockAlphaStatData,
    getMyCurrentAlphaData
  );

  return (
    <Box>
      <Box bg={"#fff"} p={4} borderRadius={"12px"} mb={4}>
        <Flex gap={2}>
          {filterBtn.map((filter: IButtonFilter2, index: number) => (
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
      <Grid
        gap={{ base: 2, md: 4 }}
        mb={{ base: 2, md: 4, xl: 8 }}
        gridTemplateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
      >
        {(btnFilter === "alpha-pillars" ? result : userPiller)?.map(
          (fundamental: IFundamentalCard, index: number) => (
            <GridItem key={index}>
              <FundamentalsCard fundamental={fundamental} />
            </GridItem>
          )
        )}
      </Grid>

      <Box
        className="grid xl:grid-cols-3 md:grid-cols-2 h-fit"
        gap={{ base: 3, lg: 4 }}
        mt={{ base: 4, md: 8 }}
      >
        <Box
          borderRadius="12px"
          bg={"#fff"}
          mb={{ base: 2, md: 4 }}
          className="w-full h-fit"
        >
          {getStockInfoIsLoading
            ? [...Array(10)].map((_, index) => <MetricsSkeleton key={index} />)
            : getStockInfoData?.length > 0
            ? Object?.entries(getStockInfoData[0])
                ?.filter(([key]) => !excludedKeys.includes(key))
                ?.slice(0, 12) // Only slice the first 12 entries
                ?.map(([key, value], index: number) => (
                  <Box
                    p={2}
                    border={"1px solid #E5E7EB"}
                    display="flex"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    key={index}
                  >
                    <Text
                      fontWeight={500}
                      fontSize={{ base: 12, sm: 14 }}
                      color="#111928"
                      display="flex"
                      gap={"2px"}
                      alignItems={"center"}
                    >
                      {getStockLabel(key)}
                      <InformationIcon />
                    </Text>
                    <Text
                      fontWeight={700}
                      fontSize={{ base: "12px", sm: "14px" }}
                      color="#111928"
                    >
                      {/* @ts-ignore */}
                      {formatMoneyNumber2(value)}
                    </Text>
                  </Box>
                ))
            : null}
        </Box>
        <Box borderRadius="12px" bg={"#fff"} mb={4} className="w-full h-fit">
          {getMetricsIsLoading
            ? [...Array(10)].map((_, index) => <MetricsSkeleton key={index} />)
            : getMetricsData?.metricThird
            ? Object?.entries(getMetricsData?.metricThird)?.map(
                ([key, value], index: number) => (
                  <Box
                    p={2}
                    border={"1px solid #E5E7EB"}
                    display="flex"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    key={index}
                  >
                    <Text
                      fontWeight={500}
                      fontSize={{ base: "12px", sm: "14px" }}
                      color="#111928"
                      display="flex"
                      gap={"2px"}
                      alignItems={"center"}
                      key={index}
                    >
                      {getStockLabel(key)} <InformationIcon />
                    </Text>
                    <Text fontWeight={700} fontSize={"16px"} color="#111928">
                      {/* @ts-ignore */}
                      {formatMoneyNumber2(value)}
                    </Text>
                  </Box>
                )
              )
            : null}
        </Box>
        <div className="w-full h-fit hidden xl:block">
          <Box borderRadius="12px" bg={"#fff"} mb={{ base: 2, md: 4 }}>
            {getMetricsIsLoading
              ? [...Array(10)].map((_, index) => (
                  <MetricsSkeleton key={index} />
                ))
              : getMetricsData?.metricSecond
              ? Object?.entries(getMetricsData?.metricSecond)?.map(
                  ([key, value], index: number) => (
                    <Box
                      p={2}
                      border={"1px solid #E5E7EB"}
                      display="flex"
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      key={index}
                    >
                      <Text
                        fontWeight={500}
                        fontSize={{ base: "12px", sm: "14px" }}
                        color="#111928"
                        display="flex"
                        gap={"2px"}
                        alignItems={"center"}
                      >
                        {getStockLabel(key)} <InformationIcon />
                      </Text>
                      <Text
                        fontWeight={700}
                        fontSize={{ base: "12px", sm: "14px" }}
                        color="#111928"
                      >
                        {/* @ts-ignore */}
                        {formatMoneyNumber2(value)}
                      </Text>
                    </Box>
                  )
                )
              : null}
          </Box>
          <Box borderRadius="12px" bg={"#fff"}>
            {getMetricsIsLoading
              ? [...Array(10)].map((_, index) => (
                  <MetricsSkeleton key={index} />
                ))
              : getMetricsData?.metricFirst
              ? Object?.entries(getMetricsData?.metricFirst)?.map(
                  ([key, value], index: number) => (
                    <Box
                      p={2}
                      border={"1px solid #E5E7EB"}
                      display="flex"
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      key={index}
                    >
                      <Text
                        fontWeight={500}
                        fontSize={{ base: "12px", sm: "14px" }}
                        color="#111928"
                        display="flex"
                        gap={"2px"}
                        alignItems={"center"}
                      >
                        {getStockLabel(key)} <InformationIcon />
                      </Text>
                      <Text
                        fontWeight={700}
                        fontSize={{ base: "12px", sm: "14px" }}
                        color="#111928"
                      >
                        {/* @ts-ignore */}
                        {formatMoneyNumber2(value)}
                      </Text>
                    </Box>
                  )
                )
              : null}
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default Fundamentals;
