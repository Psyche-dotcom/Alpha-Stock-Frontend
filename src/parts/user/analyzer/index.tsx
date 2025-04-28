"use client";

import { TableComponent } from "@/components/custom-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IStockComponent } from "@/interface/stock";
import {
  useGetStockAnalysisStat,
  useGetStockInfo,
  usePredictStock,
} from "@/services/stock";
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
import {
  DataSourceAnalyzer,
  DataSourceAnalyzerResult,
} from "@/components/util";
import DropdownSelect from "@/components/DropdownSelect";
import YearDropdownSelect from "@/components/yearSelectdropdown";
import { TableComponent2 } from "@/components/custom-table2";
import { TableComponentNew } from "@/components/custom-table-new";

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
}

type RangeKey = "low" | "mid" | "high";

const Analyzer: React.FC<IStockComponent> = ({ symbol }) => {
  const [isFetchStats, setIsFetchStats] = useState<boolean>(false);
  const [isFetchStock, setIsFetchStock] = useState<boolean>(false);
  const [showAnalysisResult, setShowAnalysisResult] = useState<boolean>(false);
  const [year, setYear] = useState<number>(1);
  const [showAnalysisHistory, setShowAnalysisHistory] =
    useState<boolean>(false);
  const [queryHistory, setQueryHistory] = useState<string>("");
  const [tableState, setTableState] = useState<
    Record<string, Record<RangeKey, number>>
  >({
    roic: { low: 0, mid: 0, high: 0 },
    desiredAnnReturn: { low: 0, mid: 0, high: 0 },
    revGrowth: { low: 0, mid: 0, high: 0 },
    profitMargin: { low: 0, mid: 0, high: 0 },
    freeCashFlowMargin: { low: 0, mid: 0, high: 0 },
    peRatio: { low: 0, mid: 0, high: 0 },
    pfcf: { low: 0, mid: 0, high: 0 },
  });
  const handleDropdownChange = (value: number) => {
    setYear(value);
  };

  const {
    getStockInfoData,
    getStockInfoFilter,
    getStockInfoIsLoading,
    setGetStockInfoFilter,
    getStockInfoError,
  } = useGetStockInfo({ enabled: isFetchStock });
  const {
    getStockAnalysisStatData,
    getStockAnalysisStatFilter,
    getStockAnalysisStatIsLoading,
    setGetStockAnalysisStatFilter,
    getStockAnalysisStatError,
  } = useGetStockAnalysisStat({ enabled: isFetchStats });
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
  useEffect(() => {
    setGetStockInfoFilter({ symbol: symbol });
    setGetStockAnalysisStatFilter({
      symbol: symbol,
      period: "annual",
    });
    setIsFetchStock(true);
    setIsFetchStats(true);
  }, [symbol]);

  const handleInputChange = (
    category: string,
    range: RangeKey,
    value: number
  ) => {
    setTableState((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [range]: value,
      },
    }));
  };

  const cellRenderers = {
    feature: (item: DataType) => (
      <Text fontWeight={400} fontSize={14}>
        {item?.feature}
      </Text>
    ),
    year1: (item: DataType) => (
      <Text fontWeight={400} fontSize={14} textAlign={"center"}>
        {item?.year1 ? `${parseFloat(String(item.year1)).toFixed(2)}%` : "-"}
      </Text>
    ),
    year5: (item: DataType) => (
      <Text fontWeight={400} fontSize={14} textAlign={"center"}>
        {item?.year5 ? `${parseFloat(String(item.year5)).toFixed(2)}%` : "-"}
      </Text>
    ),
    year10: (item: DataType) => (
      <Text fontWeight={400} fontSize={14} textAlign={"center"}>
        {item?.year10 ? `${parseFloat(String(item.year10)).toFixed(2)}%` : "-"}
      </Text>
    ),
    low: (item: DataType) => (
      <Box className="flex justify-center">
        <Input
          name="low"
          style={{ maxWidth: "50px" }}
          value={tableState[item.category!]?.low || 0}
          onChange={(e) =>
            handleInputChange(item.category!, "low", Number(e.target.value))
          }
          className="h-8 w-[10.6rem]"
        />
      </Box>
    ),

    medium: (item: DataType) => (
      <Box className="flex justify-center">
        <Input
          name="mid"
          style={{ maxWidth: "50px" }}
          value={tableState[item.category!]?.mid || 0}
          onChange={(e) =>
            handleInputChange(item.category!, "mid", Number(e.target.value))
          }
          className="h-8 w-[10.6rem]"
        />
      </Box>
    ),
    high: (item: DataType) => (
      <Box className="flex justify-center">
        <Input
          name="high"
          style={{ maxWidth: "50px" }}
          value={tableState[item.category!]?.high || 0}
          onChange={(e) =>
            handleInputChange(item.category!, "high", Number(e.target.value))
          }
          className="h-8 w-[10.6rem]"
        />
      </Box>
    ),
  };
  const cellRunRenderer = {
    feature: (item: DataTypes) => <p className="flex">{item?.feature}</p>,
    low: (item: DataTypes) => (
      <p className="flex justify-center">
        {item?.low ? parseFloat(String(item.low)).toFixed(2) : "-"}
      </p>
    ),
    medium: (item: DataTypes) => (
      <p className="flex justify-center">
        {item?.medium ? parseFloat(String(item.medium)).toFixed(2) : "-"}
      </p>
    ),
    high: (item: DataTypes) => (
      <p className="flex justify-center">
        {item?.high ? parseFloat(String(item.high)).toFixed(2) : "-"}
      </p>
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
        low: tableState?.roic?.low || 0,
        mid: tableState?.roic?.mid || 0,
        high: tableState?.roic?.high || 0,
      },
      desiredAnnReturn: {
        low: tableState?.desiredAnnReturn?.low || 0,
        mid: tableState?.desiredAnnReturn?.mid || 0,
        high: tableState?.desiredAnnReturn?.high || 0,
      },
      revGrowth: {
        low: tableState?.revGrowth?.low || 0,
        mid: tableState?.revGrowth?.mid || 0,
        high: tableState?.revGrowth?.high || 0,
      },
      profitMargin: {
        low: tableState?.profitMargin?.mid || 0,
        mid: tableState?.profitMargin?.mid || 0,
        high: tableState?.profitMargin?.mid || 0,
      },
      freeCashFlowMargin: {
        low: tableState?.profitMargin?.mid || 0,
        mid: tableState?.freeCashFlowMargin?.mid || 0,
        high: tableState?.freeCashFlowMargin?.mid || 0,
      },
      peRatio: {
        low: tableState?.peRatio?.mid || 0,
        mid: tableState?.peRatio?.mid || 0,
        high: tableState?.peRatio?.mid || 0,
      },
      pfcf: {
        low: tableState?.pfcf?.mid || 0,
        mid: tableState?.pfcf?.mid || 0,
        high: tableState?.pfcf?.mid || 0,
      },
    };
    predictStockPayload(payload);

    setShowAnalysisResult(true);
  };
  return (
    <Box py={4}>
      <Box bg="#fff" borderRadius="8px" pt={4}>
        <Box
          className="flex"
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={7}
          mx={4}
        >
          <Text fontWeight={600} fontSize={18} color="#111928">
            Stock Analyser
          </Text>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <Box>
              <YearDropdownSelect
                value={year}
                onChange={handleDropdownChange}
              />
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
        <Box className="flex md:flex md:gap-4 gap-4 flex-col md:flex-row">
          <Box className="flex flex-col gap-4 w-full">
            <div className="w-full">
              <TableComponentNew<DataType>
                tableData={DataSourceAnalyzer(getStockAnalysisStatData)}
                cellRenderers={cellRenderers}
                columnOrder={columnOrder}
                columnLabels={columnLabels}
                className="!text-[#6B7280] text-sm font-normal"
              />
            </div>
            <Box
              className="flex md:flex-row flex-col gap-4 "
              alignItems={"center"}
              mb={8}
              mt={4}
              gap={3}
            >
              <div className=" px-3 py-3 font-medium text-[#111928] text-base flex gap-2">
                Current Price:
                <p className="font-bold ">US${getStockInfoData[0]?.price}</p>
              </div>
              <Button
                className="bg-[#291804] text-white px-3 py-3 font-medium text-base md:me-auto"
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
          </Box>
          <Box className="md:w-1/3">
            <Box className="p-4 rounded-[6px] bg-white flex gap-4 md:max-w-[400px] border-2 border-[#E5E7EB] mx-2">
              {/* <CautionIcon /> */}
              <Box className="text-[#3A2206] flex-1">
                <Text className="font-bold text-base mb-1">Disclaimer:</Text>

                <Text className="font-normal text-sm">
                  Everything Money (including Paul, Mo, and any other person
                  including, but not limited to, other staff members, guests,
                  personalities, etc.) is not an investment adviser, and it is
                  not registered as such with the U.S. Securities & Exchange
                  Commission or any other state or federal authority under the
                  Investment Advisers Act of 1940 or any other law. The results
                  generated by the Stock Analyzer Tool are for informational and
                  educational purposes only and are not, and should not be
                  considered, investment advice or a recommendation to buy,
                  sell, or hold a particular security, make a particular
                  investment, or follow a particular investing strategy.
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
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

          <TableComponent2<DataTypes>
            tableData={DataSourceAnalyzerResult(predictStockData?.result)}
            cellRenderers={cellRunRenderer}
            columnOrder={columnRunOrder}
            columnLabels={columnRunLabel}
          />
        </Box>
      )}

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
