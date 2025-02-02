"use client";

import { TableComponent } from "@/components/custom-table";
import { DataItem } from "@/types";
import { CancelIcon, SuccessIcon } from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";

interface DataType extends DataItem {
  id: number;
  isFree: boolean;
  isRegular?: boolean;
  isStandard?: boolean;
  feature: string;
  isRegularText?: boolean;
  isStandardText?: boolean;
}

const FinancialInsight = () => {
  const cellRenderers = {
    feature: (item: DataType) => (
      <Text fontWeight={600} fontSize={16} color="#111928">
        {item?.feature}
      </Text>
    ),
    isFree: (item: DataType) => (
      <Box className="flex justify-center">
        {item?.isFree ? <SuccessIcon /> : <CancelIcon />}
      </Box>
    ),
    isRegular: (item: DataType) => (
      <Box className="flex justify-center">
        {item?.isRegularText ? (
          <Text fontSize={16} fontWeight={600} color="#111928">
            3 per month
          </Text>
        ) : item?.isRegular ? (
          <SuccessIcon />
        ) : (
          <CancelIcon />
        )}
      </Box>
    ),

    isStandard: (item: DataType) => (
      <Box className="flex justify-center">
        {item?.isStandardText ? (
          <Text fontSize={16} fontWeight={600} color="#111928">
            Unlimited
          </Text>
        ) : item?.isStandard ? (
          <SuccessIcon />
        ) : (
          <CancelIcon />
        )}
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
      isFree: true,
      iaRegular: false,
      isStandard: false,
      feature: "Stock Analysis",
      isRegularText: true,
      isStandardText: true,
    },
    {
      id: 2,
      isFree: false,
      isRegular: false,
      isStandard: true,
      feature: "Data Table",
      isRegularText: false,
      isStandardText: false,
    },
    {
      id: 3,
      isFree: false,
      isRegular: true,
      isStandard: true,
      feature: "Results",
      isRegularText: false,
      isStandardText: false,
    },
  ];

  return (
    <Box bg="#fff" borderRadius="8px" pt={4}>
      <Text fontWeight={600} fontSize={18} color="#111928" m={4} mt={0}>
        Financial Insights
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

export default FinancialInsight;
