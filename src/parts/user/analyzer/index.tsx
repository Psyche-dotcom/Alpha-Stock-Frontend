"use client";

import { TableComponent } from "@/components/custom-table"; // This import seems unused, but kept.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IStockComponent } from "@/interface/stock";
import {
  useGetStockAnalysisStat,
  useGetStockInfo,
  useGetStockInfoEod,
  usePredictStock,
} from "@/services/stock";
import { DataItem } from "@/types"; // Corrected import syntax: 'from' instead of '=>'
import { CautionIcon } from "@/utils/icons"; // This import seems unused, but kept.
import { Box, Select, Text } from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription, // This import seems unused, but kept.
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputFilter } from "@/components/filter/input-filter";
import ShowAnalysisHistory from "./show-analysis-history";
import {
  DataSourceAnalyzer,
  DataSourceAnalyzerResult,
} from "@/components/util";
import DropdownSelect from "@/components/DropdownSelect"; // This import seems unused, but kept.
import YearDropdownSelect from "@/components/yearSelectdropdown";
import { TableComponent2 } from "@/components/custom-table2";
import { TableComponentNew } from "@/components/custom-table-new";
import CompanyAnalysisCardText from "@/components/card/company-analysis-card-text";

interface DataType extends DataItem {
  id: number;
  feature: string;
  year1?: number;
  year5?: number;
  year10?: number;
  low?: number;
  medium?: number;
  high?: number;
  category: string;
  showPercent?: boolean;
  [key: string]: any; // Added index signature to satisfy DataItem constraint
}
interface DataTypes extends DataItem {
  id: number;
  feature: string;
  year1?: number;
  year5?: number;
  year10?: number;
  low?: number;
  medium?: number;
  high?: number;
  [key: string]: any; // Added index signature to satisfy DataItem constraint
}

type RangeKey = "low" | "mid" | "high";

const Analyzer: React.FC<IStockComponent> = ({ symbol }) => {
  const [isFetchStats, setIsFetchStats] = useState<boolean>(false);
  const [isFetchStock, setIsFetchStock] = useState<boolean>(false);
  const [showAnalysisResult, setShowAnalysisResult] = useState<boolean>(false);
  const [year, setYear] = useState<number>(1);
  const [assumptionLevel, setAssumptionLevel] = useState<number>(3); // 1: Low, 2: Low, Mid, 3: Low, Mid, High
  const [showAnalysisHistory, setShowAnalysisHistory] =
    useState<boolean>(false);
  const [queryHistory, setQueryHistory] = useState<string>("");

  // State to hold the input values for the analysis table
  const [tableState, setTableState] = useState<
    Record<string, Partial<Record<RangeKey, string>>>
  >({
    roic: { low: "", mid: "", high: "" },
    desiredAnnReturn: { low: "", mid: "", high: "" },
    revGrowth: { low: "", mid: "", high: "" },
    profitMargin: { low: "", mid: "", high: "" },
    freeCashFlowMargin: { low: "", mid: "", high: "" },
    peRatio: { low: "", mid: "", high: "" },
    pfcf: { low: "", mid: "", high: "" },
  });

  // Handler for year dropdown change
  const handleDropdownChange = (value: number) => {
    setYear(value);
  };

  // Handler for assumption level select change
  const handleAssumptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAssumptionLevel(Number(e.target.value));
  };

  // Fetch stock information
  const {
    getStockInfoData,
    getStockInfoFilter, // Unused, but kept for context
    getStockInfoIsLoading, // Unused, but kept for context
    setGetStockInfoFilter,
    getStockInfoError, // Unused, but kept for context
  } = useGetStockInfo({ enabled: isFetchStock });

  // Fetch end-of-day stock information
  const {
    getStockInfoEodData,
    getStockInfoEodFilter, // Unused, but kept for context
    getStockInfoEodIsLoading, // Unused, but kept for context
    setGetStockInfoEodFilter,
    getStockInfoEodError, // Unused, but kept for context
  } = useGetStockInfoEod({ enabled: true, queryKey: "stockInfo" });

  // Fetch stock analysis statistics
  const {
    getStockAnalysisStatData,
    getStockAnalysisStatFilter, // Unused, but kept for context
    setGetStockAnalysisStatFilter,
    getStockAnalysisStatError, // Unused, but kept for context
  } = useGetStockAnalysisStat({ enabled: isFetchStats });

  // Predict stock hook
  const { predictStockData, predictStockIsLoading, predictStockPayload } =
    usePredictStock((res: { statusCode: number; result: any }) => {
      if (res.statusCode == 200) {
        setShowAnalysisResult(true);
      }
    }) as {
      predictStockData: { result: any } | null;
      predictStockIsLoading: boolean;
      predictStockPayload: (payload: any) => void;
    };

  const currentDate = new Date();

  // Helper function to get a previous trading day
  const getPreviousTradingDay = (date: Date, daysBack: number): Date => {
    let previousDate = new Date(date);
    while (daysBack > 0) {
      previousDate.setDate(previousDate.getDate() - 1);
      const day = previousDate.getDay();
      if (day !== 0 && day !== 6) {
        // 0 = Sunday, 6 = Saturday
        daysBack--;
      }
    }
    return previousDate;
  };

  // Helper function to format date to YYYY-MM-DD
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const oneDayBefore = getPreviousTradingDay(currentDate, 1);
  const twoDaysBefore = getPreviousTradingDay(currentDate, 2);

  const oneDayBeforeFormatted = formatDate(oneDayBefore);
  const twoDaysBeforeFormatted = formatDate(twoDaysBefore);

  // Effect to fetch initial stock data on symbol change
  useEffect(() => {
    setGetStockInfoFilter({ symbol: symbol });
    setGetStockInfoEodFilter({
      symbol: symbol,
      endDate: oneDayBeforeFormatted,
      startDate: twoDaysBeforeFormatted,
    });
    setGetStockAnalysisStatFilter({
      symbol: symbol,
      period: "annual",
    });
    setIsFetchStock(true);
    setIsFetchStats(true);
  }, [symbol]);

  // Handler for input changes in the table
  const handleInputChange = (
    category: string,
    range: RangeKey,
    value: string
  ) => {
    setTableState((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [range]: value,
      },
    }));
  };

  // Cell renderers for the historical data and assumption input table
  const cellRenderers = {
    feature: (item: DataType) => (
      <Text fontWeight={400} fontSize={14} className="text-nowrap">
        {item?.feature}
      </Text>
    ),
    year1: (item: DataType) => (
      <Text
        fontWeight={400}
        fontSize={14}
        textAlign={"center"}
        className="text-nowrap"
      >
        {item?.year1
          ? `${parseFloat(String(item.year1)).toFixed(2)} ${
              item?.showPercent ? "%" : ""
            }`
          : "-"}
      </Text>
    ),
    year5: (item: DataType) => (
      <Text
        fontWeight={400}
        fontSize={14}
        textAlign={"center"}
        className="text-nowrap"
      >
        {item?.year5
          ? `${parseFloat(String(item.year5)).toFixed(2)} ${
              item?.showPercent ? "%" : ""
            }`
          : "-"}
      </Text>
    ),
    year10: (item: DataType) => (
      <Text
        fontWeight={400}
        fontSize={14}
        textAlign={"center"}
        className="text-nowrap"
      >
        {item?.year10
          ? `${parseFloat(String(item.year10)).toFixed(2)} ${
              item?.showPercent ? "%" : ""
            }`
          : "-"}
      </Text>
    ),
    low: (item: DataType) => (
      <Box className="relative w-full flex justify-center">
        <div className="relative">
          <Input
            name="low"
            value={tableState[item.category!]?.low ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              // Allow only numbers and a single decimal point
              if (/^\d*\.?\d*$/.test(val)) {
                handleInputChange(item.category!, "low", val);
              }
            }}
            className="h-8 w-[54px] text-right"
            style={{ paddingRight: "22px" }} // Space for the percentage sign
            inputMode="decimal"
            placeholder=""
          />
          {item?.showPercent && (
            <Box
              className="absolute text-gray-500 text-sm pointer-events-none select-none"
              style={{
                right: "6px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              %
            </Box>
          )}
        </div>
      </Box>
    ),

    medium: (item: DataType) => (
      <Box className="relative w-full flex justify-center">
        <div className="relative">
          <Input
            name="medium"
            value={tableState[item.category!]?.mid ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*\.?\d*$/.test(val)) {
                handleInputChange(item.category!, "mid", val);
              }
            }}
            className="h-8 w-[54px] text-right"
            style={{ paddingRight: "22px" }}
            inputMode="decimal"
            placeholder=""
          />
          {item?.showPercent && (
            <Box
              className="absolute text-gray-500 text-sm pointer-events-none select-none"
              style={{
                right: "6px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              %
            </Box>
          )}
        </div>
      </Box>
    ),

    high: (item: DataType) => (
      <Box className="relative w-full flex justify-center">
        <div className="relative">
          <Input
            name="high"
            value={tableState[item.category!]?.high ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*\.?\d*$/.test(val)) {
                handleInputChange(item.category!, "high", val);
              }
            }}
            className="h-8 w-[54px] text-right"
            style={{ paddingRight: "22px" }}
            inputMode="decimal"
            placeholder=""
          />
          {item?.showPercent && (
            <Box
              className="absolute text-gray-500 text-sm pointer-events-none select-none"
              style={{
                right: "6px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              %
            </Box>
          )}
        </div>
      </Box>
    ),
  };

  // Cell renderers for the analysis result table
  const cellRunRenderer = {
    feature: (item: DataTypes) => <p className="flex">{item?.feature}</p>,
    low: (item: DataTypes) => (
      <p className="flex justify-center">
        {item?.low ? `$${parseFloat(String(item.low)).toFixed(2)}` : "-"}
      </p>
    ),
    medium: (item: DataTypes) => (
      <p className="flex justify-center">
        {item?.medium ? `$${parseFloat(String(item.medium)).toFixed(2)}` : "-"}
      </p>
    ),
    high: (item: DataTypes) => (
      <p className="flex justify-center">
        {item?.high ? `$${parseFloat(String(item.high)).toFixed(2)}` : "-"}
      </p>
    ),
  };

  // Memoized dynamic column order and labels for the historical data table
  const { dynamicColumnOrder, dynamicColumnLabels } = useMemo(() => {
    const order: (keyof DataType)[] = ["feature", "year1", "year5", "year10"];
    const labels: Record<keyof DataType, string> = {
      feature: "FEATURE",
      year1: "1 Year",
      year5: "5 Years",
      year10: "10 Years",
      low: "LOW",
      medium: "MID",
      high: "HIGH",
      id: "ID", // Placeholder, not actually displayed
      category: "Category", // Placeholder, not actually displayed
      showPercent: "Show Percent", // Placeholder, not actually displayed
    };

    if (assumptionLevel === 1) {
      order.push("low");
    } else if (assumptionLevel === 2) {
      order.push("low", "medium");
    } else if (assumptionLevel === 3) {
      order.push("low", "medium", "high");
    }
    return { dynamicColumnOrder: order, dynamicColumnLabels: labels };
  }, [assumptionLevel]);

  // Column order and labels for the analysis run result table
  const columnRunOrder: (keyof DataTypes)[] = [
    "feature",
    "low",
    "medium",
    "high",
  ];

  const columnRunLabel = {
    feature: "Feature",
    low: "Low",
    medium: "Medium",
    high: "High",
  };

  // Mock analysis history data
  const analysisHistory = [
    {
      date: "12/03/2025",
      symbol: "AAPL",
      company: "Apple",
      years: 10,
      entries: 3,
      time: "5:30",
    },
    {
      date: "12/03/2025",
      symbol: "AAPL",
      company: "Apple",
      years: 10,
      entries: 3,
      time: "5:30",
    },
    {
      date: "12/03/2025",
      symbol: "AAPL",
      company: "Apple",
      years: 10,
      entries: 3,
      time: "5:30",
    },
    {
      date: "12/03/2025",
      symbol: "AAPL",
      company: "Apple",
      years: 10,
      entries: 3,
    },
    {
      date: "12/03/2025",
      symbol: "AAPL",
      company: "Apple",
      years: 10,
      entries: 3,
    },
    {
      date: "12/03/2025",
      symbol: "AAPL",
      company: "Apple",
      years: 10,
      entries: 3,
    },
  ];

  // Helper to parse number from string, returns 0 if empty or invalid
  const parseNumber = (str: string | undefined): number => {
    if (!str || str.trim() === "") return 0; // Treat empty/whitespace as 0 or invalid
    const n = Number(str);
    return isNaN(n) ? 0 : n;
  };

  // Memoized value to determine if analysis can be run (all required fields are filled)
  const canRunAnalysis = useMemo(() => {
    const categories = [
      "roic",
      "desiredAnnReturn",
      "revGrowth",
      "profitMargin",
      "freeCashFlowMargin",
      "peRatio",
      "pfcf",
    ];

    for (const category of categories) {
      const state = tableState[category];
      if (!state) return false; // Should not happen if initial state is complete

      // Check 'low' field if assumptionLevel is 1, 2, or 3
      if (assumptionLevel >= 1 && (state.low === undefined || state.low.trim() === "")) {
        return false;
      }
      // Check 'mid' field if assumptionLevel is 2 or 3
      if (assumptionLevel >= 2 && (state.mid === undefined || state.mid.trim() === "")) {
        return false;
      }
      // Check 'high' field if assumptionLevel is 3
      if (assumptionLevel >= 3 && (state.high === undefined || state.high.trim() === "")) {
        return false;
      }
    }
    return true;
  }, [tableState, assumptionLevel]);


  // Function to run the analysis
  const RunAnalysis = () => {
    // Only run if validation passes
    if (!canRunAnalysis) {
      console.log("Please enter all required key data before running analysis.");
      // Optionally, show a user-friendly message or toast here
      return;
    }

    const payload = {
      symbol: symbol,
      years: year,
      selection: assumptionLevel,
      roic: {
        low: parseNumber(tableState?.roic?.low),
        mid: parseNumber(tableState?.roic?.mid),
        high: parseNumber(tableState?.roic?.high),
      },
      desiredAnnReturn: {
        low: parseNumber(tableState?.desiredAnnReturn?.low),
        mid: parseNumber(tableState?.desiredAnnReturn?.mid),
        high: parseNumber(tableState?.desiredAnnReturn?.high),
      },
      revGrowth: {
        low: parseNumber(tableState?.revGrowth?.low),
        mid: parseNumber(tableState?.revGrowth?.mid),
        high: parseNumber(tableState?.revGrowth?.high),
      },
      profitMargin: {
        low: parseNumber(tableState?.profitMargin?.low),
        mid: parseNumber(tableState?.profitMargin?.mid),
        high: parseNumber(tableState?.profitMargin?.high),
      },
      freeCashFlowMargin: {
        low: parseNumber(tableState?.freeCashFlowMargin?.low),
        mid: parseNumber(tableState?.freeCashFlowMargin?.mid),
        high: parseNumber(tableState?.freeCashFlowMargin?.high),
      },
      peRatio: {
        low: parseNumber(tableState?.peRatio?.low),
        mid: parseNumber(tableState?.peRatio?.mid),
        high: parseNumber(tableState?.peRatio?.high),
      },
      pfcf: {
        low: parseNumber(tableState?.pfcf?.low),
        mid: parseNumber(tableState?.pfcf?.mid),
        high: parseNumber(tableState?.pfcf?.high),
      },
    };
    predictStockPayload(payload);
    setShowAnalysisResult(true);
  };

  return (
    <Box py={4}>
      <Box bg="#fff" borderRadius="8px" pt={4}>
        {/* Header Section */}
        <Box
          className="flex flex-col md:flex-row" // Stack on mobile, row on medium+
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={7}
          mx={4}
          gap={4} // Add gap for spacing on smaller screens
        >
          <Text fontWeight={600} fontSize={18} color="#111928">
            Stock Analyser
          </Text>
          <div className="flex flex-col md:flex-row justify-between gap-4 w-full md:w-auto">
            <Box>
              <YearDropdownSelect
                value={year}
                onChange={handleDropdownChange}
              />
            </Box>
            <Box>
              <Select value={assumptionLevel} onChange={handleAssumptionChange}>
                <option value={1}>(Low)</option>
                <option value={2}>(Low, Mid)</option>
                <option value={3}>(Low, Mid, High)</option>
              </Select>
            </Box>
            <Button
              className="border-[#351F05] px-3 py-2 font-medium text-[#351F05] text-xs"
              variant={"outline"}
              onClick={() => setShowAnalysisHistory(!showAnalysisHistory)}
            >
              Analysis History
            </Button>
          </div>
        </Box>

        {/* Main Content Area */}
        <Box className="flex flex-col md:gap-4 gap-4 md:p-4 p-2">
          {/* Section for Historical Data Table and Disclaimer */}
          <Box className="flex flex-col lg:flex-row lg:gap-4 gap-4">
            {/* Historical Data (Table) Section */}
            <Box className="w-full lg:flex-1">
              <div className="bg-[#351F05] text-white border-b border-[#351F05] py-4 rounded-tr-lg text-center rounded-lt-lg uppercase font-semibold text-xs grid grid-cols-3">
                <h6></h6>
                <h6>Historical Data</h6>
                <h6>My Assumptions</h6>
              </div>
              <div className="w-full">
                <TableComponentNew<DataType>
                  tableData={DataSourceAnalyzer(getStockAnalysisStatData)}
                  cellRenderers={cellRenderers}
                  columnOrder={dynamicColumnOrder}
                  columnLabels={dynamicColumnLabels}
                  className="!text-[#6B7280] text-sm font-normal"
                />
              </div>
              <Box
                className="flex md:flex-row flex-col gap-4 justify-between"
                alignItems={"center"}
                mb={8}
                mt={4}
                gap={3}
              >
                <div className=" px-3 py-3 font-medium text-[#111928] text-base flex gap-2">
                  <CompanyAnalysisCardText
                    count={getStockInfoEodData[0]?.close}
                    isProgressive={getStockInfoEodData[0]?.change > 0}
                    value={getStockInfoEodData[0]?.changePercent.toFixed(2)}
                    isOpen={false}
                  />
                </div>
                <Button
                  className="bg-[#291804] text-white px-3 py-3 font-medium text-base"
                  variant={"secondary"}
                  onClick={RunAnalysis}
                  disabled={predictStockIsLoading || !canRunAnalysis}
                >
                  Run Analysis
                </Button>
              </Box>
            </Box>

            {/* Disclaimer Section - side by side with table on desktop, below on mobile */}
            <Box className="p-4 rounded-[6px] bg-white flex gap-4 border-2 border-[#E5E7EB] w-full lg:w-auto lg:max-w-[400px] h-full">
              <Box className="text-[#3A2206] flex-1">
                <Text className="font-bold text-base mb-1">Disclaimer:</Text>
                <Text className="font-normal text-sm">
                  Alpha Strategy’s software is not an investment adviser, and it
                  is not registered as such with the U.S. Securities &amp;
                  Exchange Commission or any other state or federal authority
                  under the Investment Advisers Act of 1940 or any other law.
                  The results generated by the Stock Analyzer are for
                  informational and educational purposes only and are not, and
                  should not be considered, investment advice or a
                  recommendation to buy, sell, or hold a particular security,
                  make a particular investment, or follow a particular investing
                  strategy.
                </Text>
              </Box>
            </Box>
          </Box>

          {/* Analysis Result Section - shown conditionally below the first row */}
          {showAnalysisResult && (
            <Box className="bg-white rounded-lg w-full">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={7}
                mx={4}
                pt={4}
              >
                <Text fontWeight={400} fontSize={18} color="#111928">
                  Analysis Result
                </Text>
                <Box textAlign="right">
                  <Text fontWeight={400} fontSize={18} color="#111928">
                    My Assumptions
                  </Text>
                </Box>
              </Box>
              <TableComponent2<DataTypes>
                basePrice={getStockInfoData[0]?.price}
                tableData={DataSourceAnalyzerResult(predictStockData?.result)}
                cellRenderers={cellRunRenderer}
                columnOrder={columnRunOrder}
                columnLabels={columnRunLabel}
              />
            </Box>
          )}
        </Box>
      </Box>

      {/* Analysis History Dialog */}
      <Dialog
        open={showAnalysisHistory}
        onOpenChange={() => setShowAnalysisHistory(!showAnalysisHistory)}
      >
        <DialogContent className="pt-0 bg-white right-0 h-screen max-w-[500px] w-full pb-[46px]">
          <DialogHeader className="sticky top-0 z-1 bg-white mb-5 pt-5">
            <DialogTitle className="mb-6 border-b border-[#E5E7EB] pb-[17px] text-2xl font-bold text-primary-green-dark">
              History
            </DialogTitle>
            <div className="border-b border-[#E5E7EB] pb-5">
              <InputFilter
                setQuery={setQueryHistory}
                placeholder="Search by history"
                className="!w-full"
              />
            </div>
          </DialogHeader>
          <div className="flex flex-col gap-5 h-full overflow-y-scroll">
            {analysisHistory?.map((analysis, index: number) => (
              <ShowAnalysisHistory item={analysis} key={index} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Analyzer;
