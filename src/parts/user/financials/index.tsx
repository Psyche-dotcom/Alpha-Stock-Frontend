"use client";

import { ButtonIcon } from "@/components/button/button-icon";
import { TableComponent } from "@/components/custom-table";
import { marketMoveFilterList } from "@/constants";
import { IButtonFilter } from "@/interface/button-filter";
import { DataItem } from "@/types";
import { ShineIcon } from "@/utils/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";

interface DataType extends DataItem {
  id: number;
  row1: number;
  row2: number;
  row3: number;
  row4: number;
  ttm: number;
  title: string;
}

const Financials = () => {
  const [btnFilter, setBtnFilter] = useState<string>("income-statements");

  const dataSources = [
    {
      id: 1,
      title: "Revenue",
      row1: 230.0,
      row2: 120.1,
      row3: 10.51,
      row4: 50.31,
      ttm: 12.1,
    },
    {
      id: 2,
      title: "Net Profit",
      row1: 145.0,
      row2: 98.3,
      row3: 15.75,
      row4: 72.56,
      ttm: 12.1,
    },
    {
      id: 3,
      title: "Earnings Per Share",
      row1: 8.3,
      row2: 7.2,
      row3: 1.1,
      row4: 4.3,
      ttm: 12.1,
    },
    {
      id: 4,
      title: "Market Cap",
      row1: 520.5,
      row2: 310.2,
      row3: 45.8,
      row4: 88.7,
      ttm: 12.1,
    },
    {
      id: 5,
      title: "Operating Margin",
      row1: 25.0,
      row2: 30.3,
      row3: 5.1,
      row4: 10.2,
      ttm: 12.1,
    },
    {
      id: 6,
      title: "P/E Ratio",
      row1: 15.4,
      row2: 18.7,
      row3: 3.6,
      row4: 8.9,
      ttm: 12.1,
    },
    {
      id: 7,
      title: "Dividend Yield",
      row1: 2.5,
      row2: 3.2,
      row3: 0.8,
      row4: 1.5,
      ttm: 12.1,
    },
    {
      id: 8,
      title: "Free Cash Flow",
      row1: 120.3,
      row2: 80.5,
      row3: 18.7,
      row4: 55.6,
      ttm: 1.32,
    },
    {
      id: 9,
      title: "Debt to Equity Ratio",
      row1: 0.5,
      row2: 0.7,
      row3: 0.3,
      row4: 0.9,
      ttm: 12.1,
    },
    {
      id: 10,
      title: "Gross Profit Margin",
      row1: 55.2,
      row2: 65.1,
      row3: 10.4,
      row4: 20.6,
      ttm: 12.1,
    },
    {
      id: 11,
      title: "Beta",
      row1: 1.2,
      row2: 1.5,
      row3: 0.8,
      row4: 1.1,
      ttm: 12.1,
    },
    {
      id: 12,
      title: "Operating Expenses",
      row1: 78.6,
      row2: 60.9,
      row3: 12.3,
      row4: 34.7,
      ttm: 12.1,
    },
    {
      id: 13,
      title: "Net Asset Value",
      row1: 410.2,
      row2: 250.8,
      row3: 35.9,
      row4: 75.1,
      ttm: 12.1,
    },
    {
      id: 14,
      title: "Return on Equity",
      row1: 18.5,
      row2: 20.3,
      row3: 5.9,
      row4: 10.4,
      ttm: 12.1,
    },
    {
      id: 15,
      title: "Book Value Per Share",
      row1: 32.7,
      row2: 28.4,
      row3: 6.7,
      row4: 12.3,
      ttm: 1.32,
    },
    {
      id: 16,
      title: "Quick Ratio",
      row1: 1.4,
      row2: 1.3,
      row3: 0.9,
      row4: 1.1,
      ttm: 12.1,
    },
    {
      id: 17,
      title: "Current Ratio",
      row1: 2.1,
      row2: 1.9,
      row3: 1.0,
      row4: 1.6,
      ttm: 1.32,
    },
    {
      id: 18,
      title: "EBITDA",
      row1: 340.2,
      row2: 190.4,
      row3: 40.5,
      row4: 95.8,
      ttm: 1.21,
    },
    {
      id: 19,
      title: "Price to Book Ratio",
      row1: 3.8,
      row2: 4.2,
      row3: 1.5,
      row4: 2.7,
      ttm: 12.1,
    },
    {
      id: 20,
      title: "Inventory Turnover",
      row1: 4.5,
      row2: 3.9,
      row3: 1.8,
      row4: 2.2,
      ttm: 12.1,
    },
  ];
  const cellRenderers = {
    title: (item: DataType) => (
      <Text fontWeight={600} fontSize={16} color="#111928">
        {item?.title}
      </Text>
    ),
    ttm: (item: DataType) => (
      <Text fontSize={16} color="#111928" textAlign={"center"}>
        ${item?.ttm}
      </Text>
    ),
    row1: (item: DataType) => (
      <Text fontSize={16} color="#111928" textAlign={"center"}>
        ${item?.row1}
      </Text>
    ),
    row2: (item: DataType) => (
      <Text fontSize={16} color="#111928" textAlign={"center"}>
        ${item?.row2}
      </Text>
    ),
    row3: (item: DataType) => (
      <Text fontSize={16} color="#111928" textAlign={"center"}>
        ${item?.row3}
      </Text>
    ),
    row4: (item: DataType) => (
      <Text fontSize={16} color="#111928" textAlign={"center"}>
        ${item?.row4}
      </Text>
    ),
  };

  const columnOrder: (keyof DataType)[] = [
    "title",
    "ttm",
    "row1",
    "row2",
    "row3",
    "row4",
  ];

  const columnLabels = {
    title: "INCOME",
    ttm: "TTM",
    row1: "2022-12",
    row2: "2021-12",
    row3: "2020-12",
    row4: "2019-12",
  };

  const btnList = [
    {
      text: "Income Statements",
      value: "income-statements",
    },
    {
      text: "Balance Sheet",
      value: "balance-sheet",
    },
    {
      text: "Cashflow",
      value: "cashflow",
    },
  ];

  return (
    <Box bg="#fff" pt={4} mb={16}>
      <Box mb={4} mx={4}>
        <Text fontWeight={700} fontSize={20} color="#111928" mb={4}>
          Income Statements
        </Text>
        <Flex gap={2}>
          {btnList.map((filter: IButtonFilter, index: number) => (
            <ButtonIcon
              key={index}
              text={filter?.text}
              variant={filter?.value === btnFilter ? "solid" : "ghost"}
              bg={filter?.value === btnFilter ? "#351F05" : ""}
              fontWeight={500}
              color={filter?.value === btnFilter ? "#ffffff" : "#6B7280"}
              fontSize="12px"
              p={filter?.value === btnFilter ? "12px 16px" : "0px"}
              onClick={() => setBtnFilter(filter?.value)}
            />
          ))}
        </Flex>
      </Box>
      <TableComponent<DataType>
        tableData={dataSources}
        cellRenderers={cellRenderers}
        columnOrder={columnOrder}
        columnLabels={columnLabels}
      />
    </Box>
  );
};

export default Financials;
