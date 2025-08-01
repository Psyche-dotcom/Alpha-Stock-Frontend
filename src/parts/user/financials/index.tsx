"use client";
import { ButtonIcon } from "@/components/button/button-icon";
import { TableComponent } from "@/components/custom-table";
import DropdownSelect from "@/components/DropdownSelect";
import {
  AlldataSourceFinance,
  formatDateToHumanReadableNew,
  formatMoneyNumber,
  formatMoneyNumberNew,
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
  ttm: number;
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
  const { getBalanceSheetData, setGetBalanceSheetFilter } = useGetBalanceSheet({
    enabled: isFetchFin,
  });
  const { getCashFlowData, setGetCashFlowFilter } = useGetCashFlow({
    enabled: isFetchCash,
  });
  useEffect(() => {
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

  const renderFinancialNumber = (
    value: number | undefined,
    itemTitle: string,
    sectionType: string
  ) => {
    if (typeof value !== "number") {
      return "";
    }
    const isShareDataTable =
      btnFilter === "income-statements" && sectionType === "share";
    if (isShareDataTable) {
      var data = formatMoneyNumberNew(value);
      return data;
    } else {
      const formattedValue = formatMoneyNumber(value);
      return `${formattedValue}`;
    }
  };

  // Helper function to determine if a row should be bold and underlined
  const isTargetBoldAndUnderlineRow = (
    title: string,
    currentFilter: string
  ) => {
    // Add the titles of the specific rows you want to target in the cashflow section
    const targetTitles = [
      "revenue",
      "net income",
      "gross profit",
      "cash from investing",
      "operating income",
      "pre-tax income",
      "net receivables",
      "inventories",
      "property plant equipment net",
      "total non current assets",
      "common dividends paid",
      "total current assets",
      "net cash provided by investing activities",
      "total assets",
      "free cash flow",

      "total liabilities",
      "total current liabilities",
      "total current liabilities",
      "total non current liabilities",
      "total equity",
      "cash & short term investments",
    ]; // Example titles
    return targetTitles.includes(title.toLowerCase());
  };

  const cellRenderers = {
    title: (item: DataType) => {
      const shouldApplyStyle = isTargetBoldAndUnderlineRow(
        item?.title,
        btnFilter
      );
      const defaultFontWeight = getFontWeightByTitle(item?.title);

      return (
        <span
          className="whitespace-pre text-[#111928] text-[16px]"
          style={{
            fontWeight: shouldApplyStyle ? 800 : defaultFontWeight,
            textDecoration: shouldApplyStyle ? "underline" : "none",
          }}
        >
          {item?.title === ""
            ? "                                                                                                   "
            : item?.title}
        </span>
      );
    },
    ttm: (item: DataType, section: string) => {
      const shouldApplyStyle = isTargetBoldAndUnderlineRow(
        item?.title,
        btnFilter
      );
      const defaultFontWeight = getFontWeightByTitle(item?.title);

      return (
        <Text
          fontSize={13}
          color="#111928"
          textAlign={"center"}
          fontWeight={shouldApplyStyle ? 800 : defaultFontWeight}
          textDecoration={shouldApplyStyle ? "underline" : "none"}
        >
          {renderFinancialNumber(item.ttm, item.title, section)}
        </Text>
      );
    },
    row1: (item: DataType, section: string) => {
      const shouldApplyStyle = isTargetBoldAndUnderlineRow(
        item?.title,
        btnFilter
      );
      const defaultFontWeight = getFontWeightByTitle(item?.title);
      return (
        <Text
          fontSize={13}
          color="#111928"
          textAlign={"center"}
          fontWeight={shouldApplyStyle ? 800 : defaultFontWeight}
          textDecoration={shouldApplyStyle ? "underline" : "none"}
        >
          {renderFinancialNumber(item.row1, item.title, section)}
        </Text>
      );
    },
    row2: (item: DataType, section: string) => {
      const shouldApplyStyle = isTargetBoldAndUnderlineRow(
        item?.title,
        btnFilter
      );
      const defaultFontWeight = getFontWeightByTitle(item?.title);
      return (
        <Text
          fontSize={13}
          color="#111928"
          textAlign={"center"}
          fontWeight={shouldApplyStyle ? 800 : defaultFontWeight}
          textDecoration={shouldApplyStyle ? "underline" : "none"}
        >
          {renderFinancialNumber(item.row2, item.title, section)}
        </Text>
      );
    },
    row3: (item: DataType, section: string) => {
      const shouldApplyStyle = isTargetBoldAndUnderlineRow(
        item?.title,
        btnFilter
      );
      const defaultFontWeight = getFontWeightByTitle(item?.title);
      return (
        <Text
          fontSize={13}
          color="#111928"
          textAlign={"center"}
          fontWeight={shouldApplyStyle ? 800 : defaultFontWeight}
          textDecoration={shouldApplyStyle ? "underline" : "none"}
        >
          {renderFinancialNumber(item.row3, item.title, section)}
        </Text>
      );
    },
    row4: (item: DataType, section: string) => {
      const shouldApplyStyle = isTargetBoldAndUnderlineRow(
        item?.title,
        btnFilter
      );
      const defaultFontWeight = getFontWeightByTitle(item?.title);
      return (
        <Text
          fontSize={13}
          color="#111928"
          textAlign={"center"}
          fontWeight={shouldApplyStyle ? 800 : defaultFontWeight}
          textDecoration={shouldApplyStyle ? "underline" : "none"}
        >
          {renderFinancialNumber(item.row4, item.title, section)}
        </Text>
      );
    },
    row5: (item: DataType, section: string) => {
      const shouldApplyStyle = isTargetBoldAndUnderlineRow(
        item?.title,
        btnFilter
      );
      const defaultFontWeight = getFontWeightByTitle(item?.title);
      return (
        <Text
          fontSize={13}
          color="#111928"
          textAlign={"center"}
          fontWeight={shouldApplyStyle ? 800 : defaultFontWeight}
          textDecoration={shouldApplyStyle ? "underline" : "none"}
        >
          {renderFinancialNumber(item.row5, item.title, section)}
        </Text>
      );
    },
    row6: (item: DataType, section: string) => {
      const shouldApplyStyle = isTargetBoldAndUnderlineRow(
        item?.title,
        btnFilter
      );
      const defaultFontWeight = getFontWeightByTitle(item?.title);
      return (
        <Text
          fontSize={13}
          color="#111928"
          textAlign={"center"}
          fontWeight={shouldApplyStyle ? 800 : defaultFontWeight}
          textDecoration={shouldApplyStyle ? "underline" : "none"}
        >
          {renderFinancialNumber(item.row6, item.title, section)}
        </Text>
      );
    },
    row7: (item: DataType, section: string) => {
      const shouldApplyStyle = isTargetBoldAndUnderlineRow(
        item?.title,
        btnFilter
      );
      const defaultFontWeight = getFontWeightByTitle(item?.title);
      return (
        <Text
          fontSize={13}
          color="#111928"
          textAlign={"center"}
          fontWeight={shouldApplyStyle ? 800 : defaultFontWeight}
          textDecoration={shouldApplyStyle ? "underline" : "none"}
        >
          {renderFinancialNumber(item.row7, item.title, section)}
        </Text>
      );
    },
    row8: (item: DataType, section: string) => {
      const shouldApplyStyle = isTargetBoldAndUnderlineRow(
        item?.title,
        btnFilter
      );
      const defaultFontWeight = getFontWeightByTitle(item?.title);
      return (
        <Text
          fontSize={13}
          color="#111928"
          textAlign={"center"}
          fontWeight={shouldApplyStyle ? 800 : defaultFontWeight}
          textDecoration={shouldApplyStyle ? "underline" : "none"}
        >
          {renderFinancialNumber(item.row8, item.title, section)}
        </Text>
      );
    },
    row9: (item: DataType, section: string) => {
      const shouldApplyStyle = isTargetBoldAndUnderlineRow(
        item?.title,
        btnFilter
      );
      const defaultFontWeight = getFontWeightByTitle(item?.title);
      return (
        <Text
          fontSize={13}
          color="#111928"
          textAlign={"center"}
          fontWeight={shouldApplyStyle ? 800 : defaultFontWeight}
          textDecoration={shouldApplyStyle ? "underline" : "none"}
        >
          {renderFinancialNumber(item.row9, item.title, section)}
        </Text>
      );
    },
    row10: (item: DataType, section: string) => {
      const shouldApplyStyle = isTargetBoldAndUnderlineRow(
        item?.title,
        btnFilter
      );
      const defaultFontWeight = getFontWeightByTitle(item?.title);
      return (
        <Text
          fontSize={13}
          color="#111928"
          textAlign={"center"}
          fontWeight={shouldApplyStyle ? 800 : defaultFontWeight}
          textDecoration={shouldApplyStyle ? "underline" : "none"}
        >
          {renderFinancialNumber(item.row10, item.title, section)}
        </Text>
      );
    },
  };

  const columnOrder: (keyof DataType)[] = [
    "title",
    "ttm",
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
        ? "ASSETS"
        : btnFilter === "cashflow"
        ? "CASHFLOW FROM OPERATING ACTIVITIES"
        : "NULL",
    ttm: "TTM",
    row1: formatDateToHumanReadableNew(Data[1]?.date),
    row2: formatDateToHumanReadableNew(Data[2]?.date),
    row3: formatDateToHumanReadableNew(Data[3]?.date),
    row4: formatDateToHumanReadableNew(Data[4]?.date),
    row5: formatDateToHumanReadableNew(Data[5]?.date),
    row6: formatDateToHumanReadableNew(Data[6]?.date),
    row7: formatDateToHumanReadableNew(Data[7]?.date),
    row8: formatDateToHumanReadableNew(Data[8]?.date),
    row9: formatDateToHumanReadableNew(Data[9]?.date),
    row10: formatDateToHumanReadableNew(Data[10]?.date),
  };
  const columnLabels2 = {
    title:
      btnFilter === "income-statements"
        ? "BASIC EPS"
        : btnFilter === "balance-sheet"
        ? "LIABILITIES"
        : btnFilter === "cashflow"
        ? "CASHFLOW FROM INVESTING ACTIVITIES"
        : "NULL",
    ttm: "TTM",
    row1: formatDateToHumanReadableNew(Data[1]?.date),
    row2: formatDateToHumanReadableNew(Data[2]?.date),
    row3: formatDateToHumanReadableNew(Data[3]?.date),
    row4: formatDateToHumanReadableNew(Data[4]?.date),
    row5: formatDateToHumanReadableNew(Data[5]?.date),
    row6: formatDateToHumanReadableNew(Data[6]?.date),
    row7: formatDateToHumanReadableNew(Data[7]?.date),
    row8: formatDateToHumanReadableNew(Data[8]?.date),
    row9: formatDateToHumanReadableNew(Data[9]?.date),
    row10: formatDateToHumanReadableNew(Data[10]?.date),
  };
  const columnLabels3 = {
    title:
      btnFilter === "income-statements"
        ? "DILUTED EPS"
        : btnFilter === "balance-sheet"
        ? "SHAREHOLDER EQUITY"
        : btnFilter === "cashflow"
        ? "CASHFLOW FROM FINANCING ACTIVITIES"
        : "NULL",
    ttm: "TTM",
    row1: formatDateToHumanReadableNew(Data[1]?.date),
    row2: formatDateToHumanReadableNew(Data[2]?.date),
    row3: formatDateToHumanReadableNew(Data[3]?.date),
    row4: formatDateToHumanReadableNew(Data[4]?.date),
    row5: formatDateToHumanReadableNew(Data[5]?.date),
    row6: formatDateToHumanReadableNew(Data[6]?.date),
    row7: formatDateToHumanReadableNew(Data[7]?.date),
    row8: formatDateToHumanReadableNew(Data[8]?.date),
    row9: formatDateToHumanReadableNew(Data[9]?.date),
    row10: formatDateToHumanReadableNew(Data[10]?.date),
  };
  const columnLabels4 = {
    title:
      btnFilter === "income-statements"
        ? "SHARES DATA"
        : btnFilter === "cashflow"
        ? "ENDING CASH"
        : "NULL",
    ttm: "TTM",
    row1: formatDateToHumanReadableNew(Data[1]?.date),
    row2: formatDateToHumanReadableNew(Data[2]?.date),
    row3: formatDateToHumanReadableNew(Data[3]?.date),
    row4: formatDateToHumanReadableNew(Data[4]?.date),
    row5: formatDateToHumanReadableNew(Data[5]?.date),
    row6: formatDateToHumanReadableNew(Data[6]?.date),
    row7: formatDateToHumanReadableNew(Data[7]?.date),
    row8: formatDateToHumanReadableNew(Data[8]?.date),
    row9: formatDateToHumanReadableNew(Data[9]?.date),
    row10: formatDateToHumanReadableNew(Data[10]?.date),
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
    ttm: "TTM",
    row1: formatDateToHumanReadableNew(Data[1]?.date),
    row2: formatDateToHumanReadableNew(Data[2]?.date),
    row3: formatDateToHumanReadableNew(Data[3]?.date),
    row4: formatDateToHumanReadableNew(Data[4]?.date),
    row5: formatDateToHumanReadableNew(Data[5]?.date),
    row6: formatDateToHumanReadableNew(Data[6]?.date),
    row7: formatDateToHumanReadableNew(Data[7]?.date),
    row8: formatDateToHumanReadableNew(Data[8]?.date),
    row9: formatDateToHumanReadableNew(Data[9]?.date),
    row10: formatDateToHumanReadableNew(Data[10]?.date),
  };
  const columnLabels6 = {
    title: "ADDITIONAL ITEMS",
    ttm: "TTM",
    row1: formatDateToHumanReadableNew(Data[1]?.date),
    row2: formatDateToHumanReadableNew(Data[2]?.date),
    row3: formatDateToHumanReadableNew(Data[3]?.date),
    row4: formatDateToHumanReadableNew(Data[4]?.date),
    row5: formatDateToHumanReadableNew(Data[5]?.date),
    row6: formatDateToHumanReadableNew(Data[6]?.date),
    row7: formatDateToHumanReadableNew(Data[7]?.date),
    row8: formatDateToHumanReadableNew(Data[8]?.date),
    row9: formatDateToHumanReadableNew(Data[9]?.date),
    row10: formatDateToHumanReadableNew(Data[10]?.date),
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
        cellRenderers={Object.fromEntries(
          Object.entries(cellRenderers).map(([key, renderer]) => {
            let currentSection = "";
            if (btnFilter === "income-statements") {
              currentSection = "Income";
            } else if (btnFilter === "balance-sheet") {
              currentSection = "ASSET";
            } else if (btnFilter === "cashflow") {
              currentSection = "CASH";
            }
            return [
              key,
              (item: DataType) => (renderer as any)(item, currentSection),
            ];
          })
        )}
        columnOrder={columnOrder}
        columnLabels={columnLabels}
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
            return [
              key,
              (item: DataType) => (renderer as any)(item, currentSection),
            ];
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
            return [
              key,
              (item: DataType) => (renderer as any)(item, currentSection),
            ];
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
              return [
                key,
                (item: DataType) => (renderer as any)(item, currentSection),
              ];
            })
          )}
          columnOrder={columnOrder}
          columnLabels={columnLabels4}
          fixed={true}
        />
      )}
      {/* {btnFilter === "cashflow" && (
        <TableComponent<DataType>
          //@ts-ignore
          tableData={AlldataSourceFinance(btnFilter, "Items", Data)}
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
      )} */}
      {btnFilter === "balance-sheet" && (
        <TableComponent<DataType>
          //@ts-ignore
          tableData={AlldataSourceFinance(
            btnFilter,
            "ADDITIONALBALSHEET",
            Data
          )}
          cellRenderers={Object.fromEntries(
            Object.entries(cellRenderers).map(([key, renderer]) => [
              key,
              (item: DataType) => (renderer as any)(item, "ADDITIONALBALSHEET"),
            ])
          )}
          columnOrder={columnOrder}
          columnLabels={columnLabels6}
          fixed={true}
        />
      )}
    </Box>
  );
};

export default Financials;
