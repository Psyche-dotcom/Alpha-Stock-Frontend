"use client";

import { ButtonIcon } from "@/components/button/button-icon";
import { stockManagerFilterList } from "@/constants";
import { IMarketFilter } from "@/interface/market-filter";
import { ShineIcon, ThreeDotsIcon } from "@/utils/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import Table, { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { useState } from "react";

interface DataType {
  id: number;
  url: string;
  agent: string;
  price: number;
  change: {
    value: number;
    isProgressive: boolean;
  };
  changePercent: {
    percent: number;
    isProgressive: boolean;
  };
}
const StockManager = () => {
  const [marketFilter, setMarketFilter] = useState<string>("search");
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Text fontWeight={600} fontSize={12}>
          SYMBOL
        </Text>
      ),
      dataIndex: "",
      key: "id",
      render: (record: DataType) => {
        return (
          <Flex gap={2} alignItems={"center"}>
            <Box h="24px" w="24px">
              <Image
                src={record?.url || "/assets/images/card-image.png"}
                alt={record?.agent}
                width={24}
                height={24}
                className="rounded-full object-cover h-full w-full"
              />
            </Box>
            <Text fontWeight={600} fontSize={12} color="#111928">
              {record?.agent}
            </Text>
          </Flex>
        );
      },
    },
    {
      title: (
        <Text fontWeight={600} fontSize={12}>
          LAST PRICE
        </Text>
      ),
      dataIndex: "price",
      key: "price",
    },
    {
      title: (
        <Text fontWeight={600} fontSize={12}>
          CHANGE
        </Text>
      ),
      dataIndex: "",
      key: "id",
      render: (record: DataType) => {
        return (
          <Text
            fontWeight={400}
            fontSize={14}
            color={record?.change?.isProgressive ? "#0E9F6E" : "#E74694"}
          >
            {record?.change?.isProgressive ? "+" : "-"} {record?.change?.value}
          </Text>
        );
      },
    },
    {
      title: (
        <Text fontWeight={600} fontSize={12}>
          %CHANGE
        </Text>
      ),
      dataIndex: "",
      key: "id",
      render: (record: DataType) => {
        return (
          <Text
            fontWeight={400}
            fontSize={14}
            color={record?.changePercent?.isProgressive ? "#0E9F6E" : "#E74694"}
          >
            {record?.changePercent?.isProgressive ? "+" : "-"}
            {record?.changePercent?.percent}
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
            <ThreeDotsIcon />
          </Box>
        );
      },
    },
  ];

  const dataSources = [
    {
      id: 1,
      url: "/assets/images/card-image.png",
      agent: "GFAI",
      price: 1.27,
      change: {
        value: 0.03,
        isProgressive: true,
      },
      changePercent: {
        percent: 0.16,
        isProgressive: false,
      },
    },
    {
      id: 2,
      url: "/assets/images/card-image.png",
      agent: "ASML",
      price: 386.46,
      change: {
        value: 0.02,
        isProgressive: false,
      },
      changePercent: {
        percent: 0.1,
        isProgressive: true,
      },
    },
    {
      id: 3,
      url: "/assets/images/card-image.png",
      agent: "NVDIA",
      price: 1.45,
      change: {
        value: 0.17,
        isProgressive: true,
      },
      changePercent: {
        percent: 0.32,
        isProgressive: true,
      },
    },
    {
      id: 4,
      url: "/assets/images/card-image.png",
      agent: "LMPG",
      price: 547.98,
      change: {
        value: 0.17,
        isProgressive: true,
      },
      changePercent: {
        percent: 0.01,
        isProgressive: true,
      },
    },
  ];

  return (
    <Box bg="#fff" pt={4} mb={16}>
      <Box mb={4} mx={4}>
        <Flex gap={3} alignItems={"center"} mb={4}>
          <ShineIcon />
          <Text fontWeight={400} fontSize={12} color="#6B7280">
            U.S. markets are open till 6:00 PM
          </Text>
        </Flex>
        <Box display="flex" justifyContent={"end"} mb={4}>
          <Flex gap={2}>
            {stockManagerFilterList?.map(
              (filter: IMarketFilter, index: number) => (
                <ButtonIcon
                  key={index}
                  text={filter?.text}
                  variant={filter?.value === marketFilter ? "solid" : "ghost"}
                  bg={filter?.value === marketFilter ? "#351F05" : ""}
                  fontWeight={500}
                  color={filter?.value === marketFilter ? "#ffffff" : "#6B7280"}
                  fontSize="12px"
                  p={filter?.value === marketFilter ? "12px 16px" : "0px"}
                  onClick={() => setMarketFilter(filter?.value)}
                />
              )
            )}
          </Flex>
        </Box>
      </Box>
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

export default StockManager;
