"use client";

import { ButtonIcon } from "@/components/button/button-icon";
import { TableComponent } from "@/components/custom-table";
import { Pagination } from "@/components/ui/pagination";
import { stockManagerFilterList } from "@/constants";
import { IButtonFilter } from "@/interface/button-filter";
import { StockData } from "@/types";
import { ShineIcon, ThreeDotsIcon } from "@/utils/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

const StockManager = () => {
  const [marketFilter, setMarketFilter] = useState<string>("MostGainer");
  const [pageSize, setPageSize] = useState<number>(1);

  const cellRenderers = {
    agent: (record: StockData) => (
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
    ),
    price: (item: StockData) => (
      <p className="font-semibold text-center">{item?.price}</p>
    ),
    change: (item: StockData) => (
      <Text
        fontWeight={400}
        fontSize={14}
        textAlign={"center"}
        color={item?.changeisProgressive ? "#0E9F6E" : "#E74694"}
      >
        {item?.changeisProgressive ? "+" : "-"} {item?.changevalue}
      </Text>
    ),
    changes: (item: StockData) => (
      <Text
        fontWeight={400}
        fontSize={14}
        textAlign={"center"}
        color={item?.changePercentisProgressive ? "#0E9F6E" : "#E74694"}
      >
        {item?.changePercentisProgressive ? "+" : "-"}
        {item?.changespercent}
      </Text>
    ),
    action: (item: StockData) => (
      <Box className="flex items-center justify-center">
        <ThreeDotsIcon />
      </Box>
    ),
  };

  const columnOrder: (keyof StockData)[] = [
    "agent",
    "price",
    "change",
    "changes",
    "action",
  ];

  const columnLabels = {
    agent: "Agent",
    price: "Price",
    change: "Change",
    changes: "Change%",
    action: "Action",
  };

  const dataSources = [
    {
      id: 1,
      url: "/assets/images/card-image.png",
      agent: "GFAI",
      price: 1.27,
      changevalue: 0.03,
      changeIsProgressive: true,
      changespercent: 0.16,
      changesisProgressive: false,
    },
  ];

  const onPageChange = (page: number) => {
    setPageSize(page);
  };

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
              (filter: IButtonFilter, index: number) => (
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
      <div className="mx-2">
        <TableComponent<StockData>
          tableData={dataSources}
          cellRenderers={cellRenderers}
          columnOrder={columnOrder}
          columnLabels={columnLabels}
        />
        <div>
          <Pagination
            currentPage={pageSize}
            totalPages={0}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </Box>
  );
};

export default StockManager;
