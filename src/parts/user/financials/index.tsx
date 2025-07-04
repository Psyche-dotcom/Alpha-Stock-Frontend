"use client";

import { ButtonIcon } from "@/components/button/button-icon";
import { TableComponent } from "@/components/custom-table";
import DropdownSelect from "@/components/DropdownSelect";
import {
  AlldataSourceFinance,
  formatDateToHumanReadableNew,
  formatMoneyNumber,
} from "@/components/util";

import { IButtonFilter2 } from "@/interface/button-filter";
import { IStockComponent } from "@/interface/stock";
import {
  useGetBalanceSheet,
  useGetCashFlow,
  useGetIncomeStatement,
} from "@/services/stock";
import { DataItem } from "@/types";
import { getFontWeightByTitle } from "@/utils";
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
  row6: number;
  row7: number;
  row8: number;
  row9: number;
  row10: number;
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
      setData(getBalanceSheetData);
    } else if (btnFilter == "cashflow") {
      setData(getCashFlowData);
    }
  }, [
    getCashFlowData,
    getIncomeStatementData,
    getCashFlowData,
    btnFilter,
    period,
  ]);

  const cellRenderers = {
    title: (item: DataType) => (
      <span
        className="whitespace-pre text-[#111928] text-[16px] font-medium"
        style={{
          fontWeight: getFontWeightByTitle(item?.title),
        }}
      >
        {item?.title == ""
          ? "                                                                "
          : item?.title}
      </span>
    ),

    row1: (item: DataType) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {typeof item?.row1 === "number"
          ? `$${formatMoneyNumber(item.row1)}`
          : ""}
      </Text>
    ),
    row2: (item: DataType) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {typeof item?.row2 === "number"
          ? `$${formatMoneyNumber(item.row2)}`
          : ""}
      </Text>
    ),
    row3: (item: DataType) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {typeof item?.row3 === "number"
          ? `$${formatMoneyNumber(item.row3)}`
          : ""}
      </Text>
    ),
    row4: (item: DataType) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {typeof item?.row4 === "number"
          ? `$${formatMoneyNumber(item.row4)}`
          : ""}
      </Text>
    ),
    row5: (item: DataType) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {typeof item?.row5 === "number"
          ? `$${formatMoneyNumber(item.row5)}`
          : ""}
      </Text>
    ),
    row6: (item: DataType) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {typeof item?.row6 === "number"
          ? `$${formatMoneyNumber(item.row6)}`
          : ""}
      </Text>
    ),
    row7: (item: DataType) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {typeof item?.row7 === "number"
          ? `$${formatMoneyNumber(item.row7)}`
          : ""}
      </Text>
    ),
    row8: (item: DataType) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {typeof item?.row8 === "number"
          ? `$${formatMoneyNumber(item.row8)}`
          : ""}
      </Text>
    ),
    row9: (item: DataType) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {typeof item?.row9 === "number"
          ? `$${formatMoneyNumber(item.row9)}`
          : ""}
      </Text>
    ),
    row10: (item: DataType) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {typeof item?.row10 === "number"
          ? `$${formatMoneyNumber(item.row10)}`
          : ""}
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
    "row6",
    "row7",
    "row8",
    "row9",
    "row10",
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
    row1: formatDateToHumanReadableNew(Data[0]?.acceptedDate),
    row2: formatDateToHumanReadableNew(Data[1]?.acceptedDate),
    row3: formatDateToHumanReadableNew(Data[2]?.acceptedDate),
    row4: formatDateToHumanReadableNew(Data[3]?.acceptedDate),
    row5: formatDateToHumanReadableNew(Data[4]?.acceptedDate),
    row6: formatDateToHumanReadableNew(Data[5]?.acceptedDate),
    row7: formatDateToHumanReadableNew(Data[6]?.acceptedDate),
    row8: formatDateToHumanReadableNew(Data[7]?.acceptedDate),
    row9: formatDateToHumanReadableNew(Data[8]?.acceptedDate),
    row10: formatDateToHumanReadableNew(Data[9]?.acceptedDate),
  };
  const columnLabels2 = {
    title:
      btnFilter == "income-statements"
        ? "BASIC EPS"
        : btnFilter == "balance-sheet"
        ? "LIABILITIES"
        : btnFilter == "cashflow"
        ? "CASHFLOW - INVESTING"
        : "NULL",
    row1: formatDateToHumanReadableNew(Data[0]?.acceptedDate),
    row2: formatDateToHumanReadableNew(Data[1]?.acceptedDate),
    row3: formatDateToHumanReadableNew(Data[2]?.acceptedDate),
    row4: formatDateToHumanReadableNew(Data[3]?.acceptedDate),
    row5: formatDateToHumanReadableNew(Data[4]?.acceptedDate),
    row6: formatDateToHumanReadableNew(Data[5]?.acceptedDate),
    row7: formatDateToHumanReadableNew(Data[6]?.acceptedDate),
    row8: formatDateToHumanReadableNew(Data[7]?.acceptedDate),
    row9: formatDateToHumanReadableNew(Data[8]?.acceptedDate),
    row10: formatDateToHumanReadableNew(Data[9]?.acceptedDate),
  };
  const columnLabels3 = {
    title:
      btnFilter == "income-statements"
        ? "DILUTED EPS"
        : btnFilter == "balance-sheet"
        ? "SHAREHOLDER EQUITY"
        : btnFilter == "cashflow"
        ? "CASHFLOW - FINANCING"
        : "NULL",
    row1: formatDateToHumanReadableNew(Data[0]?.acceptedDate),
    row2: formatDateToHumanReadableNew(Data[1]?.acceptedDate),
    row3: formatDateToHumanReadableNew(Data[2]?.acceptedDate),
    row4: formatDateToHumanReadableNew(Data[3]?.acceptedDate),
    row5: formatDateToHumanReadableNew(Data[4]?.acceptedDate),
    row6: formatDateToHumanReadableNew(Data[5]?.acceptedDate),
    row7: formatDateToHumanReadableNew(Data[6]?.acceptedDate),
    row8: formatDateToHumanReadableNew(Data[7]?.acceptedDate),
    row9: formatDateToHumanReadableNew(Data[8]?.acceptedDate),
    row10: formatDateToHumanReadableNew(Data[9]?.acceptedDate),
  };
  const columnLabels4 = {
    title:
      btnFilter == "income-statements"
        ? "SHARES DATA"
        : btnFilter == "balance-sheet"
        ? "ASSET"
        : btnFilter == "cashflow"
        ? "ENDING CASH"
        : "NULL",
    row1: formatDateToHumanReadableNew(Data[0]?.acceptedDate),
    row2: formatDateToHumanReadableNew(Data[1]?.acceptedDate),
    row3: formatDateToHumanReadableNew(Data[2]?.acceptedDate),
    row4: formatDateToHumanReadableNew(Data[3]?.acceptedDate),
    row5: formatDateToHumanReadableNew(Data[4]?.acceptedDate),
    row6: formatDateToHumanReadableNew(Data[5]?.acceptedDate),
    row7: formatDateToHumanReadableNew(Data[6]?.acceptedDate),
    row8: formatDateToHumanReadableNew(Data[7]?.acceptedDate),
    row9: formatDateToHumanReadableNew(Data[8]?.acceptedDate),
    row10: formatDateToHumanReadableNew(Data[9]?.acceptedDate),
  };
  const columnLabels5 = {
    title:
      btnFilter == "income-statements"
        ? "SHARES DATA"
        : btnFilter == "balance-sheet"
        ? "ASSET"
        : btnFilter == "cashflow"
        ? "ADDITIONAL ITEMS"
        : "NULL",
    row1: formatDateToHumanReadableNew(Data[0]?.acceptedDate),
    row2: formatDateToHumanReadableNew(Data[1]?.acceptedDate),
    row3: formatDateToHumanReadableNew(Data[2]?.acceptedDate),
    row4: formatDateToHumanReadableNew(Data[3]?.acceptedDate),
    row5: formatDateToHumanReadableNew(Data[4]?.acceptedDate),
    row6: formatDateToHumanReadableNew(Data[5]?.acceptedDate),
    row7: formatDateToHumanReadableNew(Data[6]?.acceptedDate),
    row8: formatDateToHumanReadableNew(Data[7]?.acceptedDate),
    row9: formatDateToHumanReadableNew(Data[8]?.acceptedDate),
    row10: formatDateToHumanReadableNew(Data[9]?.acceptedDate),
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
  };
  return (
    <Box bg="#fff" pt={4} mb={16}>
      <Box mb={4} mx={4}>
        <Text fontWeight={700} fontSize={20} color="#111928" mb={4}>
          {btnFilter == "income-statements"
            ? "Income Statements"
            : btnFilter == "balance-sheet"
            ? "Balance Sheet"
            : "Cash Flow"}
        </Text>
        <Flex justifyContent="space-between" gap="2">
          <Flex gap={2}>
            {btnList.map((filter: IButtonFilter2, index: number) => (
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
        tableData={AlldataSourceFinance(
          btnFilter,
          btnFilter === "income-statements"
            ? "Income"
            : btnFilter === "balance-sheet"
            ? "ASSET"
            : btnFilter === "cashflow"
            ? "CASH"
            : "",
          Data
        )}
        cellRenderers={cellRenderers}
        columnOrder={columnOrder}
        columnLabels={columnLabels}
        className="text-[#111928] font-semibold"
        fixed={true}
      />
      <TableComponent<DataType>
        //@ts-ignore
        tableData={AlldataSourceFinance(
          btnFilter,
          btnFilter === "income-statements"
            ? "BasicEps"
            : btnFilter === "balance-sheet"
            ? "LIABLE"
            : btnFilter === "cashflow"
            ? "Investing"
            : "",
          Data
        )}
        cellRenderers={cellRenderers}
        columnOrder={columnOrder}
        columnLabels={columnLabels2}
        fixed={true}
      />
      <TableComponent<DataType>
        //@ts-ignore
        tableData={AlldataSourceFinance(
          btnFilter,
          btnFilter === "income-statements"
            ? "DiEps"
            : btnFilter === "balance-sheet"
            ? "SHARE"
            : btnFilter === "cashflow"
            ? "Financing"
            : "",
          Data
        )}
        cellRenderers={cellRenderers}
        columnOrder={columnOrder}
        columnLabels={columnLabels3}
        fixed={true}
      />
      {btnFilter != "balance-sheet" && (
        <TableComponent<DataType>
          //@ts-ignore
          tableData={AlldataSourceFinance(
            btnFilter,
            btnFilter === "income-statements"
              ? "share"
              : btnFilter === "cashflow"
              ? "cashbeginning"
              : "",
            Data
          )}
          cellRenderers={cellRenderers}
          columnOrder={columnOrder}
          columnLabels={columnLabels4}
          fixed={true}
        />
      )}
      {btnFilter == "cashflow" && (
        <TableComponent<DataType>
          //@ts-ignore
          tableData={AlldataSourceFinance(
            btnFilter,
            btnFilter === "cashflow" ? "Items" : "",
            Data
          )}
          cellRenderers={cellRenderers}
          columnOrder={columnOrder}
          columnLabels={columnLabels5}
          fixed={true}
        />
      )}
    </Box>
  );
};

export default Financials;
