"use client";
import React, { useEffect, useState } from "react";

// --- Your Original Imports ---
import { ButtonIcon } from "@/components/button/button-icon";
import FundamentalsCard from "@/components/card/fundamentals-card"; // Import your FundamentalsCard
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Using your original Dialog import

// Your original interface imports
import { IButtonFilter2 } from "@/interface/button-filter";
import { IFundamentalCard } from "@/interface/fundamental-card";
import { IStockComponent } from "@/interface/stock";

// Your original data fetching hooks
import {
  useGetAlpha8Piller,
  useGetMetrics,
  useGetMyCurrentAlpha,
  useGetStockAlphaStat,
  useGetStockInfo,
} from "@/services/stock";

// Your original utility imports
import { generateFundamentalsList2 } from "@/utils";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react"; // Your Chakra UI imports
import Link from "next/link";
import MetricData from "../metrics/metricData"; // Your MetricData component import

const Fundamentals: React.FC<IStockComponent> = ({ symbol }) => {
  const [btnFilter, setBtnFilter] = useState<string>("alpha-pillars");
  // State for the fundamental card popup modal
  const [isFundamentalModalOpen, setIsFundamentalModalOpen] = useState(false);
  const [fundamentalModalTitle, setFundamentalModalTitle] = useState("");
  const [fundamentalModalDescription, setFundamentalModalDescription] =
    useState("");
  const [fundamentalModalWhyItMatters, setFundamentalModalWhyItMatters] =
    useState("");

  // --- Fundamental Details from info for fundamentals.docx ---
  // This object maps fundamental headers to their descriptions and "Why it matters" sections.
  // This is static content from your provided file, crucial for the modal's content.
  const fundamentalDetails: Record<
    string,
    { description: string; whyItMatters: string }
  > = {
    "P/E Avg Net Income (5 yr) < 22": {
      description:
        "This filter selects companies whose average Price-to-Earnings ratio over the past 5 years is below 22 (which has been the market average). A lower P/E ratio relative to historical earnings suggests that the stock may be undervalued compared to its long-term profitability. It helps identify businesses that are profitable and reasonably priced, avoiding excessive market optimism.",
      whyItMatters:
        "A P/E below 22 suggests the company is not overvalued based on its historical earnings power. This threshold is in line with long-term market averages and helps avoid overpriced stocks while still allowing for high-quality, growing companies to pass the filter.",
    },
    "Shares Outstanding Decrease (5 yr)": {
      description:
        "This filter identifies companies that have reduced their number of shares outstanding over the past 5 years. A declining share count typically signals that the company is conducting share buybacks, which can increase earnings per share (EPS) and reflect management's confidence in the business. It may also suggest a shareholder-friendly capital allocation strategy.",
      whyItMatters:
        "Reducing shares outstanding increases each shareholder’s claim on the company’s profits, assuming earnings stay the same or grow. It’s a subtle but powerful way to enhance shareholder value without raising dividends.",
    },
    "Net Income Growth (5 yr)": {
      description:
        "This filter selects companies whose net income has grown over the past 5 years. Consistent growth in net income signals improving profitability and strong business fundamentals. It helps identify firms that are not only surviving but expanding their earnings base over time.",
      whyItMatters:
        "Sustained net income growth often leads to higher share prices and reflects the company’s ability to generate value, scale operations, or maintain pricing power. It also supports dividend growth and internal reinvestment.",
    },
    "LTL/Avg FCF (5 yr) < 5": {
      description:
        "This filter selects companies whose Long-Term Liabilities (LTL) are less than 5 times their average Free Cash Flow (FCF) over the past 5 years. This ratio helps assess a company's ability to cover its long-term obligations using its internally generated cash. A lower ratio indicates lower financial risk and better debt sustainability.",
      whyItMatters:
        "Companies with excessive long-term debt relative to cash flow are more vulnerable to interest rate hikes, credit downgrades, or refinancing risks. A ratio below 5 suggests that the business generates enough cash to handle its long-term debt load comfortably.",
    },
    "Avg ROIC (5 yr) > 10%": {
      description:
        "This filter selects companies with an average Return on Invested Capital (ROIC) above 10% over the past 5 years. ROIC measures how efficiently a company generates profit from the capital invested by both debt and equity holders. A consistently high ROIC is a strong indicator of a durable competitive advantage and value-creating business model.",
      whyItMatters:
        "Companies with ROIC above their cost of capital are creating shareholder value. A 10% threshold ensures the business is not just growing, but doing so efficiently and with high-quality returns on its investments.",
    },
    "FCF Growth (5 yr)": {
      description:
        "This filter selects companies whose Free Cash Flow (FCF) has grown over the past 5 years. Growth in FCF reflects improving operational efficiency and cash generation, which is crucial for funding dividends, share buybacks, acquisitions, and debt repayment—without relying on external financing.",
      whyItMatters:
        "Consistent FCF growth signals a healthy, self-sustaining business. Unlike net income, FCF is harder to manipulate and more reflective of real economic value. Companies with rising FCF are better positioned to navigate downturns and reinvest in future growth.",
    },
    "Revenue Growth (5 yr)": {
      description:
        "This filter selects companies that have increased their revenue over the past 5 years. Sustained revenue growth is a fundamental indicator of business expansion, increased market share, pricing power, or successful product adoption. It shows that the company is generating more sales regardless of short-term profit fluctuations.",
      whyItMatters:
        "Revenue is the top line — everything else flows from it. Without consistent sales growth, it's hard for a business to scale earnings or cash flow over time. This metric helps identify companies with momentum and a growing customer base.",
    },
    "P/Avg FCF (5 yr) < 22": {
      description:
        "This filter selects companies whose market capitalization is less than 22 times (which has been the market average) their average Free Cash Flow (FCF) over the past 5 years. This valuation multiple is similar to a P/E ratio, but it uses FCF instead of net income — offering a more conservative and cash-based view of profitability. A lower ratio suggests the company may be undervalued relative to its long-term cash-generating power.",
      whyItMatters:
        "Free Cash Flow is harder to manipulate than earnings and better reflects a company’s real ability to return capital to shareholders. A P/FCF under 22 indicates the business is not excessively priced in terms of the cash it generates consistently.",
    },
  };

  // --- Your Data Fetching Hooks ---
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
    getStockAlphaStatIsLoading,
    setGetStockAlphaStatFilter,
    getStockAlphaStatError,
  } = useGetStockAlphaStat({ enabled: symbol !== null });

  // --- useEffect for setting filters ---
  useEffect(() => {
    setGetStockInfoFilter({ symbol: symbol });
    setGetStockAlphaStatFilter({
      symbol: symbol,
      period: "annual",
    });
    setMetricsFilter({ symbol: symbol, period: "annual" });
    setGetAlpha8PillerFilter({ symbol: symbol });
  }, [
    symbol,
    setGetStockInfoFilter,
    setGetStockAlphaStatFilter,
    setMetricsFilter,
    setGetAlpha8PillerFilter,
  ]);

  // --- Data processing for rendering ---
  // Ensure 'result' (from getAlpha8PillerData) is mapped to include description and whyItMatters
  const alphaPillarsWithDetails =
    getAlpha8PillerData?.map((fundamental: IFundamentalCard) => {
      const details = fundamentalDetails[fundamental.header] || {
        description: "No description available.",
        whyItMatters: "",
      };
      return {
        ...fundamental,
        description: details.description,
        whyItMatters: details.whyItMatters,
      };
    }) || []; // Ensure it's an array even if getAlpha8PillerData is null/undefined

  // Ensure 'userPiller' (from generateFundamentalsList2) is mapped to include description and whyItMatters
  const userPillarsWithDetails =
    generateFundamentalsList2(
      getStockAlphaStatData,
      getMyCurrentAlphaData
    )?.map((fundamental: IFundamentalCard) => {
      const details = fundamentalDetails[fundamental.header];
      return {
        ...fundamental,
        description: details?.description || "No description available.",
        whyItMatters: details?.whyItMatters || "",
      };
    }) || [];

  const filterBtn = [
    {
      text: "Alpha Fundamentals",
      value: "alpha-pillars",
    },
    { text: "My Fundamentals", value: "my-pillars" },
  ];

  // --- Handler for Fundamental Card Clicks ---
  const handleFundamentalCardClick = (fundamental: IFundamentalCard) => {
    const details = fundamentalDetails[fundamental.header];
    if (details) {
      setFundamentalModalTitle(fundamental.header);
      setFundamentalModalDescription(details.description);
      setFundamentalModalWhyItMatters(details.whyItMatters);
      setIsFundamentalModalOpen(true);
    } else {
      setFundamentalModalTitle(fundamental.header);
      setFundamentalModalDescription(
        "No description available for this fundamental."
      );
      setFundamentalModalWhyItMatters("");
      setIsFundamentalModalOpen(true);
    }
  };

  const currentFundamentals =
    btnFilter === "alpha-pillars"
      ? alphaPillarsWithDetails
      : userPillarsWithDetails;

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
        {/* Added a loading check for the fundamental cards */}
        {getAlpha8PillerIsLoading ||
        getMyCurrentAlphaIsLoading ||
        getStockAlphaStatIsLoading ? (
          <GridItem
            colSpan={{ base: 1, md: 2, lg: 4 }}
            className="text-center text-gray-600"
          >
            Loading fundamentals...
          </GridItem>
        ) : (
          currentFundamentals?.map(
            (fundamental: IFundamentalCard, index: number) => (
              <GridItem key={index}>
                <FundamentalsCard
                  fundamental={fundamental}
                  onCardClick={handleFundamentalCardClick} // Pass the click handler
                />
              </GridItem>
            )
          )
        )}
      </Grid>

      {/* Your MetricData component, untouched */}
      <MetricData
        getMetricsIsLoading={getMetricsIsLoading}
        getMetricsData={getMetricsData}
      />

      {/* Fundamental Card Description Modal */}
      <Dialog
        open={isFundamentalModalOpen}
        onOpenChange={setIsFundamentalModalOpen}
      >
        <DialogContent
          className="fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2
                     bg-white text-black p-8 shadow-lg rounded-lg
                     w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-black">
              {fundamentalModalTitle}
            </DialogTitle>
            <DialogDescription className="text-gray-700 mt-2 text-base">
              <p className="font-semibold mb-1">Description:</p>
              <p className="mb-4">{fundamentalModalDescription}</p>
              {fundamentalModalWhyItMatters && (
                <>
                  <p className="font-semibold mb-1">Why it matters:</p>
                  <p>{fundamentalModalWhyItMatters}</p>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Fundamentals;
