"use client";

import { TableComponent } from "@/components/custom-table";
import { DataItem } from "@/types";
import { CancelIcon, SuccessIcon } from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";

interface DataType extends DataItem {
  id: number;
  isFree: boolean;
  isRegular: boolean;
  isStandard: boolean;
  feature: string;
}

const StockAnalyser = () => {
  const cellRenderers = {
    feature: (item: DataType) => (
      <Text fontWeight={600} fontSize={16} color="#111928">
        {item?.feature}
      </Text>
    ),
    isFree: (item: DataType) => (
      <Box justifyContent={"center"} display="flex">
        {item?.isFree ? <SuccessIcon /> : <CancelIcon />}
      </Box>
    ),
    isRegular: (item: DataType) => (
      <Box justifyContent={"center"} display="flex">
        {item?.isRegular ? <SuccessIcon /> : <CancelIcon />}
      </Box>
    ),

    isStandard: (item: DataType) => (
      <Box justifyContent={"center"} display="flex">
        {item?.isStandard ? <SuccessIcon /> : <CancelIcon />}
      </Box>
    ),
  };

  const columnOrder: (keyof DataType)[] = [
    "feature",
    "isFree",
    "isRegular",
    "isStandard",
  ];

  const columnLabels = {
    feature: "FEATURE",
    isFree: "Free",
    isRegular: "REGULAR",
    isStandard: "STANDARD",
  };

  const dataSources = [
    {
      id: 1,
      isFree: false,
      isRegular: false,
      isStandard: false,
      feature: "Stock Analysis",
    },
    {
      id: 2,
      isFree: false,
      isRegular: false,
      isStandard: true,
      feature: "Data Table",
    },
    {
      id: 3,
      isFree: false,
      isRegular: true,
      isStandard: true,
      feature: "Results",
    },
  ];

  return (
    <Box bg="#fff" borderRadius="8px" pt={4} mb={4}>
      <Text fontWeight={600} fontSize={18} color="#111928" m={4} mt={0}>
        Stock Analyser
      </Text>
      <TableComponent<DataType>
        tableData={dataSources}
        cellRenderers={cellRenderers}
        columnOrder={columnOrder}
        columnLabels={columnLabels}
      />
    </Box>
  );
};

export default StockAnalyser;
