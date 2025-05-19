"use client";
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import MetricsSkeleton from "@/components/card/skeleton/MetricsSkeleton";

import { getStockLabel } from "@/utils";
import { formatMoneyNumber2 } from "@/components/util";
import { IMetricData } from "@/interface/stock";
const MetricData: React.FC<IMetricData> = ({
  getMetricsIsLoading,
  getMetricsData,
}) => {
  return (
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
        {getMetricsIsLoading
          ? [...Array(10)].map((_, index) => <MetricsSkeleton key={index} />)
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
                    fontSize={{ base: 12, sm: 14 }}
                    color="#111928"
                    display="flex"
                    gap={"2px"}
                    alignItems={"center"}
                  >
                    {getStockLabel(key)}
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
      <Box borderRadius="12px" bg={"#fff"} mb={4} className="w-full h-fit">
        {getMetricsIsLoading
          ? [...Array(10)].map((_, index) => <MetricsSkeleton key={index} />)
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
                    fontSize={{ base: 12, sm: 14 }}
                    color="#111928"
                    display="flex"
                    gap={"2px"}
                    alignItems={"center"}
                    key={index}
                  >
                    {getStockLabel(key)}
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
      <div className="w-full h-fit ">
        <Box borderRadius="12px" bg={"#fff"} mb={{ base: 2, md: 4 }}>
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
                      fontSize={{ base: 12, sm: 14 }}
                      color="#111928"
                      display="flex"
                      gap={"2px"}
                      alignItems={"center"}
                    >
                      {getStockLabel(key)}
                    </Text>
                    <Text
                      fontWeight={700}
                      fontSize={{ base: "12px", sm: "14px" }}
                      color="#111928"
                    >
                      {key.toLowerCase() == "avgroic5yrs"
                        ? // @ts-ignore
                          formatMoneyNumber2(value, true)
                        : // @ts-ignore
                          formatMoneyNumber2(value)}
                    </Text>
                  </Box>
                )
              )
            : null}
        </Box>
        <Box borderRadius="12px" bg={"#fff"}>
          {getMetricsIsLoading
            ? [...Array(10)].map((_, index) => <MetricsSkeleton key={index} />)
            : getMetricsData?.metricFourth
            ? Object?.entries(getMetricsData?.metricFourth)?.map(
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
                      fontSize={{ base: 12, sm: 14 }}
                      color="#111928"
                      display="flex"
                      gap={"2px"}
                      alignItems={"center"}
                    >
                      {getStockLabel(key)}
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
  );
};

export default MetricData;
