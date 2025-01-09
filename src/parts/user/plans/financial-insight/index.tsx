"use client";

import { CancelIcon, SuccessIcon } from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";
import Table, { ColumnsType } from "antd/es/table";

interface DataType {
  id: number;
  isFree: boolean;
  isRegular?: boolean;
  isStandard?: boolean;
  feature: string;
  isRegularText?: boolean;
  isStandardText?: boolean;
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
      dataIndex: "",
      key: "id",

      render: (record) => {
        return (
          <Box justifyContent={"center"} display="flex">
            {record?.isRegularText ? (
              <Text fontSize={16} fontWeight={600} color="#111928">
                3 per month
              </Text>
            ) : record?.isRegular ? (
              <SuccessIcon />
            ) : (
              <CancelIcon />
            )}
          </Box>
        );
      },
    },
    {
      title: (
        <Text fontWeight={600} fontSize={12} textAlign={"center"}>
          STANDARD
        </Text>
      ),
      dataIndex: "",
      key: "id",
      render: (record) => {
        return (
          <Box justifyContent={"center"} display="flex">
            {record?.isStandardText ? (
              <Text fontSize={16} fontWeight={600} color="#111928">
                Unlimited
              </Text>
            ) : record?.isStandard ? (
              <SuccessIcon />
            ) : (
              <CancelIcon />
            )}
          </Box>
        );
      },
    },
  ];

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
