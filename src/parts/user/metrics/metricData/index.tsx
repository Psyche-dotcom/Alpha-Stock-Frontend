"use client";
import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import MetricsSkeleton from "@/components/card/skeleton/MetricsSkeleton";
import { getStockLabel } from "@/utils";
import { formatMoneyNumber2 } from "@/components/util";
import { IMetricData } from "@/interface/stock";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// --- Formula Mapping ---
const metricFormulas: Record<string, string> = {
  marketCap: "Market Cap = Share Price x Shares Outstanding",
  revenueTTM: "Revenue (TTM) = Total Revenue over Trailing Twelve Months",
  netIcomeTTM: "Net Income (TTM) = Net Profit over Trailing Twelve Months",
  netIcomeTTM5year:
    "Avg Net Income (5 yr) = Sum of Net Income for last 5 years / 5",
  pToERatioTTM: "P/E (TTM) = Share Price / Earnings Per Share (TTM)",
  pToEAvgNetIncomeFive5yrs:
    "P/E Avg Net Income (5 yr) = Share Price / Average Earnings Per Share (5 yr)",
  psRatioTTM: "P/S (TTM) = Market Cap / Revenue (TTM)",
  profitMarginTTM: "Profit Margin (TTM) = Net Income (TTM) / Revenue (TTM)",
  avgProfitMargin5yrs:
    "Avg Profit Margin (5 yr) = Sum of Profit Margins for last 5 years / 5",
  grossProfitMarginTTM:
    "Gross Profit Margin (TTM) = (Revenue - Cost of Goods Sold) / Revenue",

  freeCashFlow:
    "Free Cash Flow (FCF) (TTM) = Operating Cash Flow - Capital Expenditures (TTM)",
  avgFCF5Yrs: "Avg FCF (5 yr) = Sum of FCF for last 5 years / 5",
  priceToFCFTTM: "Price/FCF (TTM) = Market Cap / Free Cash Flow (TTM)",
  dividendsYieldTTM:
    "Dividend Yield (TTM) = Annual Dividends Per Share / Share Price",
  enterpriseValue:
    "Enterprise Value = Market Cap + Total Debt - Cash & Cash Equivalents",
  evToNet: "EV/Net Income = Enterprise Value / Net Income (TTM)",
  evToFCF: "EV/FCF = Enterprise Value / Free Cash Flow (TTM)",

  returnOnAsset:
    "Return on Assets (ROA) = Net Income (TTM) / Average Total Assets",
  returnOnEquity:
    "Return on Equity (ROE) = Net Income (TTM) / Average Shareholder Equity",
  returnOnInvestedCapitalTTM:
    "Return on Invested Capital (ROIC) (TTM) = NOPAT / Invested Capital (TTM)",
  avgROIC5yrs: "Avg ROIC (5 yr) = Sum of ROIC for last 5 years / 5",
  priceToBookRatio: "Price-to-Book Ratio = Share Price / Book Value Per Share",
  compRevGrowth3yrs:
    "3 yr Compound Revenue Growth = ((Current Revenue / Revenue 3 years ago)^(1/3)) - 1",
  compRevGrowth5yrs:
    "5 yr Compound Revenue Growth = ((Current Revenue / Revenue 5 years ago)^(1/5)) - 1",
  compRevGrowth10yrs:
    "10 yr Compound Revenue Growth = ((Current Revenue / Revenue 10 years ago)^(1/10)) - 1",

  aYearHigh: "52 Week High = Highest trading price in the last 52 weeks",
  aYearlow: "52 Week Low = Lowest trading price in the last 52 weeks",
};

const MetricData: React.FC<IMetricData> = ({
  getMetricsIsLoading,
  getMetricsData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalFormula, setModalFormula] = useState("");

  const openFormulaModal = (key: string) => {
    const title = getStockLabel(key);
    const formula = metricFormulas[key];

    if (formula) {
      setModalTitle(title);
      setModalFormula(formula);
      setIsModalOpen(true);
    } else {
      setModalTitle("Formula Not Found");
      setModalFormula("No formula available for this metric.");
      setIsModalOpen(true);
    }
  };

  const renderMetricBoxes = (
    metricData: Record<string, string | number | null> | undefined
  ) => {
    if (!metricData) return null;

    const entries = Object.entries(metricData);

    return entries.map(([key, value], index) => (
      <Box
        p={2}
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        key={key}
        // Add borderBottom for all but the last item
        borderBottom={index < entries.length - 1 ? "1px solid #E5E7EB" : "none"}
        className="cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => openFormulaModal(key)}
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
          {key.toLowerCase() === "avgroic5yrs"
            ? formatMoneyNumber2(value, true)
            : formatMoneyNumber2(value)}
        </Text>
      </Box>
    ));
  };

  return (
    <Box
      className="grid xl:grid-cols-3 md:grid-cols-2 h-fit"
      gap={{ base: 3, lg: 4 }}
      mt={{ base: 4, md: 8 }}
    >
      <Box
        borderRadius="12px"
        border="1px solid #E5E7EB"
        bg={"#fff"}
        mb={{ base: 2, md: 4 }}
        className="w-full h-fit"
      >
        {getMetricsIsLoading
          ? [...Array(10)].map((_, index) => <MetricsSkeleton key={index} />)
          : renderMetricBoxes(getMetricsData?.metricFirst)}
      </Box>
      <Box
        borderRadius="12px"
        border="1px solid #E5E7EB"
        bg={"#fff"}
        mb={4}
        className="w-full h-fit"
      >
        {getMetricsIsLoading
          ? [...Array(10)].map((_, index) => <MetricsSkeleton key={index} />)
          : renderMetricBoxes(getMetricsData?.metricSecond)}
      </Box>
      <div className="w-full h-fit ">
        <Box
          borderRadius="12px"
          border="1px solid #E5E7EB"
          bg={"#fff"}
          mb={{ base: 2, md: 4 }}
        >
          {getMetricsIsLoading
            ? [...Array(10)].map((_, index) => <MetricsSkeleton key={index} />)
            : renderMetricBoxes(getMetricsData?.metricThird)}
        </Box>
        <Box
          borderRadius="12px"
          border="1px solid #E5E7EB"
          bg={"#fff"}
        >
          {getMetricsIsLoading
            ? [...Array(10)].map((_, index) => <MetricsSkeleton key={index} />)
            : renderMetricBoxes(getMetricsData?.metricFourth)}
        </Box>
      </div>

      {/* Formula Modal/Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2
                     bg-white text-black p-8 shadow-lg rounded-lg
                     w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-black">
              {modalTitle}
            </DialogTitle>
            <DialogDescription className="text-gray-700 mt-2 text-base">
              {modalFormula}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MetricData;