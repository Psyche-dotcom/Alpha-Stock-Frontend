"use client";

import { ButtonIcon } from "@/components/button/button-icon";
import AreaChartComponent from "@/components/charts/area-graph";
import { DownloadIcon } from "@/utils/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
interface DataType {
  id: number;
  username: string;
  fullname: string;
  status: string;
  country: string;
  subscription: string;
  transaction_date: string;
  type: string;
}

const TransactionsAnalytics = () => {
  const [filter, setFilter] = useState<string>("payment-insights");
  const dataSources = [
    {
      id: 1,
      username: "@hungry_boss5",
      fullname: "Marcus Wright",
      status: "Completed",
      country: "USA",
      subscription: "Premium",
      transaction_date: "Apr 23 ,2021",
      type: "Purchase",
    },
    {
      id: 2,
      username: "@hungry_boss5",
      fullname: "Marcus Wright",
      status: "Completed",
      country: "USA",
      subscription: "Premium",
      transaction_date: "Apr 23 ,2021",
      type: "Refund",
    },
    {
      id: 3,
      username: "@hungry_boss5",
      fullname: "Marcus Wright",
      status: "Completed",
      country: "USA",
      subscription: "Pending",
      transaction_date: "Apr 23 ,2021",
      type: "Purchase",
    },
    {
      id: 4,
      username: "@hungry_boss5",
      fullname: "Marcus Wright",
      status: "Completed",
      country: "USA",
      subscription: "Failed",
      transaction_date: "Apr 23 ,2021",
      type: "Refund",
    },
    {
      id: 5,
      username: "@hungry_boss5",
      fullname: "Marcus Wright",
      status: "Completed",
      country: "USA",
      subscription: "Premium",
      transaction_date: "Apr 23 ,2021",
      type: "Purchase",
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Text fontWeight={400} fontSize={14}>
          USERNAME
        </Text>
      ),
      dataIndex: "username",
      key: "username",
    },
    {
      title: (
        <Text fontWeight={400} fontSize={14}>
          FULL NAME
        </Text>
      ),
      dataIndex: "fullname",
      key: "fullname",
    },

    {
      title: (
        <Text fontWeight={400} fontSize={14}>
          COUNTRY
        </Text>
      ),
      dataIndex: "country",
      key: "country",
    },
    {
      title: (
        <Text fontWeight={400} fontSize={14}>
          SUBSCRIPTION
        </Text>
      ),
      dataIndex: "subscription",
      key: "subscription",
    },

    {
      title: (
        <Text fontWeight={400} fontSize={12}>
          TYPE
        </Text>
      ),
      dataIndex: "type",
      key: "type",
    },

    {
      title: (
        <Text fontWeight={400} fontSize={12}>
          TRANSACTION DATE
        </Text>
      ),
      dataIndex: "transaction_date",
      key: "transaction_date",
    },

    {
      title: (
        <Text fontWeight={400} fontSize={12}>
          STATUS
        </Text>
      ),
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <Text
            py="2px"
            px={"10px"}
            bg={
              status === "Completed"
                ? "#DEF7EC"
                : status === "Pending"
                ? "#FCE6C3"
                : status === "Not Started"
                ? "#D7E9FD"
                : "#FDE8E8"
            }
            w="fit-content"
            borderRadius={"8px"}
            color={
              status === "Completed"
                ? "#03543F"
                : status === "Pending"
                ? "#DB961E"
                : status === "Not Started"
                ? "#3090F8"
                : "#9B1C1C"
            }
          >
            {status}
          </Text>
        );
      },
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
            <DownloadIcon />
          </Box>
        );
      },
    },
  ];

  const filterBtnList = [
    {
      id: 1,
      text: "Payment Insights",
      value: "payment-insights",
    },
    {
      id: 2,
      text: "Transaction History",
      value: "transaction-history",
    },

    {
      id: 3,
      text: "Refund Manager",
      value: "refund-manager",
    },
  ];
  return (
    <Box>
      <AreaChartComponent />
      <Flex mt={8} bg="#fff" p="10px" borderRadius="8px" w="fit-content" mb={4}>
        {filterBtnList.map((filterBtn, index: number) => (
          <ButtonIcon
            key={index}
            text={filterBtn?.text}
            variant={filter === filterBtn?.value ? "solid" : "ghost"}
            bg={filter === filterBtn?.value ? "#351F05" : ""}
            fontWeight={500}
            color={filter === filterBtn?.value ? "#ffffff" : "#6B7280"}
            fontSize="14px"
            p={"12px"}
            onClick={() => setFilter(filterBtn.value)}
          />
        ))}
      </Flex>
      <Table
        className="custom-table"
        dataSource={dataSources}
        columns={columns}
        //   loading={isLoading}
      />
    </Box>
  );
};

export default TransactionsAnalytics;
