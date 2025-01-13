"use client";

import { CancelIcon, SuccessIcon } from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";
import Table, { ColumnsType } from "antd/es/table";

interface DataType {
  id: number;
  isFree: boolean;
  isRegular: boolean;
  isStandard: boolean;
  feature: string;
}

const StockAnalyser = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Text fontWeight={600} fontSize={12}>
          FEATURE
        </Text>
      ),
      dataIndex: "feature",
      key: "feature",
    },
    {
      title: (
        <Text fontWeight={600} fontSize={12} textAlign="center">
          FREE
        </Text>
      ),
      dataIndex: "isFree",
      key: "isFree",
      render: (isFree) => {
        return (
          <Box justifyContent={"center"} display="flex">
            {isFree ? <SuccessIcon /> : <CancelIcon />}
          </Box>
        );
      },
    },
    {
      title: (
        <Text fontWeight={600} fontSize={12} textAlign="center">
          REGULAR
        </Text>
      ),
      dataIndex: "isRegular",
      key: "isRegular",
      render: (isRegular) => {
        return (
          <Box justifyContent={"center"} display="flex">
            {isRegular ? <SuccessIcon /> : <CancelIcon />}
          </Box>
        );
      },
    },
    {
      title: (
        <Text fontWeight={600} fontSize={12} textAlign="center">
          STANDARD
        </Text>
      ),
      dataIndex: "isStandard",
      key: "isStandard",
      render: (isStandard) => {
        return (
          <Box justifyContent={"center"} display="flex">
            {isStandard ? <SuccessIcon /> : <CancelIcon />}
          </Box>
        );
      },
    },
  ];

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
      <Table
        className="custom-table"
        dataSource={dataSources}
        columns={columns}
        //   loading={isLoading}
        pagination={false}
      />
    </Box>
  );
};

export default StockAnalyser;
