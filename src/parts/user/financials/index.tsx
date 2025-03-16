"use client";

import { ButtonIcon } from "@/components/button/button-icon";
import { TableComponent } from "@/components/custom-table";
import DropdownSelect from "@/components/DropdownSelect";
import {
  AlldataSourceFinance,
  formatDateToHumanReadable,
} from "@/components/util";

import { IButtonFilter } from "@/interface/button-filter";
import { IStockComponent } from "@/interface/stock";
import {
  useGetBalanceSheet,
  useGetCashFlow,
  useGetIncomeStatement,
} from "@/services/stock";
import { DataItem } from "@/types";
import { ShineIcon } from "@/utils/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

interface DataType extends DataItem {
  id: number;
  row1: number;
  row2: number;
  row3: number;
  row4: number;
  row5: number;
  title: string;
}

const Financials: React.FC<IStockComponent> = ({ symbol }) => {
  const [btnFilter, setBtnFilter] = useState<string>("income-statements");
  const [Data, setData] = useState<any>([]);
  const [period, setPeriod] = useState<string>("annual");
  const [isFetchIncome, setisFetchIncome] = useState<boolean>(false);
  const [isFetchFin, setisFetchFin] = useState<boolean>(false);
  const [isFetchCash, setisFetchCash] = useState<boolean>(false);

  const {
    getIncomeStatementData,
    getIncomeStatementFilter,
    getIncomeStatementIsLoading,
    setGetIncomeStatementFilter,
    getIncomeStatementError,
  } = useGetIncomeStatement({ enabled: isFetchIncome });
  const {
    getBalanceSheetData,
    getBalanceSheetFilter,
    getBalanceSheetIsLoading,
    setGetBalanceSheetFilter,
    getBalanceSheetError,
  } = useGetBalanceSheet({ enabled: isFetchFin });
  const {
    getCashFlowData,
    getCashFlowFilter,
    getCashFlowIsLoading,
    setGetCashFlowFilter,
    getCashFlowError,
  } = useGetCashFlow({ enabled: isFetchCash });
  useEffect(() => {
    if (btnFilter == "income-statements") {
      setGetIncomeStatementFilter({ symbol: symbol, period: period });
      setisFetchIncome(true);
    } else if (btnFilter == "balance-sheet") {
      setGetBalanceSheetFilter({ symbol: symbol, period: period });
      setisFetchFin(true);
    } else if (btnFilter == "cashflow") {
      setGetCashFlowFilter({ symbol: symbol, period: period });
      setisFetchCash(true);
    }
  }, [btnFilter, period]);
  useEffect(() => {
    if (btnFilter == "income-statements") {
      setData(getIncomeStatementData);
    } else if (btnFilter == "balance-sheet") {
      console.log("balance shet set");
      setData(getBalanceSheetData);
    } else if (btnFilter == "cashflow") {
      console.log("cashflowset");
      setData(getCashFlowData);
    }
  }, [
    getCashFlowData,
    getIncomeStatementData,
    getCashFlowData,
    btnFilter,
    period,
  ]);

  console.log("all data", Data);

  const cellRenderers = {
    title: (item: DataType) => (
      <Text fontWeight={600} fontSize={16} color="#111928">
        {item?.title}
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
    row5: (item: DataType) => (
      <Text fontSize={16} color="#111928" textAlign={"center"}>
        ${item?.row5}
      </Text>
    ),
  };

  const columnOrder: (keyof DataType)[] = [
    "title",
    "row1",
    "row2",
    "row3",
    "row4",
    "row5",
  ];

  const columnLabels = {
    title:
      btnFilter == "income-statements"
        ? "INCOME"
        : btnFilter == "balance-sheet"
        ? "ASSET"
        : btnFilter == "cashflow"
        ? "CASHFLOW"
        : "NULL",
    row5: formatDateToHumanReadable(Data[4]?.acceptedDate),
    row1: formatDateToHumanReadable(Data[0]?.acceptedDate),
    row2: formatDateToHumanReadable(Data[1]?.acceptedDate),
    row3: formatDateToHumanReadable(Data[2]?.acceptedDate),
    row4: formatDateToHumanReadable(Data[3]?.acceptedDate),
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
  const handleDropdownChange = (value: string) => {
    setPeriod(value);
    console.log("Selected value:", value);
  };
  return (
    <Box bg="#fff" pt={4} mb={16}>
      <Box mb={4} mx={4}>
        <Text fontWeight={700} fontSize={20} color="#111928" mb={4}>
          Income Statements
        </Text>
        <Flex justifyContent="space-between" gap="2">
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
          <Box>
            <DropdownSelect value={period} onChange={handleDropdownChange} />
          </Box>
        </Flex>
      </Box>
      <TableComponent<DataType>
        //@ts-ignore
        tableData={AlldataSourceFinance(btnFilter, Data)}
        cellRenderers={cellRenderers}
        columnOrder={columnOrder}
        columnLabels={columnLabels}
      />
    </Box>
  );
};

export default Financials;
