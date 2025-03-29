"use client";

import { TableComponent } from "@/components/custom-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IStockComponent } from "@/interface/stock";
import { useGetStockAnalysisStat } from "@/services/stock";
import { DataItem } from "@/types";
import { CautionIcon } from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface DataType extends DataItem {
  id: number;
  feature: string;
  year1?: number;
  year5?: number;
  year10?: number;
}

const Analyzer: React.FC<IStockComponent> = ({ symbol }) => {
  const [isFetchStats, setIsFetchStats] = useState<boolean>(false);

  const {
    getStockAnalysisStatData,
    getStockAnalysisStatFilter,
    getStockAnalysisStatIsLoading,
    setGetStockAnalysisStatFilter,
    getStockAnalysisStatError,
  } = useGetStockAnalysisStat({ enabled: isFetchStats });

  useEffect(() => {
    setGetStockAnalysisStatFilter({
      symbol: symbol,
      period: "annual",
    });
    setIsFetchStats(true);
  }, [symbol]);

  const cellRenderers = {
    feature: (item: DataType) => (
      <Text fontWeight={400} fontSize={14} color="#111928">
        {item?.feature}
      </Text>
    ),
    year1: (item: DataType) => (
      <Text fontWeight={400} fontSize={14} color="#111928" textAlign={"center"}>
        {item?.year1} {item?.year1 && "%"}
      </Text>
    ),
    year5: (item: DataType) => (
      <Text fontWeight={400} fontSize={14} color="#111928" textAlign={"center"}>
        {item?.year5} {item?.year5 && "%"}
      </Text>
    ),
    year10: (item: DataType) => (
      <Text fontWeight={400} fontSize={14} color="#111928" textAlign={"center"}>
        {item?.year10} {item?.year10 && "%"}
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

  const dataSources = [
    {
      id: 1,
      year1: 10.67,
      year10: 20.5,
      year5: 30.2,
      feature: "ROIC",
    },
    {
      id: 2,
      year1: 10.67,
      year10: 20.5,
      year5: 30.2,
      feature: "Rev. Growth %",
    },
    {
      id: 3,
      year1: 10.67,
      year10: 20.5,
      year5: 30.2,
      feature: "Profit Margin",
    },
    {
      id: 4,
      year1: 10.67,
      year10: 20.5,
      year5: 30.2,
      feature: "Free Cash Flow Margin",
    },
    {
      id: 5,
      year1: 10.67,
      year10: 20.5,
      feature: "P/E",
    },
    {
      id: 6,
      year1: 10.67,
      feature: "P/FCF",
    },
  ];

  return (
    <Box pt={4}>
      <Box bg="#fff" borderRadius="8px">
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
          <Button
            className="border-[#351F05] px-3 py-2 font-medium text-[#351F05] text-xs"
            variant={"outline"}
            asChild
          >
            Analysis History
          </Button>
        </Box>
        <TableComponent<DataType>
          tableData={dataSources}
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
    </Box>
  );
};

export default Analyzer;
