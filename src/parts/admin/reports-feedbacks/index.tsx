"use client";

import { ThreeDotsIcon } from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";
import Table, { ColumnsType } from "antd/es/table";
interface DataType {
  id: number;
  features: string;
  details: string;
  reporter?: string;
  reported_on?: string;
}

const ReportsAndFeedbacks = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Text fontWeight={400} fontSize={14}>
          FEATURES
        </Text>
      ),
      dataIndex: "features",
      key: "features",
    },
    {
      title: (
        <Text fontWeight={400} fontSize={14}>
          DETAILS
        </Text>
      ),
      dataIndex: "details",
      key: "details",
    },

    {
      title: (
        <Text fontWeight={400} fontSize={14}>
          REPORTER
        </Text>
      ),
      dataIndex: "reporter",
      key: "reporter",
    },

    {
      title: (
        <Text fontWeight={400} fontSize={12}>
          REPORTED ON
        </Text>
      ),
      dataIndex: "reported_on",
      key: "reported_on",
    },

    {
      title: (
        <Text fontWeight={400} fontSize={12}>
          ACTION
        </Text>
      ),
      dataIndex: "id",
      key: "id",
      render: () => {
        return (
          <Box>
            <ThreeDotsIcon />
          </Box>
        );
      },
    },
  ];

  const dataSources = [
    {
      id: 1,
      features: "Community",
      details:
        "What do members of congress know about these stocks that we don’t?",

      reporter: "@hungry_boss5",
      reported_on: "Apr 23 ,2021",
    },
    {
      id: 2,
      features: "Fundamental Metrics",
      details:
        "What do members of congress know about these stocks that we don’t?",
      reporter: "@hungry_boss5",
      reported_on: "Apr 23 ,2021",
    },
    {
      id: 3,
      features: "View Company",
      details:
        "What do members of congress know about these stocks that we don’t?",
      reporter: "@hungry_boss5",
      reported_on: "Apr 23 ,2021",
    },
  ];

  return (
    <Box bg="#fff" borderRadius={"8px"} pt={4} mt={4}>
      <Box m={4} mt={0}>
        <Text fontWeight={600} fontSize="18px" color="#111928">
          Articles
        </Text>
      </Box>
      <Table
        className="custom-table"
        dataSource={dataSources}
        columns={columns}
        //   loading={isLoading}
      />
    </Box>
  );
};

export default ReportsAndFeedbacks;
