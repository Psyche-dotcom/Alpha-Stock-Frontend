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

  const { getIncomeStatementData, setGetIncomeStatementFilter } =
    useGetIncomeStatement({ enabled: isFetchIncome });
  const { getBalanceSheetData, setGetBalanceSheetFilter } = useGetBalanceSheet(
    { enabled: isFetchFin }
  );
  const { getCashFlowData, setGetCashFlowFilter } = useGetCashFlow({
    enabled: isFetchCash,
  });

  useEffect(() => {
    setisFetchIncome(false);
    setisFetchFin(false);
    setisFetchCash(false);

    if (btnFilter === "income-statements") {
      setGetIncomeStatementFilter({ symbol: symbol, period: period });
      setisFetchIncome(true);
    } else if (btnFilter === "balance-sheet") {
      setGetBalanceSheetFilter({ symbol: symbol, period: period });
      setisFetchFin(true);
    } else if (btnFilter === "cashflow") {
      setGetCashFlowFilter({ symbol: symbol, period: period });
      setisFetchCash(true);
    }
  }, [btnFilter, period, symbol]);

  useEffect(() => {
    if (btnFilter === "income-statements") {
      setData(getIncomeStatementData);
    } else if (btnFilter === "balance-sheet") {
      setData(getBalanceSheetData);
    } else if (btnFilter === "cashflow") {
      setData(getCashFlowData);
    }
  }, [getIncomeStatementData, getBalanceSheetData, getCashFlowData, btnFilter]);

  // Helper function to render financial numbers with or without a dollar sign, ALWAYS formatted
  const renderFinancialNumber = (
    value: number | undefined,
    itemTitle: string,
    sectionType: string
  ) => {
    if (typeof value !== "number") {
      return "";
    }

    // 1. Always format the number first
    const formattedValue = formatMoneyNumber(value);

    // 2. Then, decide whether to prepend a dollar sign
    const isShareDataTable = btnFilter === "income-statements" && sectionType === "share";

    if (isShareDataTable) {
      // Return the formatted value without a dollar sign
      return formattedValue;
    } else {
      // Return the formatted value with a dollar sign
      return `$${formattedValue}`;
    }
  };

  const cellRenderers = {
    title: (item: DataType) => (
      <span
        className="whitespace-pre text-[#111928] text-[16px] font-medium"
        style={{
          fontWeight: getFontWeightByTitle(item?.title),
        }}
      >
        {item?.title === ""
          ? "                                                                "
          : item?.title}
      </span>
    ),
    // Each row renderer now accepts 'item' and 'section' directly
    row1: (item: DataType, section: string) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {renderFinancialNumber(item.row1, item.title, section)}
      </Text>
    ),
    row2: (item: DataType, section: string) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {renderFinancialNumber(item.row2, item.title, section)}
      </Text>
    ),
    row3: (item: DataType, section: string) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {renderFinancialNumber(item.row3, item.title, section)}
      </Text>
    ),
    row4: (item: DataType, section: string) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {renderFinancialNumber(item.row4, item.title, section)}
      </Text>
    ),
    row5: (item: DataType, section: string) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {renderFinancialNumber(item.row5, item.title, section)}
      </Text>
    ),
    row6: (item: DataType, section: string) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {renderFinancialNumber(item.row6, item.title, section)}
      </Text>
    ),
    row7: (item: DataType, section: string) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {renderFinancialNumber(item.row7, item.title, section)}
      </Text>
    ),
    row8: (item: DataType, section: string) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {renderFinancialNumber(item.row8, item.title, section)}
      </Text>
    ),
    row9: (item: DataType, section: string) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {renderFinancialNumber(item.row9, item.title, section)}
      </Text>
    ),
    row10: (item: DataType, section: string) => (
      <Text
        fontSize={13}
        color="#111928"
        textAlign={"center"}
        fontWeight={getFontWeightByTitle(item?.title)}
      >
        {renderFinancialNumber(item.row10, item.title, section)}
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
      btnFilter === "income-statements"
        ? "INCOME"
        : btnFilter === "balance-sheet"
        ? "ASSET"
        : btnFilter === "cashflow"
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
      btnFilter === "income-statements"
        ? "BASIC EPS"
        : btnFilter === "balance-sheet"
        ? "LIABILITIES"
        : btnFilter === "cashflow"
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
      btnFilter === "income-statements"
        ? "DILUTED EPS"
        : btnFilter === "balance-sheet"
        ? "SHAREHOLDER EQUITY"
        : btnFilter === "cashflow"
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
      btnFilter === "income-statements"
        ? "SHARES DATA"
        : btnFilter === "cashflow"
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
      btnFilter === "income-statements"
        ? "ADDITIONAL ITEMS (e.g., Shares)"
        : btnFilter === "balance-sheet"
        ? "ASSET"
        : btnFilter === "cashflow"
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
          {btnFilter === "income-statements"
            ? "Income Statements"
            : btnFilter === "balance-sheet"
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
        //@ts-ignore (This ignore might still be needed if AlldataSourceFinance returns 'any' or has type complexities)
        tableData={AlldataSourceFinance(
          btnFilter,
          "Income", // Section type
          Data
        )}
        // Now, we can directly pass the 'cellRenderers' object and the 'section' for this table
        cellRenderers={Object.fromEntries(
          Object.entries(cellRenderers).map(([key, renderer]) => [
            key,
            (item: DataType) => (renderer as any)(item, "Income"),
          ])
        )}
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
        cellRenderers={Object.fromEntries(
          Object.entries(cellRenderers).map(([key, renderer]) => {
            let currentSection = "";
            if (btnFilter === "income-statements") {
              currentSection = "BasicEps";
            } else if (btnFilter === "balance-sheet") {
              currentSection = "LIABLE";
            } else if (btnFilter === "cashflow") {
              currentSection = "Investing";
            }
            return [key, (item: DataType) => (renderer as any)(item, currentSection)];
          })
        )}
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
        cellRenderers={Object.fromEntries(
          Object.entries(cellRenderers).map(([key, renderer]) => {
            let currentSection = "";
            if (btnFilter === "income-statements") {
              currentSection = "DiEps";
            } else if (btnFilter === "balance-sheet") {
              currentSection = "SHARE";
            } else if (btnFilter === "cashflow") {
              currentSection = "Financing";
            }
            return [key, (item: DataType) => (renderer as any)(item, currentSection)];
          })
        )}
        columnOrder={columnOrder}
        columnLabels={columnLabels3}
        fixed={true}
      />
      {btnFilter !== "balance-sheet" && (
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
          cellRenderers={Object.fromEntries(
            Object.entries(cellRenderers).map(([key, renderer]) => {
              let currentSection = "";
              if (btnFilter === "income-statements") {
                  currentSection = "share"; // This passes 'share' for the SHARES DATA table
              } else if (btnFilter === "cashflow") {
                  currentSection = "cashbeginning";
              }
              return [key, (item: DataType) => (renderer as any)(item, currentSection)];
            })
          )}
          columnOrder={columnOrder}
          columnLabels={columnLabels4}
          fixed={true}
        />
      )}
      {btnFilter === "cashflow" && (
        <TableComponent<DataType>
          //@ts-ignore
          tableData={AlldataSourceFinance(
            btnFilter,
            "Items",
            Data
          )}
          cellRenderers={Object.fromEntries(
            Object.entries(cellRenderers).map(([key, renderer]) => [
              key,
              (item: DataType) => (renderer as any)(item, "Items"),
            ])
          )}
          columnOrder={columnOrder}
          columnLabels={columnLabels5}
          fixed={true}
        />
      )}
    </Box>
  );
};

export default Financials;