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
  marketCap:
    "The total value of a company’s shares in the stock market. It’s calculated by multiplying the share price by the number of shares.",
  freeCashFlow:
    "The cash a company generates from its operations after paying for necessary expenses like equipment and buildings over the last 12 months. It shows how much money is available for growth, debt repayment, or dividends.",
  returnOnAsset:
    "Shows how efficiently a company uses its assets to generate profit. It’s the percentage of profit earned for every $1 of assets owned.",
  aYearHigh:
    "The highest price at which a stock has traded during the past 52 weeks (one year). It shows the peak value investors have paid recently.",
  revenueTTM:
    "The total amount of money a company earned from its sales over the past 12 months (TTM = Trailing Twelve Months). It shows how much the company brings in before any costs or expenses.",
  avgFCF5Yrs:
    "The average amount of cash a company generated each year after expenses over the last 5 years. It shows the company’s ability to produce cash consistently.",
  returnOnEquity:
    "Measures how much profit a company generates with the money shareholders have invested. It shows the return earned on every $1 of equity.",
  aYearlow:
    "The lowest price at which a stock has traded during the past 52 weeks (one year). It shows the lowest value investors have paid recently.",
  netIcomeTTM:
    "The profit a company makes after subtracting all costs, taxes, and expenses from its revenue. It shows how much money the company truly earned. Also called: net profit or bottom line.",
  priceToFCFTTM:
    "The ratio that shows how much investors pay for each $1 of free cash flow generated in the last 12 months. It helps evaluate if a stock is expensive based on cash generation.",
  returnOnInvestedCapitalTTM:
    "Shows how well a company uses all its invested money (debt + equity) to generate profit over the last 12 months. It measures efficiency in turning capital into returns.",
  allTimeHigh:
    "The highest price ever reached by a stock since it started trading. It shows the peak value investors have ever paid.", // Added this as it was in the text but not in the original object
  netIcomeTTM5year:
    "The average profit the company made each year over the last 5 years. It smooths out good and bad years to show long-term performance.",
  dividendsYieldTTM:
    "The percentage of a company’s current share price that is paid out as dividends over the last 12 months. It shows the return investors get from dividends alone.",
  avgROIC5yrs:
    "The average return a company generated on its invested capital each year over the past 5 years. It shows consistent efficiency in using capital to create profits.",
  pToERatioTTM:
    "The Price-to-Earnings ratio using earnings from the last 12 months. It shows how much investors are paying for $1 of the company’s earnings.",
  dividendsPaid:
    "The total amount of money a company has distributed to its shareholders as dividends. It shows how much cash the company returns to investors.", // Added this as it was in the text but not in the original object
  priceToBookRatio:
    "Compares a company’s market price to its book value (the net asset value). It shows how much investors pay for each $1 of the company’s net assets.",
  pToEAvgNetIncomeFive5yrs:
    "The Price-to-Earnings ratio based on the average earnings over the past 5 years. It helps smooth out short-term ups and downs to show a more stable valuation.",
  enterpriseValue:
    "The total value of a company, including its market cap, debt, and cash. It shows what it would cost to buy the whole company, not just its shares.",
  compRevGrowth3yrs:
    "The average annual growth rate of a company’s revenue over the past 3 years, showing how quickly sales have increased each year on average.",
  psRatioTTM:
    "The Price-to-Sales ratio using revenue from the last 12 months. It shows how much investors are paying for each $1 of the company’s sales.",
  evToNet:
    "The ratio comparing Enterprise Value (total company value) to its net profit. It helps investors see how much they’re paying for each $1 of actual profit.",
  compRevGrowth5yrs:
    "The average annual growth rate of a company’s revenue over the past 5 years. It shows the steady pace at which sales have grown each year on average.",
  profitMarginTTM:
    "The percentage of revenue that the company kept as profit over the last 12 months. It shows how efficiently the company turns sales into profit.",
  evToFCF:
    "The ratio that compares Enterprise Value to Free Cash Flow. It shows how much investors pay for each $1 of cash the company generates after expenses.",
  compRevGrowth10yrs:
    "The average yearly growth rate of a company’s revenue over the last 10 years. It shows how consistently the company’s sales have increased over a decade.",
  avgProfitMargin5yrs:
    "The average percentage of revenue kept as profit each year over the last 5 years. It shows the company’s long-term profitability efficiency.",
  grossProfitMarginTTM:
    "The percentage of revenue left after subtracting the direct costs of making products or services over the last 12 months. It shows how efficiently a company produces its goods.",
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
            : key.toLowerCase() === "returnoninvestedcapitalttm"
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
        <Box borderRadius="12px" border="1px solid #E5E7EB" bg={"#fff"}>
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
