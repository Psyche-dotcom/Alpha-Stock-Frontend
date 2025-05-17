"use client";
import { ButtonIcon } from "@/components/button/button-icon";
import FundamentalsCard from "@/components/card/fundamentals-card";
import MetricsSkeleton from "@/components/card/skeleton/MetricsSkeleton";
import { Button } from "@/components/ui/button";
import { excludedKeys, formatMoneyNumber2 } from "@/components/util";
import { FundamentalsList, metricsList } from "@/constants";
import { IButtonFilter2 } from "@/interface/button-filter";
import { IAlphaMap } from "@/interface/comment";
import { IFundamentalCard } from "@/interface/fundamental-card";
import { IStockComponent } from "@/interface/stock";
import {
  useGetAlpha8Piller,
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

import Link from "next/link";
import { useEffect, useState } from "react";
import MetricData from "../metrics/metricData";

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
    getAlpha8PillerData,
    getAlpha8PillerIsLoading,
    setGetAlpha8PillerFilter,
    getAlpha8PillerError,
  } = useGetAlpha8Piller({ enabled: symbol !== null });

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
    setGetAlpha8PillerFilter({ symbol: symbol });
  }, []);

  const result = getAlpha8PillerData;
  console.log("result", result);
  const userPiller = generateFundamentalsList2(
    getStockAlphaStatData,
    getMyCurrentAlphaData
  );

  return (
    <Box>
      <Box bg={"#fff"} p={4} borderRadius={"12px"} mb={4}>
        <div className="flex justify-between gap-4">
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
          {btnFilter === "my-pillars" && (
            <Link passHref href={`/user/company/${symbol}/mypiller`}>
              <Button
                variant={"secondary"}
                className="font-medium px-3 py-5 w-fit-content"
              >
                Edit
              </Button>
            </Link>
          )}
        </div>
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

      <MetricData
        getMetricsIsLoading={getMetricsIsLoading}
        getMetricsData={getMetricsData}
      />
    </Box>
  );
};

export default Fundamentals;
