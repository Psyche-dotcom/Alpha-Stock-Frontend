"use client";

import { CancelIcon, SuccessIcon } from "@/utils/icons";
import { Box, Switch, Text } from "@chakra-ui/react";
import Table, { ColumnsType } from "antd/es/table";
import React from "react";

interface DataType {
  id: number;
  isFree: boolean;
  isRegular: boolean;
  isStandard: boolean;
  feature: string;
}
interface IAdminStock {
  selectOption: string;
}

const AdminStockAnalyser: React.FC<IAdminStock> = ({ selectOption }) => {
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
            {selectOption === "edit" ? (
              <Switch
                // isChecked={record?.switchState}
                // onChange={(e) => console.log(`Switch toggled: ${e.target.checked}`)}
                size="md"
                colorScheme="teal"
              />
            ) : isFree ? (
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
        <Text fontWeight={600} fontSize={12} textAlign="center">
          REGULAR
        </Text>
      ),
      dataIndex: "isRegular",
      key: "isRegular",
      render: (isRegular) => {
        return (
          <Box justifyContent={"center"} display="flex">
            {selectOption === "edit" ? (
              <Switch
                // isChecked={record?.switchState}
                // onChange={(e) => console.log(`Switch toggled: ${e.target.checked}`)}
                size="md"
                colorScheme="teal"
              />
            ) : isRegular ? (
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
        <Text fontWeight={600} fontSize={12} textAlign="center">
          STANDARD
        </Text>
      ),
      dataIndex: "isStandard",
      key: "isStandard",
      render: (isStandard) => {
        return (
          <Box justifyContent={"center"} display="flex">
            {selectOption === "edit" ? (
              <Switch
                // isChecked={record?.switchState}
                // onChange={(e) => console.log(`Switch toggled: ${e.target.checked}`)}
                size="md"
                colorScheme="teal"
              />
            ) : isStandard ? (
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

export default AdminStockAnalyser;
