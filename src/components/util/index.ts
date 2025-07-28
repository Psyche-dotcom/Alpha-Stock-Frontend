export const AlldataSourceFinance = (
  filter: string,
  type: string,
  Data: any[]
) => {
  let dataSources: {
    id: number;
    title: string;
    row1?: any;
    row2?: any;
    row3?: any;
    row4?: any;
    row5?: any;
    row6?: any;
    row7?: any;
    row8?: any;
    row9?: any;
    row10?: any;
    ttm?: any;
  }[] = [];

  if (filter == "income-statements") {
    if (type == "Income") {
      dataSources = [
        {
          id: 3,
          title: "Revenue",
          ttm: Data[0]?.revenue,
          row1: Data[1]?.revenue,
          row2: Data[2]?.revenue,
          row3: Data[3]?.revenue,
          row4: Data[4]?.revenue,
          row5: Data[5]?.revenue,
          row6: Data[6]?.revenue,
          row7: Data[7]?.revenue,
          row8: Data[8]?.revenue,
          row9: Data[9]?.revenue,
          row10: Data[10]?.revenue,
        },
        {
          id: 4,
          title: "Cost Of Revenue",
          ttm: Data[0]?.costOfRevenue,
          row1: Data[1]?.costOfRevenue,
          row2: Data[2]?.costOfRevenue,
          row3: Data[3]?.costOfRevenue,
          row4: Data[4]?.costOfRevenue,
          row5: Data[5]?.costOfRevenue,
          row6: Data[6]?.costOfRevenue,
          row7: Data[7]?.costOfRevenue,
          row8: Data[8]?.costOfRevenue,
          row9: Data[9]?.costOfRevenue,
          row10: Data[10]?.costOfRevenue,
        },
        {
          id: 5,
          title: "Gross Profit",
          ttm: Data[0]?.grossProfit,
          row1: Data[1]?.grossProfit,
          row2: Data[2]?.grossProfit,
          row3: Data[3]?.grossProfit,
          row4: Data[4]?.grossProfit,
          row5: Data[5]?.grossProfit,
          row6: Data[6]?.grossProfit,
          row7: Data[7]?.grossProfit,
          row8: Data[8]?.grossProfit,
          row9: Data[9]?.grossProfit,
          row10: Data[10]?.grossProfit,
        },
        {
          id: 11,
          title: "Operating Expenses",
          ttm: Data[0]?.operatingExpenses,
          row1: Data[1]?.operatingExpenses,
          row2: Data[2]?.operatingExpenses,
          row3: Data[3]?.operatingExpenses,
          row4: Data[4]?.operatingExpenses,
          row5: Data[5]?.operatingExpenses,
          row6: Data[6]?.operatingExpenses,
          row7: Data[7]?.operatingExpenses,
          row8: Data[8]?.operatingExpenses,
          row9: Data[9]?.operatingExpenses,
          row10: Data[10]?.operatingExpenses,
        },
        {
          id: 6,
          title: "Research And Development Expenses",
          ttm: Data[0]?.researchAndDevelopmentExpenses,
          row1: Data[1]?.researchAndDevelopmentExpenses,
          row2: Data[2]?.researchAndDevelopmentExpenses,
          row3: Data[3]?.researchAndDevelopmentExpenses,
          row4: Data[4]?.researchAndDevelopmentExpenses,
          row5: Data[5]?.researchAndDevelopmentExpenses,
          row6: Data[6]?.researchAndDevelopmentExpenses,
          row7: Data[7]?.researchAndDevelopmentExpenses,
          row8: Data[8]?.researchAndDevelopmentExpenses,
          row9: Data[9]?.researchAndDevelopmentExpenses,
          row10: Data[10]?.researchAndDevelopmentExpenses,
        },
        {
          id: 9,
          title: "Selling General And Administrative Expenses",
          ttm: Data[0]?.sellingGeneralAndAdministrativeExpenses,
          row1: Data[1]?.sellingGeneralAndAdministrativeExpenses,
          row2: Data[2]?.sellingGeneralAndAdministrativeExpenses,
          row3: Data[3]?.sellingGeneralAndAdministrativeExpenses,
          row4: Data[4]?.sellingGeneralAndAdministrativeExpenses,
          row5: Data[5]?.sellingGeneralAndAdministrativeExpenses,
          row6: Data[6]?.sellingGeneralAndAdministrativeExpenses,
          row7: Data[7]?.sellingGeneralAndAdministrativeExpenses,
          row8: Data[8]?.sellingGeneralAndAdministrativeExpenses,
          row9: Data[9]?.sellingGeneralAndAdministrativeExpenses,
          row10: Data[10]?.sellingGeneralAndAdministrativeExpenses,
        },
        {
          id: 16,
          title: "Depreciation And Amortization",
          ttm: Data[0]?.depreciationAndAmortization,
          row1: Data[1]?.depreciationAndAmortization,
          row2: Data[2]?.depreciationAndAmortization,
          row3: Data[3]?.depreciationAndAmortization,
          row4: Data[4]?.depreciationAndAmortization,
          row5: Data[5]?.depreciationAndAmortization,
          row6: Data[6]?.depreciationAndAmortization,
          row7: Data[7]?.depreciationAndAmortization,
          row8: Data[8]?.depreciationAndAmortization,
          row9: Data[9]?.depreciationAndAmortization,
          row10: Data[10]?.depreciationAndAmortization,
        },

        {
          id: 20,
          title: "Operating Income",
          ttm: Data[0]?.operatingIncome,
          row1: Data[1]?.operatingIncome,
          row2: Data[2]?.operatingIncome,
          row3: Data[3]?.operatingIncome,
          row4: Data[4]?.operatingIncome,
          row5: Data[5]?.operatingIncome,
          row6: Data[6]?.operatingIncome,
          row7: Data[7]?.operatingIncome,
          row8: Data[8]?.operatingIncome,
          row9: Data[9]?.operatingIncome,
          row10: Data[10]?.operatingIncome,
        },
        {
          id: 12,
          title: "Cost And Expenses",
          ttm: Data[0]?.costAndExpenses,
          row1: Data[1]?.costAndExpenses,
          row2: Data[2]?.costAndExpenses,
          row3: Data[3]?.costAndExpenses,
          row4: Data[4]?.costAndExpenses,
          row5: Data[5]?.costAndExpenses,
          row6: Data[6]?.costAndExpenses,
          row7: Data[7]?.costAndExpenses,
          row8: Data[8]?.costAndExpenses,
          row9: Data[9]?.costAndExpenses,
          row10: Data[10]?.costAndExpenses,
        },
        {
          id: 10,
          title: "Other Expenses",
          ttm: Data[0]?.otherExpenses,
          row1: Data[1]?.otherExpenses,
          row2: Data[2]?.otherExpenses,
          row3: Data[3]?.otherExpenses,
          row4: Data[4]?.otherExpenses,
          row5: Data[5]?.otherExpenses,
          row6: Data[6]?.otherExpenses,
          row7: Data[7]?.otherExpenses,
          row8: Data[8]?.otherExpenses,
          row9: Data[9]?.otherExpenses,
          row10: Data[10]?.otherExpenses,
        },
        {
          id: 19,
          title: "Non Operating Income Excluding Interest",
          ttm: Data[0]?.nonOperatingIncomeExcludingInterest,
          row1: Data[1]?.nonOperatingIncomeExcludingInterest,
          row2: Data[2]?.nonOperatingIncomeExcludingInterest,
          row3: Data[3]?.nonOperatingIncomeExcludingInterest,
          row4: Data[4]?.nonOperatingIncomeExcludingInterest,
          row5: Data[5]?.nonOperatingIncomeExcludingInterest,
          row6: Data[6]?.nonOperatingIncomeExcludingInterest,
          row7: Data[7]?.nonOperatingIncomeExcludingInterest,
          row8: Data[8]?.nonOperatingIncomeExcludingInterest,
          row9: Data[9]?.nonOperatingIncomeExcludingInterest,
          row10: Data[10]?.nonOperatingIncomeExcludingInterest,
        },
        {
          id: 35,
          title: "Net Interest Income",
          ttm: Data[0]?.netInterestIncome,
          row1: Data[1]?.netInterestIncome,
          row2: Data[2]?.netInterestIncome,
          row3: Data[3]?.netInterestIncome,
          row4: Data[4]?.netInterestIncome,
          row5: Data[5]?.netInterestIncome,
          row6: Data[6]?.netInterestIncome,
          row7: Data[7]?.netInterestIncome,
          row8: Data[8]?.netInterestIncome,
          row9: Data[9]?.netInterestIncome,
          row10: Data[10]?.netInterestIncome,
        },
        {
          id: 14,
          title: "Interest Income",
          ttm: Data[0]?.interestIncome,
          row1: Data[1]?.interestIncome,
          row2: Data[2]?.interestIncome,
          row3: Data[3]?.interestIncome,
          row4: Data[4]?.interestIncome,
          row5: Data[5]?.interestIncome,
          row6: Data[6]?.interestIncome,
          row7: Data[7]?.interestIncome,
          row8: Data[8]?.interestIncome,
          row9: Data[9]?.interestIncome,
          row10: Data[10]?.interestIncome,
        },
        {
          id: 21,
          title: "Total Other Income Expenses Net",
          ttm: Data[0]?.totalOtherIncomeExpensesNet,
          row1: Data[1]?.totalOtherIncomeExpensesNet,
          row2: Data[2]?.totalOtherIncomeExpensesNet,
          row3: Data[3]?.totalOtherIncomeExpensesNet,
          row4: Data[4]?.totalOtherIncomeExpensesNet,
          row5: Data[5]?.totalOtherIncomeExpensesNet,
          row6: Data[6]?.totalOtherIncomeExpensesNet,
          row7: Data[7]?.totalOtherIncomeExpensesNet,
          row8: Data[8]?.totalOtherIncomeExpensesNet,
          row9: Data[9]?.totalOtherIncomeExpensesNet,
          row10: Data[10]?.totalOtherIncomeExpensesNet,
        },
        {
          id: 23,
          title: "Pre-Tax Income",
          ttm: Data[0]?.incomeBeforeTax,
          row1: Data[1]?.incomeBeforeTax,
          row2: Data[2]?.incomeBeforeTax,
          row3: Data[3]?.incomeBeforeTax,
          row4: Data[4]?.incomeBeforeTax,
          row5: Data[5]?.incomeBeforeTax,
          row6: Data[6]?.incomeBeforeTax,
          row7: Data[7]?.incomeBeforeTax,
          row8: Data[8]?.incomeBeforeTax,
          row9: Data[9]?.incomeBeforeTax,
          row10: Data[10]?.incomeBeforeTax,
        },
        {
          id: 240,
          title: "Income Tax Expense",
          ttm: Data[0]?.incomeTaxExpense,
          row1: Data[1]?.incomeTaxExpense,
          row2: Data[2]?.incomeTaxExpense,
          row3: Data[3]?.incomeTaxExpense,
          row4: Data[4]?.incomeTaxExpense,
          row5: Data[5]?.incomeTaxExpense,
          row6: Data[6]?.incomeTaxExpense,
          row7: Data[7]?.incomeTaxExpense,
          row8: Data[8]?.incomeTaxExpense,
          row9: Data[9]?.incomeTaxExpense,
          row10: Data[10]?.incomeTaxExpense,
        },
        {
          id: 204,
          title: "Net Income From Continuing Operations",
          ttm: Data[0]?.netIncomeFromContinuingOperations,
          row1: Data[1]?.netIncomeFromContinuingOperations,
          row2: Data[2]?.netIncomeFromContinuingOperations,
          row3: Data[3]?.netIncomeFromContinuingOperations,
          row4: Data[4]?.netIncomeFromContinuingOperations,
          row5: Data[5]?.netIncomeFromContinuingOperations,
          row6: Data[6]?.netIncomeFromContinuingOperations,
          row7: Data[7]?.netIncomeFromContinuingOperations,
          row8: Data[8]?.netIncomeFromContinuingOperations,
          row9: Data[9]?.netIncomeFromContinuingOperations,
          row10: Data[10]?.netIncomeFromContinuingOperations,
        },
        {
          id: 25,
          title: "Net Income From Discontinued Operations",
          ttm: Data[0]?.netIncomeFromDiscontinuedOperations,
          row1: Data[1]?.netIncomeFromDiscontinuedOperations,
          row2: Data[2]?.netIncomeFromDiscontinuedOperations,
          row3: Data[3]?.netIncomeFromDiscontinuedOperations,
          row4: Data[4]?.netIncomeFromDiscontinuedOperations,
          row5: Data[5]?.netIncomeFromDiscontinuedOperations,
          row6: Data[6]?.netIncomeFromDiscontinuedOperations,
          row7: Data[7]?.netIncomeFromDiscontinuedOperations,
          row8: Data[8]?.netIncomeFromDiscontinuedOperations,
          row9: Data[9]?.netIncomeFromDiscontinuedOperations,
          row10: Data[10]?.netIncomeFromDiscontinuedOperations,
        },
        {
          id: 26,
          title: "Other Adjustments To NetIncome",
          ttm: Data[0]?.otherAdjustmentsToNetIncome,
          row1: Data[1]?.otherAdjustmentsToNetIncome,
          row2: Data[2]?.otherAdjustmentsToNetIncome,
          row3: Data[3]?.otherAdjustmentsToNetIncome,
          row4: Data[4]?.otherAdjustmentsToNetIncome,
          row5: Data[5]?.otherAdjustmentsToNetIncome,
          row6: Data[6]?.otherAdjustmentsToNetIncome,
          row7: Data[7]?.otherAdjustmentsToNetIncome,
          row8: Data[8]?.otherAdjustmentsToNetIncome,
          row9: Data[9]?.otherAdjustmentsToNetIncome,
          row10: Data[10]?.otherAdjustmentsToNetIncome,
        },
        {
          id: 28,
          title: "Net Income Deductions",
          ttm: Data[0]?.netIncomeDeductions,
          row1: Data[1]?.netIncomeDeductions,
          row2: Data[2]?.netIncomeDeductions,
          row3: Data[3]?.netIncomeDeductions,
          row4: Data[4]?.netIncomeDeductions,
          row5: Data[5]?.netIncomeDeductions,
          row6: Data[6]?.netIncomeDeductions,
          row7: Data[7]?.netIncomeDeductions,
          row8: Data[8]?.netIncomeDeductions,
          row9: Data[9]?.netIncomeDeductions,
          row10: Data[10]?.netIncomeDeductions,
        },
        {
          id: 207,
          title: "Net Income",
          ttm: Data[0]?.netIncome,
          row1: Data[1]?.netIncome,
          row2: Data[2]?.netIncome,
          row3: Data[3]?.netIncome,
          row4: Data[4]?.netIncome,
          row5: Data[5]?.netIncome,
          row6: Data[6]?.netIncome,
          row7: Data[7]?.netIncome,
          row8: Data[8]?.netIncome,
          row9: Data[9]?.netIncome,
          row10: Data[10]?.netIncome,
        },
        // {
        //   id: 8,
        //   title: "Selling And Marketing Expenses",
        //   ttm: Data[0]?.sellingAndMarketingExpenses,
        //   row1: Data[1]?.sellingAndMarketingExpenses,
        //   row2: Data[2]?.sellingAndMarketingExpenses,
        //   row3: Data[3]?.sellingAndMarketingExpenses,
        //   row4: Data[4]?.sellingAndMarketingExpenses,
        //   row5: Data[5]?.sellingAndMarketingExpenses,
        //   row6: Data[6]?.sellingAndMarketingExpenses,
        //   row7: Data[7]?.sellingAndMarketingExpenses,
        //   row8: Data[8]?.sellingAndMarketingExpenses,
        //   row9: Data[9]?.sellingAndMarketingExpenses,
        //   row10: Data[10]?.sellingAndMarketingExpenses,
        // },

        // {
        //   id: 15,
        //   title: "Interest Expense",
        //   ttm: Data[0]?.interestExpense,
        //   row1: Data[1]?.interestExpense,
        //   row2: Data[2]?.interestExpense,
        //   row3: Data[3]?.interestExpense,
        //   row4: Data[4]?.interestExpense,
        //   row5: Data[5]?.interestExpense,
        //   row6: Data[6]?.interestExpense,
        //   row7: Data[7]?.interestExpense,
        //   row8: Data[8]?.interestExpense,
        //   row9: Data[9]?.interestExpense,
        //   row10: Data[10]?.interestExpense,
        // },

        // {
        //   id: 2347,
        //   title: "Bottom Line NetIncome",
        //   ttm: Data[0]?.bottomLineNetIncome,
        //   row1: Data[1]?.bottomLineNetIncome,
        //   row2: Data[2]?.bottomLineNetIncome,
        //   row3: Data[3]?.bottomLineNetIncome,
        //   row4: Data[4]?.bottomLineNetIncome,
        //   row5: Data[5]?.bottomLineNetIncome,
        //   row6: Data[6]?.bottomLineNetIncome,
        //   row7: Data[7]?.bottomLineNetIncome,
        //   row8: Data[8]?.bottomLineNetIncome,
        //   row9: Data[9]?.bottomLineNetIncome,
        //   row10: Data[10]?.bottomLineNetIncome,
        // },

        // {
        //   id: 7,
        //   title: "General And Administrative Expenses",
        //   ttm: Data[0]?.generalAndAdministrativeExpenses,
        //   row1: Data[1]?.generalAndAdministrativeExpenses,
        //   row2: Data[2]?.generalAndAdministrativeExpenses,
        //   row3: Data[3]?.generalAndAdministrativeExpenses,
        //   row4: Data[4]?.generalAndAdministrativeExpenses,
        //   row5: Data[5]?.generalAndAdministrativeExpenses,
        //   row6: Data[6]?.generalAndAdministrativeExpenses,
        //   row7: Data[7]?.generalAndAdministrativeExpenses,
        //   row8: Data[8]?.generalAndAdministrativeExpenses,
        //   row9: Data[9]?.generalAndAdministrativeExpenses,
        //   row10: Data[10]?.generalAndAdministrativeExpenses,
        // },

        {
          id: 100,
          title: "",
          ttm: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
          row6: "",
          row7: "",
          row8: "",
          row9: "",
          row10: "",
        },
      ];
    }
    if (type == "BasicEps") {
      dataSources = [
        // {
        //   id: 17,
        //   title: "EBIT",
        //   ttm: Data[0]?.ebit,
        //   row1: Data[1]?.ebit,
        //   row2: Data[2]?.ebit,
        //   row3: Data[3]?.ebit,
        //   row4: Data[4]?.ebit,
        //   row5: Data[5]?.ebit,
        //   row6: Data[6]?.ebit,
        //   row7: Data[7]?.ebit,
        //   row8: Data[8]?.ebit,
        //   row9: Data[9]?.ebit,
        //   row10: Data[10]?.ebit,
        // },

        {
          id: 29,
          title: "EPS",
          ttm: Data[0]?.eps,
          row1: Data[1]?.eps,
          row2: Data[2]?.eps,
          row3: Data[3]?.eps,
          row4: Data[4]?.eps,
          row5: Data[5]?.eps,
          row6: Data[6]?.eps,
          row7: Data[7]?.eps,
          row8: Data[8]?.eps,
          row9: Data[9]?.eps,
          row10: Data[10]?.eps,
        },
        {
          id: 100,
          title: "",
          ttm: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
          row6: "",
          row7: "",
          row8: "",
          row9: "",
          row10: "",
        },
      ];
    }
    if (type == "DiEps") {
      dataSources = [
        // {
        //   id: 18,
        //   title: "EBITDA",
        //   ttm: Data[0]?.ebitda,
        //   row1: Data[1]?.ebitda,
        //   row2: Data[2]?.ebitda,
        //   row3: Data[3]?.ebitda,
        //   row4: Data[4]?.ebitda,
        //   row5: Data[5]?.ebitda,
        //   row6: Data[6]?.ebitda,
        //   row7: Data[7]?.ebitda,
        //   row8: Data[8]?.ebitda,
        //   row9: Data[9]?.ebitda,
        //   row10: Data[10]?.ebitda,
        // },
        {
          id: 30,
          title: "EPS Diluted",
          ttm: Data[0]?.epsDiluted,
          row1: Data[1]?.epsDiluted,
          row2: Data[2]?.epsDiluted,
          row3: Data[3]?.epsDiluted,
          row4: Data[4]?.epsDiluted,
          row5: Data[5]?.epsDiluted,
          row6: Data[6]?.epsDiluted,
          row7: Data[7]?.epsDiluted,
          row8: Data[8]?.epsDiluted,
          row9: Data[9]?.epsDiluted,
          row10: Data[10]?.epsDiluted,
        },
        {
          id: 100,
          title: "",
          ttm: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
          row6: "",
          row7: "",
          row8: "",
          row9: "",
          row10: "",
        },
      ];
    }

    if (type == "share") {
      dataSources = [
        {
          id: 31,
          title: "Average Basic Shares Outstanding",
          ttm: Data[0]?.weightedAverageShsOut,
          row1: Data[1]?.weightedAverageShsOut,
          row2: Data[2]?.weightedAverageShsOut,
          row3: Data[3]?.weightedAverageShsOut,
          row4: Data[4]?.weightedAverageShsOut,
          row5: Data[5]?.weightedAverageShsOut,
          row6: Data[6]?.weightedAverageShsOut,
          row7: Data[7]?.weightedAverageShsOut,
          row8: Data[8]?.weightedAverageShsOut,
          row9: Data[9]?.weightedAverageShsOut,
          row10: Data[10]?.weightedAverageShsOut,
        },
        {
          id: 32,
          title: "Average Diluted Shares Outstanding",
          ttm: Data[0]?.accountPayables,
          row1: Data[1]?.accountPayables,
          row2: Data[2]?.weightedAverageShsOutDil,
          row3: Data[3]?.weightedAverageShsOutDil,
          row4: Data[4]?.weightedAverageShsOutDil,
          row5: Data[5]?.weightedAverageShsOutDil,
          row6: Data[6]?.weightedAverageShsOutDil,
          row7: Data[7]?.weightedAverageShsOutDil,
          row8: Data[8]?.weightedAverageShsOutDil,
          row9: Data[9]?.weightedAverageShsOutDil,
          row10: Data[10]?.weightedAverageShsOutDil,
        },
        {
          id: 10920,
          title: "",
          ttm: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
          row6: "",
          row7: "",
          row8: "",
          row9: "",
          row10: "",
        },
      ];
    }
  } else if (filter == "balance-sheet") {
    if (type == "ASSET") {
      dataSources = [
        {
          id: 6,
          title: "Cash And Cash Equivalents",
          ttm: Data[0]?.cashAndCashEquivalents,
          row1: Data[1]?.cashAndCashEquivalents,
          row2: Data[2]?.cashAndCashEquivalents,
          row3: Data[3]?.cashAndCashEquivalents,
          row4: Data[4]?.cashAndCashEquivalents,
          row5: Data[5]?.cashAndCashEquivalents,
          row6: Data[6]?.cashAndCashEquivalents,
          row7: Data[7]?.cashAndCashEquivalents,
          row8: Data[8]?.cashAndCashEquivalents,
          row9: Data[9]?.cashAndCashEquivalents,
          row10: Data[10]?.cashAndCashEquivalents,
        },
        {
          id: 33,
          title: "Short Term Investments",
          ttm: Data[0]?.shortTermInvestments,
          row1: Data[1]?.shortTermInvestments,
          row2: Data[2]?.shortTermInvestments,
          row3: Data[3]?.shortTermInvestments,
          row4: Data[4]?.shortTermInvestments,
          row5: Data[5]?.shortTermInvestments,
          row6: Data[6]?.shortTermInvestments,
          row7: Data[7]?.shortTermInvestments,
          row8: Data[8]?.shortTermInvestments,
          row9: Data[9]?.shortTermInvestments,
          row10: Data[10]?.shortTermInvestments,
        },

        {
          id: 7,
          title: "Cash & Short Term Investments",
          ttm: Data[0]?.cashAndShortTermInvestments,
          row1: Data[1]?.cashAndShortTermInvestments,
          row2: Data[2]?.cashAndShortTermInvestments,
          row3: Data[3]?.cashAndShortTermInvestments,
          row4: Data[4]?.cashAndShortTermInvestments,
          row5: Data[5]?.cashAndShortTermInvestments,
          row6: Data[6]?.cashAndShortTermInvestments,
          row7: Data[7]?.cashAndShortTermInvestments,
          row8: Data[8]?.cashAndShortTermInvestments,
          row9: Data[9]?.cashAndShortTermInvestments,
          row10: Data[10]?.cashAndShortTermInvestments,
        },
        {
          id: 2,
          title: "Accounts Receivables",
          ttm: Data[0]?.accountsReceivables,
          row1: Data[1]?.accountsReceivables,
          row2: Data[2]?.accountsReceivables,
          row3: Data[3]?.accountsReceivables,
          row4: Data[4]?.accountsReceivables,
          row5: Data[5]?.accountsReceivables,
          row6: Data[6]?.accountsReceivables,
          row7: Data[7]?.accountsReceivables,
          row8: Data[8]?.accountsReceivables,
          row9: Data[9]?.accountsReceivables,
          row10: Data[10]?.accountsReceivables,
        },
        {
          id: 287,
          title: "Other Receivables",
          ttm: Data[0]?.otherReceivables,
          row1: Data[1]?.otherReceivables,
          row2: Data[2]?.otherReceivables,
          row3: Data[3]?.otherReceivables,
          row4: Data[4]?.otherReceivables,
          row5: Data[5]?.otherReceivables,
          row6: Data[6]?.otherReceivables,
          row7: Data[7]?.otherReceivables,
          row8: Data[8]?.otherReceivables,
          row9: Data[9]?.otherReceivables,
          row10: Data[10]?.otherReceivables,
        },
        {
          id: 19,
          title: "Net Receivables",
          ttm: Data[0]?.netReceivables,
          row1: Data[1]?.netReceivables,
          row2: Data[2]?.netReceivables,
          row3: Data[3]?.netReceivables,
          row4: Data[4]?.netReceivables,
          row5: Data[5]?.netReceivables,
          row6: Data[6]?.netReceivables,
          row7: Data[7]?.netReceivables,
          row8: Data[8]?.netReceivables,
          row9: Data[9]?.netReceivables,
          row10: Data[10]?.netReceivables,
        },
        {
          id: 15,
          title: "Inventories",
          ttm: Data[0]?.inventory,
          row1: Data[1]?.inventory,
          row2: Data[2]?.inventory,
          row3: Data[3]?.inventory,
          row4: Data[4]?.inventory,
          row5: Data[5]?.inventory,
          row6: Data[6]?.inventory,
          row7: Data[7]?.inventory,
          row8: Data[8]?.inventory,
          row9: Data[9]?.inventory,
          row10: Data[10]?.inventory,
        },
        {
          id: 21,
          title: "Other Current Assets",
          ttm: Data[0]?.otherCurrentAssets,
          row1: Data[1]?.otherCurrentAssets,
          row2: Data[2]?.otherCurrentAssets,
          row3: Data[3]?.otherCurrentAssets,
          row4: Data[4]?.otherCurrentAssets,
          row5: Data[5]?.otherCurrentAssets,
          row6: Data[6]?.otherCurrentAssets,
          row7: Data[7]?.otherCurrentAssets,
          row8: Data[8]?.otherCurrentAssets,
          row9: Data[9]?.otherCurrentAssets,
          row10: Data[10]?.otherCurrentAssets,
        },
        {
          id: 37,
          title: "Total Current Assets",
          ttm: Data[0]?.totalCurrentAssets,
          row1: Data[1]?.totalCurrentAssets,
          row2: Data[2]?.totalCurrentAssets,
          row3: Data[3]?.totalCurrentAssets,
          row4: Data[4]?.totalCurrentAssets,
          row5: Data[5]?.totalCurrentAssets,
          row6: Data[6]?.totalCurrentAssets,
          row7: Data[7]?.totalCurrentAssets,
          row8: Data[8]?.totalCurrentAssets,
          row9: Data[9]?.totalCurrentAssets,
          row10: Data[10]?.totalCurrentAssets,
        },
        {
          id: 16,
          title: "Long Term Investments",
          ttm: Data[0]?.longTermInvestments,
          row1: Data[1]?.longTermInvestments,
          row2: Data[2]?.longTermInvestments,
          row3: Data[3]?.longTermInvestments,
          row4: Data[4]?.longTermInvestments,
          row5: Data[5]?.longTermInvestments,
          row6: Data[6]?.longTermInvestments,
          row7: Data[7]?.longTermInvestments,
          row8: Data[8]?.longTermInvestments,
          row9: Data[9]?.longTermInvestments,
          row10: Data[10]?.longTermInvestments,
        },
        {
          id: 30,
          title: "Property Plant Equipment Net",
          ttm: Data[0]?.propertyPlantEquipmentNet,
          row1: Data[1]?.propertyPlantEquipmentNet,
          row2: Data[2]?.propertyPlantEquipmentNet,
          row3: Data[3]?.propertyPlantEquipmentNet,
          row4: Data[4]?.propertyPlantEquipmentNet,
          row5: Data[5]?.propertyPlantEquipmentNet,
          row6: Data[6]?.propertyPlantEquipmentNet,
          row7: Data[7]?.propertyPlantEquipmentNet,
          row8: Data[8]?.propertyPlantEquipmentNet,
          row9: Data[9]?.propertyPlantEquipmentNet,
          row10: Data[10]?.propertyPlantEquipmentNet,
        },
        {
          id: 12,
          title: "Goodwill",
          ttm: Data[0]?.goodwill,
          row1: Data[1]?.goodwill,
          row2: Data[2]?.goodwill,
          row3: Data[3]?.goodwill,
          row4: Data[4]?.goodwill,
          row5: Data[5]?.goodwill,
          row6: Data[6]?.goodwill,
          row7: Data[7]?.goodwill,
          row8: Data[8]?.goodwill,
          row9: Data[9]?.goodwill,
          row10: Data[10]?.goodwill,
        },
        {
          id: 13,
          title: "Goodwill & Intangible Assets",
          ttm: Data[0]?.goodwillAndIntangibleAssets,
          row1: Data[1]?.goodwillAndIntangibleAssets,
          row2: Data[2]?.goodwillAndIntangibleAssets,
          row3: Data[3]?.goodwillAndIntangibleAssets,
          row4: Data[4]?.goodwillAndIntangibleAssets,
          row5: Data[5]?.goodwillAndIntangibleAssets,
          row6: Data[6]?.goodwillAndIntangibleAssets,
          row7: Data[7]?.goodwillAndIntangibleAssets,
          row8: Data[8]?.goodwillAndIntangibleAssets,
          row9: Data[9]?.goodwillAndIntangibleAssets,
          row10: Data[10]?.goodwillAndIntangibleAssets,
        },
        {
          id: 34,
          title: "Tax Assets",
          ttm: Data[0]?.taxAssets,
          row1: Data[1]?.taxAssets,
          row2: Data[2]?.taxAssets,
          row3: Data[3]?.taxAssets,
          row4: Data[4]?.taxAssets,
          row5: Data[5]?.taxAssets,
          row6: Data[6]?.taxAssets,
          row7: Data[7]?.taxAssets,
          row8: Data[8]?.taxAssets,
          row9: Data[9]?.taxAssets,
          row10: Data[10]?.taxAssets,
        },
        {
          id: 294,
          title: "Other Non Current Assets",
          ttm: Data[0]?.otherNonCurrentAssets,
          row1: Data[1]?.otherNonCurrentAssets,
          row2: Data[2]?.otherNonCurrentAssets,
          row3: Data[3]?.otherNonCurrentAssets,
          row4: Data[4]?.otherNonCurrentAssets,
          row5: Data[5]?.otherNonCurrentAssets,
          row6: Data[6]?.otherNonCurrentAssets,
          row7: Data[7]?.otherNonCurrentAssets,
          row8: Data[8]?.otherNonCurrentAssets,
          row9: Data[9]?.otherNonCurrentAssets,
          row10: Data[10]?.otherNonCurrentAssets,
        },
        {
          id: 42,
          title: "Total Non Current Assets",
          ttm: Data[0]?.totalNonCurrentAssets,
          row1: Data[1]?.totalNonCurrentAssets,
          row2: Data[2]?.totalNonCurrentAssets,
          row3: Data[3]?.totalNonCurrentAssets,
          row4: Data[4]?.totalNonCurrentAssets,
          row5: Data[5]?.totalNonCurrentAssets,
          row6: Data[6]?.totalNonCurrentAssets,
          row7: Data[7]?.totalNonCurrentAssets,
          row8: Data[8]?.totalNonCurrentAssets,
          row9: Data[9]?.totalNonCurrentAssets,
          row10: Data[10]?.totalNonCurrentAssets,
        },
        {
          id: 36,
          title: "Total Assets",
          ttm: Data[0]?.totalAssets,
          row1: Data[1]?.totalAssets,
          row2: Data[2]?.totalAssets,
          row3: Data[3]?.totalAssets,
          row4: Data[4]?.totalAssets,
          row5: Data[5]?.totalAssets,
          row6: Data[6]?.totalAssets,
          row7: Data[7]?.totalAssets,
          row8: Data[8]?.totalAssets,
          row9: Data[9]?.totalAssets,
          row10: Data[10]?.totalAssets,
        },

        {
          id: 100,
          title: "",
          ttm: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
          row6: "",
          row7: "",
          row8: "",
          row9: "",
          row10: "",
        },
      ];
    }
    if (type == "LIABLE") {
      dataSources = [
        {
          id: 1,
          title: "Account Payables",
          ttm: Data[0]?.accountPayables,
          row1: Data[1]?.accountPayables,
          row2: Data[2]?.accountPayables,
          row3: Data[3]?.accountPayables,
          row4: Data[4]?.accountPayables,
          row5: Data[5]?.accountPayables,
          row6: Data[6]?.accountPayables,
          row7: Data[7]?.accountPayables,
          row8: Data[8]?.accountPayables,
          row9: Data[9]?.accountPayables,
          row10: Data[10]?.accountPayables,
        },
        {
          id: 3,
          title: "Accrued Expenses",
          ttm: Data[0]?.accruedExpenses,
          row1: Data[1]?.accruedExpenses,
          row2: Data[2]?.accruedExpenses,
          row3: Data[3]?.accruedExpenses,
          row4: Data[4]?.accruedExpenses,
          row5: Data[5]?.accruedExpenses,
          row6: Data[6]?.accruedExpenses,
          row7: Data[7]?.accruedExpenses,
          row8: Data[8]?.accruedExpenses,
          row9: Data[9]?.accruedExpenses,
          row10: Data[10]?.accruedExpenses,
        },
        {
          id: 22,
          title: "Other Current Liabilities",
          ttm: Data[0]?.otherCurrentLiabilities,
          row1: Data[1]?.otherCurrentLiabilities,
          row2: Data[2]?.otherCurrentLiabilities,
          row3: Data[3]?.otherCurrentLiabilities,
          row4: Data[4]?.otherCurrentLiabilities,
          row5: Data[5]?.otherCurrentLiabilities,
          row6: Data[6]?.otherCurrentLiabilities,
          row7: Data[7]?.otherCurrentLiabilities,
          row8: Data[8]?.otherCurrentLiabilities,
          row9: Data[9]?.otherCurrentLiabilities,
          row10: Data[10]?.otherCurrentLiabilities,
        },
        {
          id: 9,
          title: "Deferred Revenue",
          ttm: Data[0]?.deferredRevenue,
          row1: Data[1]?.deferredRevenue,
          row2: Data[2]?.deferredRevenue,
          row3: Data[3]?.deferredRevenue,
          row4: Data[4]?.deferredRevenue,
          row5: Data[5]?.deferredRevenue,
          row6: Data[6]?.deferredRevenue,
          row7: Data[7]?.deferredRevenue,
          row8: Data[8]?.deferredRevenue,
          row9: Data[9]?.deferredRevenue,
          row10: Data[10]?.deferredRevenue,
        },
        {
          id: 48,
          title: "Capital Lease Obligations Current",
          ttm: Data[0]?.capitalLeaseObligationsCurrent,
          row1: Data[1]?.capitalLeaseObligationsCurrent,
          row2: Data[2]?.capitalLeaseObligationsCurrent,
          row3: Data[3]?.capitalLeaseObligationsCurrent,
          row4: Data[4]?.capitalLeaseObligationsCurrent,
          row5: Data[5]?.capitalLeaseObligationsCurrent,
          row6: Data[6]?.capitalLeaseObligationsCurrent,
          row7: Data[7]?.capitalLeaseObligationsCurrent,
          row8: Data[8]?.capitalLeaseObligationsCurrent,
          row9: Data[9]?.capitalLeaseObligationsCurrent,
          row10: Data[10]?.capitalLeaseObligationsCurrent,
        },
        {
          id: 26,
          title: "Other Payables",
          ttm: Data[0]?.otherPayables,
          row1: Data[1]?.otherPayables,
          row2: Data[2]?.otherPayables,
          row3: Data[3]?.otherPayables,
          row4: Data[4]?.otherPayables,
          row5: Data[5]?.otherPayables,
          row6: Data[6]?.otherPayables,
          row7: Data[7]?.otherPayables,
          row8: Data[8]?.otherPayables,
          row9: Data[9]?.otherPayables,
          row10: Data[10]?.otherPayables,
        },
        {
          id: 35,
          title: "Tax Payables",
          ttm: Data[0]?.taxPayables,
          row1: Data[1]?.taxPayables,
          row2: Data[2]?.taxPayables,
          row3: Data[3]?.taxPayables,
          row4: Data[4]?.taxPayables,
          row5: Data[5]?.taxPayables,
          row6: Data[6]?.taxPayables,
          row7: Data[7]?.taxPayables,
          row8: Data[8]?.taxPayables,
          row9: Data[9]?.taxPayables,
          row10: Data[10]?.taxPayables,
        },
        {
          id: 38,
          title: "Total Current Liabilities",
          ttm: Data[0]?.totalCurrentLiabilities,
          row1: Data[1]?.totalCurrentLiabilities,
          row2: Data[2]?.totalCurrentLiabilities,
          row3: Data[3]?.totalCurrentLiabilities,
          row4: Data[4]?.totalCurrentLiabilities,
          row5: Data[5]?.totalCurrentLiabilities,
          row6: Data[6]?.totalCurrentLiabilities,
          row7: Data[7]?.totalCurrentLiabilities,
          row8: Data[8]?.totalCurrentLiabilities,
          row9: Data[9]?.totalCurrentLiabilities,
          row10: Data[10]?.totalCurrentLiabilities,
        },
        {
          id: 47,
          title: "Capital Lease Obligations",
          ttm: Data[0]?.capitalLeaseObligations,
          row1: Data[1]?.capitalLeaseObligations,
          row2: Data[2]?.capitalLeaseObligations,
          row3: Data[3]?.capitalLeaseObligations,
          row4: Data[4]?.capitalLeaseObligations,
          row5: Data[5]?.capitalLeaseObligations,
          row6: Data[6]?.capitalLeaseObligations,
          row7: Data[7]?.capitalLeaseObligations,
          row8: Data[8]?.capitalLeaseObligations,
          row9: Data[9]?.capitalLeaseObligations,
          row10: Data[10]?.capitalLeaseObligations,
        },
        {
          id: 25,
          title: "Other Non Current Liabilities",
          ttm: Data[0]?.otherNonCurrentLiabilities,
          row1: Data[1]?.otherNonCurrentLiabilities,
          row2: Data[2]?.otherNonCurrentLiabilities,
          row3: Data[3]?.otherNonCurrentLiabilities,
          row4: Data[4]?.otherNonCurrentLiabilities,
          row5: Data[5]?.otherNonCurrentLiabilities,
          row6: Data[6]?.otherNonCurrentLiabilities,
          row7: Data[7]?.otherNonCurrentLiabilities,
          row8: Data[8]?.otherNonCurrentLiabilities,
          row9: Data[9]?.otherNonCurrentLiabilities,
          row10: Data[10]?.otherNonCurrentLiabilities,
        },
        {
          id: 23,
          title: "Other Liabilities",
          ttm: Data[0]?.otherLiabilities,
          row1: Data[1]?.otherLiabilities,
          row2: Data[2]?.otherLiabilities,
          row3: Data[3]?.otherLiabilities,
          row4: Data[4]?.otherLiabilities,
          row5: Data[5]?.otherLiabilities,
          row6: Data[6]?.otherLiabilities,
          row7: Data[7]?.otherLiabilities,
          row8: Data[8]?.otherLiabilities,
          row9: Data[9]?.otherLiabilities,
          row10: Data[10]?.otherLiabilities,
        },
        {
          id: 43,
          title: "Total Non Current Liabilities",
          ttm: Data[0]?.totalNonCurrentLiabilities,
          row1: Data[1]?.totalNonCurrentLiabilities,
          row2: Data[2]?.totalNonCurrentLiabilities,
          row3: Data[3]?.totalNonCurrentLiabilities,
          row4: Data[4]?.totalNonCurrentLiabilities,
          row5: Data[5]?.totalNonCurrentLiabilities,
          row6: Data[6]?.totalNonCurrentLiabilities,
          row7: Data[7]?.totalNonCurrentLiabilities,
          row8: Data[8]?.totalNonCurrentLiabilities,
          row9: Data[9]?.totalNonCurrentLiabilities,
          row10: Data[10]?.totalNonCurrentLiabilities,
        },

        {
          id: 100,
          title: "",
          ttm: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
          row6: "",
          row7: "",
          row8: "",
          row9: "",
          row10: "",
        },
      ];
    }
    if (type == "SHARE") {
      dataSources = [
        {
          id: 8,
          title: "Common Stock",
          ttm: Data[0]?.commonStock,
          row1: Data[1]?.commonStock,
          row2: Data[2]?.commonStock,
          row3: Data[3]?.commonStock,
          row4: Data[4]?.commonStock,
          row5: Data[5]?.commonStock,
          row6: Data[6]?.commonStock,
          row7: Data[7]?.commonStock,
          row8: Data[8]?.commonStock,
          row9: Data[9]?.commonStock,
          row10: Data[10]?.commonStock,
        },

        {
          id: 28,
          title: "Preferred Stock",
          ttm: Data[0]?.preferredStock,
          row1: Data[1]?.preferredStock,
          row2: Data[2]?.preferredStock,
          row3: Data[3]?.preferredStock,
          row4: Data[4]?.preferredStock,
          row5: Data[5]?.preferredStock,
          row6: Data[6]?.preferredStock,
          row7: Data[7]?.preferredStock,
          row8: Data[8]?.preferredStock,
          row9: Data[9]?.preferredStock,
          row10: Data[10]?.preferredStock,
        },
        {
          id: 5,
          title: "Additional Paid In Capital",
          ttm: Data[0]?.additionalPaidInCapital,
          row1: Data[1]?.additionalPaidInCapital,
          row2: Data[2]?.additionalPaidInCapital,
          row3: Data[3]?.additionalPaidInCapital,
          row4: Data[4]?.additionalPaidInCapital,
          row5: Data[5]?.additionalPaidInCapital,
          row6: Data[6]?.additionalPaidInCapital,
          row7: Data[7]?.additionalPaidInCapital,
          row8: Data[8]?.additionalPaidInCapital,
          row9: Data[9]?.additionalPaidInCapital,
          row10: Data[10]?.additionalPaidInCapital,
        },
        {
          id: 31,
          title: "Retained Earnings",
          ttm: Data[0]?.retainedEarnings,
          row1: Data[1]?.retainedEarnings,
          row2: Data[2]?.retainedEarnings,
          row3: Data[3]?.retainedEarnings,
          row4: Data[4]?.retainedEarnings,
          row5: Data[5]?.retainedEarnings,
          row6: Data[6]?.retainedEarnings,
          row7: Data[7]?.retainedEarnings,
          row8: Data[8]?.retainedEarnings,
          row9: Data[9]?.retainedEarnings,
          row10: Data[10]?.retainedEarnings,
        },

        {
          id: 4,
          title: "Accumulated Other Comprehensive Income Loss",
          ttm: Data[0]?.accumulatedOtherComprehensiveIncomeLoss,
          row1: Data[1]?.accumulatedOtherComprehensiveIncomeLoss,
          row2: Data[2]?.accumulatedOtherComprehensiveIncomeLoss,
          row3: Data[3]?.accumulatedOtherComprehensiveIncomeLoss,
          row4: Data[4]?.accumulatedOtherComprehensiveIncomeLoss,
          row5: Data[5]?.accumulatedOtherComprehensiveIncomeLoss,
          row6: Data[6]?.accumulatedOtherComprehensiveIncomeLoss,
          row7: Data[7]?.accumulatedOtherComprehensiveIncomeLoss,
          row8: Data[8]?.accumulatedOtherComprehensiveIncomeLoss,
          row9: Data[9]?.accumulatedOtherComprehensiveIncomeLoss,
          row10: Data[10]?.accumulatedOtherComprehensiveIncomeLoss,
        },
        {
          id: 57,
          title: "Other Total Stockholders Equity",
          ttm: Data[0]?.otherTotalStockholdersEquity,
          row1: Data[1]?.otherTotalStockholdersEquity,
          row2: Data[2]?.otherTotalStockholdersEquity,
          row3: Data[3]?.otherTotalStockholdersEquity,
          row4: Data[4]?.otherTotalStockholdersEquity,
          row5: Data[5]?.otherTotalStockholdersEquity,
          row6: Data[6]?.otherTotalStockholdersEquity,
          row7: Data[7]?.otherTotalStockholdersEquity,
          row8: Data[8]?.otherTotalStockholdersEquity,
          row9: Data[9]?.otherTotalStockholdersEquity,
          row10: Data[10]?.otherTotalStockholdersEquity,
        },
        {
          id: 45,
          title: "Total Stockholders Equity",
          ttm: Data[0]?.totalStockholdersEquity,
          row1: Data[1]?.totalStockholdersEquity,
          row2: Data[2]?.totalStockholdersEquity,
          row3: Data[3]?.totalStockholdersEquity,
          row4: Data[4]?.totalStockholdersEquity,
          row5: Data[5]?.totalStockholdersEquity,
          row6: Data[6]?.totalStockholdersEquity,
          row7: Data[7]?.totalStockholdersEquity,
          row8: Data[8]?.totalStockholdersEquity,
          row9: Data[9]?.totalStockholdersEquity,
          row10: Data[10]?.totalStockholdersEquity,
        },
        {
          id: 51,
          title: "Total Equity",
          ttm: Data[0]?.totalEquity,
          row1: Data[1]?.totalEquity,
          row2: Data[2]?.totalEquity,
          row3: Data[3]?.totalEquity,
          row4: Data[4]?.totalEquity,
          row5: Data[5]?.totalEquity,
          row6: Data[6]?.totalEquity,
          row7: Data[7]?.totalEquity,
          row8: Data[8]?.totalEquity,
          row9: Data[9]?.totalEquity,
          row10: Data[10]?.totalEquity,
        },
        {
          id: 100,
          title: "",
          ttm: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
          row6: "",
          row7: "",
          row8: "",
          row9: "",
          row10: "",
        },
      ];
    }
    if (type == "ADDITIONALBALSHEET") {
      dataSources = [
        {
          id: 44,
          title: "Total Payables",
          ttm: Data[0]?.totalPayables,
          row1: Data[1]?.totalPayables,
          row2: Data[2]?.totalPayables,
          row3: Data[3]?.totalPayables,
          row4: Data[4]?.totalPayables,
          row5: Data[5]?.totalPayables,
          row6: Data[6]?.totalPayables,
          row7: Data[7]?.totalPayables,
          row8: Data[8]?.totalPayables,
          row9: Data[9]?.totalPayables,
          row10: Data[10]?.totalPayables,
        },
        {
          id: 50,
          title: "Total Debt",
          ttm: Data[0]?.totalDebt,
          row1: Data[1]?.totalDebt,
          row2: Data[2]?.totalDebt,
          row3: Data[3]?.totalDebt,
          row4: Data[4]?.totalDebt,
          row5: Data[5]?.totalDebt,
          row6: Data[6]?.totalDebt,
          row7: Data[7]?.totalDebt,
          row8: Data[8]?.totalDebt,
          row9: Data[9]?.totalDebt,
          row10: Data[10]?.totalDebt,
        },
        {
          id: 18,
          title: "Net Debt",
          ttm: Data[0]?.netDebt,
          row1: Data[1]?.netDebt,
          row2: Data[2]?.netDebt,
          row3: Data[3]?.netDebt,
          row4: Data[4]?.netDebt,
          row5: Data[5]?.netDebt,
          row6: Data[6]?.netDebt,
          row7: Data[7]?.netDebt,
          row8: Data[8]?.netDebt,
          row9: Data[9]?.netDebt,
          row10: Data[10]?.netDebt,
        },

        {
          id: 40,
          title: "Total Liabilities",
          ttm: Data[0]?.totalLiabilities,
          row1: Data[1]?.totalLiabilities,
          row2: Data[2]?.totalLiabilities,
          row3: Data[3]?.totalLiabilities,
          row4: Data[4]?.totalLiabilities,
          row5: Data[5]?.totalLiabilities,
          row6: Data[6]?.totalLiabilities,
          row7: Data[7]?.totalLiabilities,
          row8: Data[8]?.totalLiabilities,
          row9: Data[9]?.totalLiabilities,
          row10: Data[10]?.totalLiabilities,
        },

        {
          id: 41,
          title: "Total Liabilities And Total Equity",
          ttm: Data[0]?.totalLiabilitiesAndTotalEquity,
          row1: Data[1]?.totalLiabilitiesAndTotalEquity,
          row2: Data[2]?.totalLiabilitiesAndTotalEquity,
          row3: Data[3]?.totalLiabilitiesAndTotalEquity,
          row4: Data[4]?.totalLiabilitiesAndTotalEquity,
          row5: Data[5]?.totalLiabilitiesAndTotalEquity,
          row6: Data[6]?.totalLiabilitiesAndTotalEquity,
          row7: Data[7]?.totalLiabilitiesAndTotalEquity,
          row8: Data[8]?.totalLiabilitiesAndTotalEquity,
          row9: Data[9]?.totalLiabilitiesAndTotalEquity,
          row10: Data[10]?.totalLiabilitiesAndTotalEquity,
        },
        {
          id: 1200,
          title: "",
          ttm: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
          row6: "",
          row7: "",
          row8: "",
          row9: "",
          row10: "",
        },
      ];
    }
  } else if (filter == "cashflow") {
    if (type == "CASH") {
      dataSources = [
        {
          id: 2437,
          title: "Net Income",
          ttm: Data[0]?.netIncome,
          row1: Data[1]?.netIncome,
          row2: Data[2]?.netIncome,
          row3: Data[3]?.netIncome,
          row4: Data[4]?.netIncome,
          row5: Data[5]?.netIncome,
          row6: Data[6]?.netIncome,
          row7: Data[7]?.netIncome,
          row8: Data[8]?.netIncome,
          row9: Data[9]?.netIncome,
          row10: Data[10]?.netIncome,
        },
        {
          id: 12,
          title: "Depreciation And Amortization",
          ttm: Data[0]?.depreciationAndAmortization,
          row1: Data[1]?.depreciationAndAmortization,
          row2: Data[2]?.depreciationAndAmortization,
          row3: Data[3]?.depreciationAndAmortization,
          row4: Data[4]?.depreciationAndAmortization,
          row5: Data[5]?.depreciationAndAmortization,
          row6: Data[6]?.depreciationAndAmortization,
          row7: Data[7]?.depreciationAndAmortization,
          row8: Data[8]?.depreciationAndAmortization,
          row9: Data[9]?.depreciationAndAmortization,
          row10: Data[10]?.depreciationAndAmortization,
        },
        {
          id: 11,
          title: "Deferred Income Tax",
          ttm: Data[0]?.deferredIncomeTax,
          row1: Data[1]?.deferredIncomeTax,
          row2: Data[2]?.deferredIncomeTax,
          row3: Data[3]?.deferredIncomeTax,
          row4: Data[4]?.deferredIncomeTax,
          row5: Data[5]?.deferredIncomeTax,
          row6: Data[6]?.deferredIncomeTax,
          row7: Data[7]?.deferredIncomeTax,
          row8: Data[8]?.deferredIncomeTax,
          row9: Data[9]?.deferredIncomeTax,
          row10: Data[10]?.deferredIncomeTax,
        },
        {
          id: 39,
          title: "Stock Based Compensation",
          ttm: Data[0]?.stockBasedCompensation,
          row1: Data[1]?.stockBasedCompensation,
          row2: Data[2]?.stockBasedCompensation,
          row3: Data[3]?.stockBasedCompensation,
          row4: Data[4]?.stockBasedCompensation,
          row5: Data[5]?.stockBasedCompensation,
          row6: Data[6]?.stockBasedCompensation,
          row7: Data[7]?.stockBasedCompensation,
          row8: Data[8]?.stockBasedCompensation,
          row9: Data[9]?.stockBasedCompensation,
          row10: Data[10]?.stockBasedCompensation,
        },
        {
          id: 33,
          title: "Other Non Cash Items",
          ttm: Data[0]?.otherNonCashItems,
          row1: Data[1]?.otherNonCashItems,
          row2: Data[2]?.otherNonCashItems,
          row3: Data[3]?.otherNonCashItems,
          row4: Data[4]?.otherNonCashItems,
          row5: Data[5]?.otherNonCashItems,
          row6: Data[6]?.otherNonCashItems,
          row7: Data[7]?.otherNonCashItems,
          row8: Data[8]?.otherNonCashItems,
          row9: Data[9]?.otherNonCashItems,
          row10: Data[10]?.otherNonCashItems,
        },
        {
          id: 2,
          title: "Accounts Receivables",
          ttm: Data[0]?.accountsReceivables,
          row1: Data[1]?.accountsReceivables,
          row2: Data[2]?.accountsReceivables,
          row3: Data[3]?.accountsReceivables,
          row4: Data[4]?.accountsReceivables,
          row5: Data[5]?.accountsReceivables,
          row6: Data[6]?.accountsReceivables,
          row7: Data[7]?.accountsReceivables,
          row8: Data[8]?.accountsReceivables,
          row9: Data[9]?.accountsReceivables,
          row10: Data[10]?.accountsReceivables,
        },
        {
          id: 16,
          title: "Inventory",
          ttm: Data[0]?.inventory,
          row1: Data[1]?.inventory,
          row2: Data[2]?.inventory,
          row3: Data[3]?.inventory,
          row4: Data[4]?.inventory,
          row5: Data[5]?.inventory,
          row6: Data[6]?.inventory,
          row7: Data[7]?.inventory,
          row8: Data[8]?.inventory,
          row9: Data[9]?.inventory,
          row10: Data[10]?.inventory,
        },
        {
          id: 34,
          title: "Other Working Capital",
          ttm: Data[0]?.otherWorkingCapital,
          row1: Data[1]?.otherWorkingCapital,
          row2: Data[2]?.otherWorkingCapital,
          row3: Data[3]?.otherWorkingCapital,
          row4: Data[4]?.otherWorkingCapital,
          row5: Data[5]?.otherWorkingCapital,
          row6: Data[6]?.otherWorkingCapital,
          row7: Data[7]?.otherWorkingCapital,
          row8: Data[8]?.otherWorkingCapital,
          row9: Data[9]?.otherWorkingCapital,
          row10: Data[10]?.otherWorkingCapital,
        },
        {
          id: 6,
          title: "Change In Working Capital",
          ttm: Data[0]?.changeInWorkingCapital,
          row1: Data[1]?.changeInWorkingCapital,
          row2: Data[2]?.changeInWorkingCapital,
          row3: Data[3]?.changeInWorkingCapital,
          row4: Data[4]?.changeInWorkingCapital,
          row5: Data[5]?.changeInWorkingCapital,
          row6: Data[6]?.changeInWorkingCapital,
          row7: Data[7]?.changeInWorkingCapital,
          row8: Data[8]?.changeInWorkingCapital,
          row9: Data[9]?.changeInWorkingCapital,
          row10: Data[10]?.changeInWorkingCapital,
        },
        {
          id: 92,
          title: "Cash from Operations",
          ttm: Data[0]?.netCashProvidedByOperatingActivities,
          row1: Data[1]?.netCashProvidedByOperatingActivities,
          row2: Data[2]?.netCashProvidedByOperatingActivities,
          row3: Data[3]?.netCashProvidedByOperatingActivities,
          row4: Data[4]?.netCashProvidedByOperatingActivities,
          row5: Data[5]?.netCashProvidedByOperatingActivities,
          row6: Data[6]?.netCashProvidedByOperatingActivities,
          row7: Data[7]?.netCashProvidedByOperatingActivities,
          row8: Data[8]?.netCashProvidedByOperatingActivities,
          row9: Data[9]?.netCashProvidedByOperatingActivities,
          row10: Data[10]?.netCashProvidedByOperatingActivities,
        },
        {
          id: 100,
          title: "",
          ttm: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
          row6: "",
          row7: "",
          row8: "",
          row9: "",
          row10: "",
        },
      ];
    }
    if (type == "Investing") {
      dataSources = [
        {
          id: 10,
          title: "Capital Expenditure",
          ttm: Data[0]?.capitalExpenditure,
          row1: Data[1]?.capitalExpenditure,
          row2: Data[2]?.capitalExpenditure,
          row3: Data[3]?.capitalExpenditure,
          row4: Data[4]?.capitalExpenditure,
          row5: Data[5]?.capitalExpenditure,
          row6: Data[6]?.capitalExpenditure,
          row7: Data[7]?.capitalExpenditure,
          row8: Data[8]?.capitalExpenditure,
          row9: Data[9]?.capitalExpenditure,
          row10: Data[10]?.capitalExpenditure,
        },
        {
          id: 14,
          title: "Free Cash Flow",
          ttm: Data[0]?.freeCashFlow,
          row1: Data[1]?.freeCashFlow,
          row2: Data[2]?.freeCashFlow,
          row3: Data[3]?.freeCashFlow,
          row4: Data[4]?.freeCashFlow,
          row5: Data[5]?.freeCashFlow,
          row6: Data[6]?.freeCashFlow,
          row7: Data[7]?.freeCashFlow,
          row8: Data[8]?.freeCashFlow,
          row9: Data[9]?.freeCashFlow,
          row10: Data[10]?.freeCashFlow,
        },
        {
          id: 3,
          title: "Acquisitions Net",
          ttm: Data[0]?.acquisitionsNet,
          row1: Data[1]?.acquisitionsNet,
          row2: Data[2]?.acquisitionsNet,
          row3: Data[3]?.acquisitionsNet,
          row4: Data[4]?.acquisitionsNet,
          row5: Data[5]?.acquisitionsNet,
          row6: Data[6]?.acquisitionsNet,
          row7: Data[7]?.acquisitionsNet,
          row8: Data[8]?.acquisitionsNet,
          row9: Data[9]?.acquisitionsNet,
          row10: Data[10]?.acquisitionsNet,
        },

        {
          id: 32,
          title: "Other Investing Activities",
          ttm: Data[0]?.otherInvestingActivities,
          row1: Data[1]?.otherInvestingActivities,
          row2: Data[2]?.otherInvestingActivities,
          row3: Data[3]?.otherInvestingActivities,
          row4: Data[4]?.otherInvestingActivities,
          row5: Data[5]?.otherInvestingActivities,
          row6: Data[6]?.otherInvestingActivities,
          row7: Data[7]?.otherInvestingActivities,
          row8: Data[8]?.otherInvestingActivities,
          row9: Data[9]?.otherInvestingActivities,
          row10: Data[10]?.otherInvestingActivities,
        },
        {
          id: 93,
          title: "Cash from Investing",
          ttm: Data[0]?.netCashProvidedByInvestingActivities,
          row1: Data[1]?.netCashProvidedByInvestingActivities,
          row2: Data[2]?.netCashProvidedByInvestingActivities,
          row3: Data[3]?.netCashProvidedByInvestingActivities,
          row4: Data[4]?.netCashProvidedByInvestingActivities,
          row5: Data[5]?.netCashProvidedByInvestingActivities,
          row6: Data[6]?.netCashProvidedByInvestingActivities,
          row7: Data[7]?.netCashProvidedByInvestingActivities,
          row8: Data[8]?.netCashProvidedByInvestingActivities,
          row9: Data[9]?.netCashProvidedByInvestingActivities,
          row10: Data[10]?.netCashProvidedByInvestingActivities,
        },
        {
          id: 21,
          title: "Net Cash Provided By Investing Activities",
          ttm: Data[0]?.netCashProvidedByInvestingActivities,
          row1: Data[1]?.netCashProvidedByInvestingActivities,
          row2: Data[2]?.netCashProvidedByInvestingActivities,
          row3: Data[3]?.netCashProvidedByInvestingActivities,
          row4: Data[4]?.netCashProvidedByInvestingActivities,
          row5: Data[5]?.netCashProvidedByInvestingActivities,
          row6: Data[6]?.netCashProvidedByInvestingActivities,
          row7: Data[7]?.netCashProvidedByInvestingActivities,
          row8: Data[8]?.netCashProvidedByInvestingActivities,
          row9: Data[9]?.netCashProvidedByInvestingActivities,
          row10: Data[10]?.netCashProvidedByInvestingActivities,
        },

        {
          id: 100,
          title: "",
          ttm: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
          row6: "",
          row7: "",
          row8: "",
          row9: "",
          row10: "",
        },
      ];
    }
    if (type == "Financing") {
      dataSources = [
        {
          id: 19,
          title: "Long Term Net Debt Issuance",
          ttm: Data[0]?.longTermNetDebtIssuance,
          row1: Data[1]?.longTermNetDebtIssuance,
          row2: Data[2]?.longTermNetDebtIssuance,
          row3: Data[3]?.longTermNetDebtIssuance,
          row4: Data[4]?.longTermNetDebtIssuance,
          row5: Data[5]?.longTermNetDebtIssuance,
          row6: Data[6]?.longTermNetDebtIssuance,
          row7: Data[7]?.longTermNetDebtIssuance,
          row8: Data[8]?.longTermNetDebtIssuance,
          row9: Data[9]?.longTermNetDebtIssuance,
          row10: Data[10]?.longTermNetDebtIssuance,
        },
        {
          id: 38,
          title: "Short Term Net Debt Issuance",
          ttm: Data[0]?.shortTermNetDebtIssuance,
          row1: Data[1]?.shortTermNetDebtIssuance,
          row2: Data[2]?.shortTermNetDebtIssuance,
          row3: Data[3]?.shortTermNetDebtIssuance,
          row4: Data[4]?.shortTermNetDebtIssuance,
          row5: Data[5]?.shortTermNetDebtIssuance,
          row6: Data[6]?.shortTermNetDebtIssuance,
          row7: Data[7]?.shortTermNetDebtIssuance,
          row8: Data[8]?.shortTermNetDebtIssuance,
          row9: Data[9]?.shortTermNetDebtIssuance,
          row10: Data[10]?.shortTermNetDebtIssuance,
        },
        {
          id: 25,
          title: "Net Debt Issuance",
          ttm: Data[0]?.netDebtIssuance,
          row1: Data[1]?.netDebtIssuance,
          row2: Data[2]?.netDebtIssuance,
          row3: Data[3]?.netDebtIssuance,
          row4: Data[4]?.netDebtIssuance,
          row5: Data[5]?.netDebtIssuance,
          row6: Data[6]?.netDebtIssuance,
          row7: Data[7]?.netDebtIssuance,
          row8: Data[8]?.netDebtIssuance,
          row9: Data[9]?.netDebtIssuance,
          row10: Data[10]?.netDebtIssuance,
        },
        {
          id: 8,
          title: "Common Stock Issuance",
          ttm: Data[0]?.commonStockIssuance,
          row1: Data[1]?.commonStockIssuance,
          row2: Data[2]?.commonStockIssuance,
          row3: Data[3]?.commonStockIssuance,
          row4: Data[4]?.commonStockIssuance,
          row5: Data[5]?.commonStockIssuance,
          row6: Data[6]?.commonStockIssuance,
          row7: Data[7]?.commonStockIssuance,
          row8: Data[8]?.commonStockIssuance,
          row9: Data[9]?.commonStockIssuance,
          row10: Data[10]?.commonStockIssuance,
        },
        {
          id: 9,
          title: "Common Stock Repurchased",
          ttm: Data[0]?.commonStockRepurchased,
          row1: Data[1]?.commonStockRepurchased,
          row2: Data[2]?.commonStockRepurchased,
          row3: Data[3]?.commonStockRepurchased,
          row4: Data[4]?.commonStockRepurchased,
          row5: Data[5]?.commonStockRepurchased,
          row6: Data[6]?.commonStockRepurchased,
          row7: Data[7]?.commonStockRepurchased,
          row8: Data[8]?.commonStockRepurchased,
          row9: Data[9]?.commonStockRepurchased,
          row10: Data[10]?.commonStockRepurchased,
        },
        {
          id: 1224,
          title: "Net Common Stock Issuance",
          ttm: Data[0]?.netCommonStockIssuance,
          row1: Data[1]?.netCommonStockIssuance,
          row2: Data[2]?.netCommonStockIssuance,
          row3: Data[3]?.netCommonStockIssuance,
          row4: Data[4]?.netCommonStockIssuance,
          row5: Data[5]?.netCommonStockIssuance,
          row6: Data[6]?.netCommonStockIssuance,
          row7: Data[7]?.netCommonStockIssuance,
          row8: Data[8]?.netCommonStockIssuance,
          row9: Data[9]?.netCommonStockIssuance,
          row10: Data[10]?.netCommonStockIssuance,
        },
        {
          id: 7,
          title: "Common Dividends Paid",
          ttm: Data[0]?.commonDividendsPaid,
          row1: Data[1]?.commonDividendsPaid,
          row2: Data[2]?.commonDividendsPaid,
          row3: Data[3]?.commonDividendsPaid,
          row4: Data[4]?.commonDividendsPaid,
          row5: Data[5]?.commonDividendsPaid,
          row6: Data[6]?.commonDividendsPaid,
          row7: Data[7]?.commonDividendsPaid,
          row8: Data[8]?.commonDividendsPaid,
          row9: Data[9]?.commonDividendsPaid,
          row10: Data[10]?.commonDividendsPaid,
        },
        {
          id: 31,
          title: "Other Financing Activities",
          ttm: Data[0]?.otherFinancingActivities,
          row1: Data[1]?.otherFinancingActivities,
          row2: Data[2]?.otherFinancingActivities,
          row3: Data[3]?.otherFinancingActivities,
          row4: Data[4]?.otherFinancingActivities,
          row5: Data[5]?.otherFinancingActivities,
          row6: Data[6]?.otherFinancingActivities,
          row7: Data[7]?.otherFinancingActivities,
          row8: Data[8]?.otherFinancingActivities,
          row9: Data[9]?.otherFinancingActivities,
          row10: Data[10]?.otherFinancingActivities,
        },
        {
          id: 20,
          title: "Cash from Financing",
          ttm: Data[0]?.netCashProvidedByFinancingActivities,
          row1: Data[1]?.netCashProvidedByFinancingActivities,
          row2: Data[2]?.netCashProvidedByFinancingActivities,
          row3: Data[3]?.netCashProvidedByFinancingActivities,
          row4: Data[4]?.netCashProvidedByFinancingActivities,
          row5: Data[5]?.netCashProvidedByFinancingActivities,
          row6: Data[6]?.netCashProvidedByFinancingActivities,
          row7: Data[7]?.netCashProvidedByFinancingActivities,
          row8: Data[8]?.netCashProvidedByFinancingActivities,
          row9: Data[9]?.netCashProvidedByFinancingActivities,
          row10: Data[10]?.netCashProvidedByFinancingActivities,
        },
        {
          id: 100,
          title: "",
          ttm: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
          row6: "",
          row7: "",
          row8: "",
          row9: "",
          row10: "",
        },
      ];
    }
    if (type == "cashbeginning") {
      dataSources = [
        {
          id: 4,
          title: "Cash At Beginning Of Period",
          ttm: Data[0]?.cashAtBeginningOfPeriod,
          row1: Data[1]?.cashAtBeginningOfPeriod,
          row2: Data[2]?.cashAtBeginningOfPeriod,
          row3: Data[3]?.cashAtBeginningOfPeriod,
          row4: Data[4]?.cashAtBeginningOfPeriod,
          row5: Data[5]?.cashAtBeginningOfPeriod,
          row6: Data[6]?.cashAtBeginningOfPeriod,
          row7: Data[7]?.cashAtBeginningOfPeriod,
          row8: Data[8]?.cashAtBeginningOfPeriod,
          row9: Data[9]?.cashAtBeginningOfPeriod,
          row10: Data[10]?.cashAtBeginningOfPeriod,
        },
        {
          id: 23,
          title: "Net Change In Cash",
          ttm: Data[0]?.netChangeInCash,
          row1: Data[1]?.netChangeInCash,
          row2: Data[2]?.netChangeInCash,
          row3: Data[3]?.netChangeInCash,
          row4: Data[4]?.netChangeInCash,
          row5: Data[5]?.netChangeInCash,
          row6: Data[6]?.netChangeInCash,
          row7: Data[7]?.netChangeInCash,
          row8: Data[8]?.netChangeInCash,
          row9: Data[9]?.netChangeInCash,
          row10: Data[10]?.netChangeInCash,
        },
        {
          id: 5,
          title: "Cash At End Of Period",
          ttm: Data[0]?.cashAtEndOfPeriod,
          row1: Data[1]?.cashAtEndOfPeriod,
          row2: Data[2]?.cashAtEndOfPeriod,
          row3: Data[3]?.cashAtEndOfPeriod,
          row4: Data[4]?.cashAtEndOfPeriod,
          row5: Data[5]?.cashAtEndOfPeriod,
          row6: Data[6]?.cashAtEndOfPeriod,
          row7: Data[7]?.cashAtEndOfPeriod,
          row8: Data[8]?.cashAtEndOfPeriod,
          row9: Data[9]?.cashAtEndOfPeriod,
          row10: Data[10]?.cashAtEndOfPeriod,
        },
        {
          id: 100,
          title: "",
          ttm: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
          row6: "",
          row7: "",
          row8: "",
          row9: "",
          row10: "",
        },
      ];
    }
    if (type == "Items") {
      dataSources = [
        {
          id: 42,
          title: "Capital Expenditure",
          ttm: Data[0]?.capitalExpenditure,
          row1: Data[1]?.capitalExpenditure,
          row2: Data[2]?.capitalExpenditure,
          row3: Data[3]?.capitalExpenditure,
          row4: Data[4]?.capitalExpenditure,
          row5: Data[5]?.capitalExpenditure,
          row6: Data[6]?.capitalExpenditure,
          row7: Data[7]?.capitalExpenditure,
          row8: Data[8]?.capitalExpenditure,
          row9: Data[9]?.capitalExpenditure,
          row10: Data[10]?.capitalExpenditure,
        },
        {
          id: 29,
          title: "Net Stock Issuance",
          ttm: Data[0]?.netStockIssuance,
          row1: Data[1]?.netStockIssuance,
          row2: Data[2]?.netStockIssuance,
          row3: Data[3]?.netStockIssuance,
          row4: Data[4]?.netStockIssuance,
          row5: Data[5]?.netStockIssuance,
          row6: Data[6]?.netStockIssuance,
          row7: Data[7]?.netStockIssuance,
          row8: Data[8]?.netStockIssuance,
          row9: Data[9]?.netStockIssuance,
          row10: Data[10]?.netStockIssuance,
        },
        {
          id: 28,
          title: "Net Preferred StockIssuance",
          ttm: Data[0]?.netPreferredStockIssuance,
          row1: Data[1]?.netPreferredStockIssuance,
          row2: Data[2]?.netPreferredStockIssuance,
          row3: Data[3]?.netPreferredStockIssuance,
          row4: Data[4]?.netPreferredStockIssuance,
          row5: Data[5]?.netPreferredStockIssuance,
          row6: Data[6]?.netPreferredStockIssuance,
          row7: Data[7]?.netPreferredStockIssuance,
          row8: Data[8]?.netPreferredStockIssuance,
          row9: Data[9]?.netPreferredStockIssuance,
          row10: Data[10]?.netPreferredStockIssuance,
        },
        {
          id: 100,
          title: "",
          ttm: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
          row6: "",
          row7: "",
          row8: "",
          row9: "",
          row10: "",
        },
      ];
    }
  }
  return dataSources;
};

export const DataSourceAnalyzer = (Data: any) => {
  const dataSources = [
    {
      id: 1,
      year1: Data?.roic?.first,
      year10: Data?.roic?.ten,
      year5: Data?.roic?.fifth,
      feature: "ROIC",
      category: "roic",
      showPercent: true,
    },
    {
      id: 2,
      year1: Data?.revGrowth?.first,
      year10: Data?.revGrowth?.ten,
      year5: Data?.revGrowth?.fifth,
      feature: "Rev. Growth %",
      category: "revGrowth",
      showPercent: true,
    },
    {
      id: 3,
      year1: Data?.profitMargin?.first,
      year10: Data?.profitMargin?.ten,
      year5: Data?.profitMargin?.fifth,
      feature: "Profit Margin",
      category: "profitMargin",
      showPercent: true,
    },
    {
      id: 4,
      year1: Data?.freeCashFlowMargin?.first,
      year10: Data?.freeCashFlowMargin?.ten,
      year5: Data?.freeCashFlowMargin?.fifth,
      feature: "Free Cash Flow Margin",
      category: "freeCashFlowMargin",
      showPercent: true,
    },
    {
      id: 5,
      year1: Data?.peRatio?.first,
      year10: Data?.peRatio?.ten,
      year5: Data?.peRatio?.fifth,
      feature: "P/E",
      category: "peRatio",
      showPercent: false,
    },
    {
      id: 6,
      year1: Data?.pfcf?.first,
      year10: Data?.pfcf?.ten,
      year5: Data?.pfcf?.fifth,
      feature: "P/FCF",
      category: "pfcf",
      showPercent: false,
    },
    {
      id: 7,
      year1: 0,
      year10: 0,
      year5: 0,
      feature: "Desired Annual Return",
      category: "desiredAnnReturn",
      showPercent: true,
    },
  ];
  return dataSources;
};
export const DataSourceAnalyzerResult = (Data: any) => {
  const dataSources = [
    {
      feature: "Discounted Earnings Value",
      low: Data?.discountedEarningsValue.low,
      medium: Data?.discountedEarningsValue.mid,
      high: Data?.discountedEarningsValue.high,
      id: 1,
    },
    {
      feature: "Discounted Free Cash Flow Value",
      low: Data?.discountedFreeCashFlowValue.low,
      medium: Data?.discountedFreeCashFlowValue.mid,
      high: Data?.discountedFreeCashFlowValue.high,
      id: 2,
    },
  ];
  return dataSources;
};
export function formatMoneyNumber(value: string | number): string {
  if (value === "") return "";

  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) return "Invalid";

  const absNum = Math.abs(num);
  const sign = num < 0 ? "-$" : "$";

  if (absNum >= 1_000_000_000_000) {
    return sign + (absNum / 1_000_000_000_000).toFixed(2) + "T";
  } else if (absNum >= 1_000_000_000) {
    return sign + (absNum / 1_000_000_000).toFixed(2) + "B";
  } else if (absNum >= 1_000_000) {
    return sign + (absNum / 1_000_000).toFixed(2) + "M";
  } else if (absNum >= 1_000) {
    return sign + (absNum / 1_000).toFixed(2) + "K";
  } else {
    return sign + absNum.toFixed(2);
  }
}
export function formatMoneyNumberNew(value: string | number): string {
  if (value === "") return "";

  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) return "Invalid";

  const absNum = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  if (absNum >= 1_000_000_000_000) {
    return sign + (absNum / 1_000_000_000_000).toFixed(2) + "T";
  } else if (absNum >= 1_000_000_000) {
    return sign + (absNum / 1_000_000_000).toFixed(2) + "B";
  } else if (absNum >= 1_000_000) {
    return sign + (absNum / 1_000_000).toFixed(2) + "M";
  } else if (absNum >= 1_000) {
    return sign + (absNum / 1_000).toFixed(2) + "K";
  } else {
    return sign + absNum.toFixed(2);
  }
}
export function formatMoneyNumber2(
  value: string | number | null | undefined,
  ommit: boolean = false
): string {
  if (value === null || value === undefined || value === "") return "";

  if (
    value == "Infinity" ||
    value == "-Infinity" ||
    value == "-Infinity%" ||
    value == "Infinity%"
  ) {
    return "N/A";
  }
  const isDateString = (val: string): boolean =>
    !isNaN(Date.parse(val)) && /\d{4}-\d{2}-\d{2}/.test(val);

  if (typeof value === "string") {
    // Handle percentages (e.g., "0.2430126434312604%")
    const isPercentage = value.trim().endsWith("%");
    if (isPercentage) {
      const num = parseFloat(value.replace("%", "").trim());
      if (isNaN(num)) return value; // return original if not a valid number
      if (ommit) {
        return num.toFixed(2) + "%";
      }
      return (num * 100).toFixed(2) + "%";
    }

    // Check if it's a valid date
    if (isDateString(value)) {
      const date = new Date(value);
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    // Try to parse as number
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      value = parsed;
    } else {
      return value; // Not a date, not a number – return as-is
    }
  }

  if (typeof value !== "number" || isNaN(value)) return "";

  const num = value;
  const absNum = Math.abs(num);
  let isGreater = num < 0;
  const sign = num < 0 ? "-" : "";

  if (absNum >= 1_000_000_000_000) {
    if (isGreater) {
      return "-$" + (absNum / 1_000_000_000_000).toFixed(2) + "T";
    }
    return "$" + sign + (absNum / 1_000_000_000_000).toFixed(2) + "T";
  } else if (absNum >= 1_000_000_000) {
    if (isGreater) {
      return "-$" + (absNum / 1_000_000_000).toFixed(2) + "B";
    }
    return "$" + sign + (absNum / 1_000_000_000).toFixed(2) + "B";
  } else if (absNum >= 1_000_000) {
    if (isGreater) {
      return "-$" + (absNum / 1_000_000).toFixed(2) + "M";
    }
    return "$" + sign + (absNum / 1_000_000).toFixed(2) + "M";
  } else if (absNum >= 1_000) {
    if (isGreater) {
      return "-$" + (absNum / 1_000).toFixed(2) + "K";
    }
    return sign + (absNum / 1_000).toFixed(2) + "K";
  } else {
    return sign + absNum.toFixed(2);
  }
}
export function formatMoneyNumber3(
  value: string | number | null | undefined,
  ommit: boolean = false
): string {
  if (value === null || value === undefined || value === "") return "";

  const isDateString = (val: string): boolean =>
    !isNaN(Date.parse(val)) && /\d{4}-\d{2}-\d{2}/.test(val);

  if (typeof value === "string") {
    // Handle percentages (e.g., "0.2430126434312604%")
    const isPercentage = value.trim().endsWith("%");
    if (isPercentage) {
      const num = parseFloat(value.replace("%", "").trim());
      if (isNaN(num)) return value; // return original if not a valid number
      if (ommit) {
        return num.toFixed(2) + "%";
      }
      return (num * 100).toFixed(2) + "%";
    }

    // Check if it's a valid date
    if (isDateString(value)) {
      const date = new Date(value);
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    // Try to parse as number
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      value = parsed;
    } else {
      return value; // Not a date, not a number – return as-is
    }
  }

  if (typeof value !== "number" || isNaN(value)) return "";

  const num = value;
  const absNum = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  if (absNum >= 1_000_000_000_000) {
    return "$" + sign + (absNum / 1_000_000_000_000).toFixed(2) + "T";
  } else if (absNum >= 1_000_000_000) {
    return "$" + sign + (absNum / 1_000_000_000).toFixed(2) + "B";
  } else if (absNum >= 1_000_000) {
    return "$" + sign + (absNum / 1_000_000).toFixed(2) + "M";
  } else if (absNum >= 1_000) {
    return sign + (absNum / 1_000).toFixed(2) + "K";
  } else {
    return sign + absNum.toFixed(2);
  }
}

/**
 * Converts an ISO date string to a human-readable date string.
 * @param isoDateString - The ISO date string (e.g., "2024-04-16T16:33:17").
 * @param locale - The locale to use for formatting (default is 'en-US').
 * @param options - Optional formatting options for the date.
 * @returns A human-readable date string.
 */
export function formatDateToHumanReadable(
  isoDateString: string,
  locale: string = "en-US",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  const date = new Date(isoDateString);
  return date.toLocaleDateString(locale, options);
}

export function formatDateToHumanReadableNew(
  isoDateString: string | undefined | null
): string {
  // Check if isoDateString is null, undefined, or an empty string
  if (!isoDateString) {
    return "-";
  }

  const date = new Date(isoDateString);

  // Check if the date object is valid after parsing the string
  if (isNaN(date.getTime())) {
    return "-"; // Return a hyphen if the date string was invalid
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

export const excludedKeys = [
  "description",
  "isFund",
  "isAdr",
  "isActivelyTrading",
  "isEtf",
  "defaultImage",
  "image",
];
