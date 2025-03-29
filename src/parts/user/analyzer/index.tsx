"use client";

import { TableComponent } from "@/components/custom-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IStockComponent } from "@/interface/stock";
import { useGetStockAnalysisStat, usePredictStock } from "@/services/stock";
import { DataItem } from "@/types";
import { CautionIcon } from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputFilter } from "@/components/filter/input-filter";
import ShowAnalysisHistory from "./show-analysis-history";
import { DataSourceAnalyzer } from "@/components/util";
import DropdownSelect from "@/components/DropdownSelect";
import YearDropdownSelect from "@/components/yearSelectdropdown";

interface DataType extends DataItem {
  id: number;
  feature: string;
  year1?: number;
  year5?: number;
  year10?: number;
  low?: number;
  medium?: number;
  high?: number;
}

const Analyzer: React.FC<IStockComponent> = ({ symbol }) => {
  const [isFetchStats, setIsFetchStats] = useState<boolean>(false);
  const [showAnalysisResult, setShowAnalysisResult] = useState<boolean>(false);
  const [year, setYear] = useState<number>(1);
  const [showAnalysisHistory, setShowAnalysisHistory] =
    useState<boolean>(false);
  const [queryHistory, setQueryHistory] = useState<string>("");
  const handleDropdownChange = (value: number) => {
    setYear(value);
  };
  const {
    getStockAnalysisStatData,
    getStockAnalysisStatFilter,
    getStockAnalysisStatIsLoading,
    setGetStockAnalysisStatFilter,
    getStockAnalysisStatError,
  } = useGetStockAnalysisStat({ enabled: isFetchStats });
  const { predictStockData, predictStockIsLoading, predictStockPayload } =
    usePredictStock((res: any) => {
      setShowAnalysisResult(!showAnalysisResult);
    });
  useEffect(() => {
    setGetStockAnalysisStatFilter({
      symbol: symbol,
      period: "annual",
    });
    setIsFetchStats(true);
  }, [symbol]);

  console.log("stockData", getStockAnalysisStatData);

  const cellRenderers = {
    feature: (item: DataType) => (
      <Text fontWeight={400} fontSize={14} color="#111928">
        {item?.feature}
      </Text>
    ),
    year1: (item: DataType) => (
      <Text fontWeight={400} fontSize={14} color="#111928" textAlign={"center"}>
        {item?.year1 ? parseFloat(String(item.year1)).toFixed(2) : "-"}
      </Text>
    ),
    year5: (item: DataType) => (
      <Text fontWeight={400} fontSize={14} color="#111928" textAlign={"center"}>
        {item?.year5 ? parseFloat(String(item.year5)).toFixed(2) : "-"}
      </Text>
    ),
    year10: (item: DataType) => (
      <Text fontWeight={400} fontSize={14} color="#111928" textAlign={"center"}>
        {item?.year10 ? parseFloat(String(item.year10)).toFixed(2) : "-"}
      </Text>
    ),

    low: () => (
      <Box className="flex justify-center">
        <Input name="low" className="h-8 w-[10.6rem]" />
      </Box>
    ),
    medium: () => (
      <Box className="flex justify-center">
        <Input name="medium" className="h-8 w-[10.6rem]" />
      </Box>
    ),
    high: () => (
      <Box className="flex justify-center">
        <Input name="high" className="h-8 w-[10.6rem]" />
      </Box>
    ),
  };

  const cellRunRenderer = {
    feature: (item: DataType) => <p className="flex">{item?.feature}</p>,
    low: (item: DataType) => <p className="flex justify-center">{item?.low}</p>,
    medium: (item: DataType) => (
      <p className="flex justify-center">{item?.medium}</p>
    ),
    high: (item: DataType) => (
      <p className="flex justify-center">{item?.high}</p>
    ),
  };

  const columnOrder: (keyof DataType)[] = [
    "feature",
    "year1",
    "year5",
    "year10",
    "low",
    "medium",
    "high",
  ];

  const columnLabels = {
    feature: "FEATURE",
    year1: "1 Year",
    year5: "5 Years",
    year10: "10 Years",
    low: "LOW",
    medium: "MID",
    high: "HIGH",
  };

  const dataSource = [
    {
      feature: "Multiples of Earnings Value",
      low: 117.83,
      medium: 117.83,
      high: 117.83,
      id: 1,
    },
    {
      feature: "Discounted Cash Flow Value",
      low: 117.83,
      medium: 117.83,
      high: 117.83,
      id: 2,
    },
    {
      feature: "Current Price Return",
      low: 117.83,
      medium: 117.83,
      high: 117.83,
      id: 3,
    },
  ];

  const columnRunOrder: (keyof DataType)[] = [
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
  const RunAnalysis = () => {
    const payload = {
      symbol: symbol,
      years: year,
      roic: {
        low: 0,
        mid: 0,
        high: 0,
      },
      desiredAnnReturn: {
        low: 0,
        mid: 0,
        high: 0,
      },
      revGrowth: {
        low: 0,
        mid: 0,
        high: 0,
      },
      profitMargin: {
        low: 0,
        mid: 0,
        high: 0,
      },
      freeCashFlowMargin: {
        low: 0,
        mid: 0,
        high: 0,
      },
      peRatio: {
        low: 0,
        mid: 0,
        high: 0,
      },
      pfcf: {
        low: 0,
        mid: 0,
        high: 0,
      },
    };
    //predictStockPayload(payload);
  };
  return (
    <Box py={4}>
      <Box bg="#fff" borderRadius="8px" pt={4}>
        <Box
          display="flex"
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={7}
          mx={4}
        >
          <Text fontWeight={400} fontSize={18} color="#111928">
            Stock Analyser
          </Text>

          <Box>
            <YearDropdownSelect value={year} onChange={handleDropdownChange} />
          </Box>
          <Button
            className="border-[#351F05] px-3 py-2 font-medium text-[#351F05] text-xs"
            variant={"outline"}
            onClick={() => setShowAnalysisHistory(!showAnalysisHistory)}
          >
            Analysis History
          </Button>
        </Box>

        <TableComponent<DataType>
          tableData={DataSourceAnalyzer(getStockAnalysisStatData)}
          cellRenderers={cellRenderers}
          columnOrder={columnOrder}
          columnLabels={columnLabels}
        />
      </Box>
      <Box display="flex" alignItems={"center"} mb={8} mt={4} gap={3}>
        <Button
          className="bg-white px-3 py-3 font-medium text-[#111928]] text-base"
          variant={"secondary"}
          asChild
        >
          Current Price:
          <p className="font-bold ">US$78.34</p>
        </Button>
        <Button
          className="bg-[#291804] text-white px-3 py-3 font-medium text-base me-auto"
          variant={"secondary"}
          onClick={RunAnalysis}
        >
          Run Analysis
        </Button>
        <Button
          className="border-[#351F05] px-3 py-3 font-medium text-[#351F05] text-base"
          variant={"outline"}
        >
          Save Analysis
        </Button>
      </Box>
      {showAnalysisResult && (
        <Box className="my-5 bg-white rounded-lg">
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={7}
            mx={4}
            pt={4}
          >
            <Text fontWeight={400} fontSize={18} color="#111928">
              Analysis Result
            </Text>
          </Box>

          <TableComponent<DataType>
            tableData={dataSource}
            cellRenderers={cellRunRenderer}
            columnOrder={columnRunOrder}
            columnLabels={columnRunLabel}
          />
        </Box>
      )}
      <Box className="p-4 rounded-[6px] bg-white flex gap-4">
        <CautionIcon />
        <Box className="text-[#3A2206] flex-1">
          <Text className="font-bold text-base mb-1">Disclaimer:</Text>

          <Text className="font-normal text-sm">
            Everything Money (including Paul, Mo, and any other person
            including, but not limited to, other staff members, guests,
            personalities, etc.) is not an investment adviser, and it is not
            registered as such with the U.S. Securities & Exchange Commission or
            any other state or federal authority under the Investment Advisers
            Act of 1940 or any other law. The results generated by the Stock
            Analyzer Tool are for informational and educational purposes only
            and are not, and should not be considered, investment advice or a
            recommendation to buy, sell, or hold a particular security, make a
            particular investment, or follow a particular investing strategy.
          </Text>
        </Box>
      </Box>
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
