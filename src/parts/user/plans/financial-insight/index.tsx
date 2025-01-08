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

const FinancialInsight = () => {
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
        <Text fontWeight={600} fontSize={12}>
          FREE
        </Text>
      ),
      dataIndex: "isFree",
      key: "isFree",

      render: (isFree) => {
        return <>{isFree ? <SuccessIcon /> : <CancelIcon />}</>;
      },
    },
    {
      title: (
        <Text fontWeight={600} fontSize={12}>
          REGULAR
        </Text>
      ),
      dataIndex: "isRegular",
      key: "isRegular",

      render: (isRegular) => {
        return <>{isRegular ? <SuccessIcon /> : <CancelIcon />}</>;
      },
    },
    {
      title: (
        <Text fontWeight={600} fontSize={12}>
          STANDARD
        </Text>
      ),
      dataIndex: "isStandard",
      key: "isStandard",
      render: (isStandard) => {
        return <>{isStandard ? <SuccessIcon /> : <CancelIcon />}</>;
      },
    },
  ];

  const dataSources = [
    {
      id: 1,
      isFree: true,
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
    <Box bg="#fff" borderRadius="8px" pt={4}>
      <Text fontWeight={600} fontSize={18} color="#111928" m={4} mt={0}>
        Financial Insights
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

export default FinancialInsight;
