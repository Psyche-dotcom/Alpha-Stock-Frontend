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
  }[] = [];

  if (filter == "income-statements") {
    if (type == "Income") {
      dataSources = [
        {
          id: 3,
          title: "Revenue",
          row1: Data[0]?.revenue,
          row2: Data[1]?.revenue,
          row3: Data[2]?.revenue,
          row4: Data[3]?.revenue,
          row5: Data[4]?.revenue,
        },
        {
          id: 4,
          title: "Cost Of Revenue",
          row1: Data[0]?.costOfRevenue,
          row2: Data[1]?.costOfRevenue,
          row3: Data[2]?.costOfRevenue,
          row4: Data[3]?.costOfRevenue,
          row5: Data[4]?.costOfRevenue,
        },
        {
          id: 12,
          title: "Cost And Expenses",
          row1: Data[0]?.costAndExpenses,
          row2: Data[1]?.costAndExpenses,
          row3: Data[2]?.costAndExpenses,
          row4: Data[3]?.costAndExpenses,
          row5: Data[4]?.costAndExpenses,
        },
        {
          id: 5,
          title: "Gross Profit",
          row1: Data[0]?.grossProfit,
          row2: Data[1]?.grossProfit,
          row3: Data[2]?.grossProfit,
          row4: Data[3]?.grossProfit,
          row5: Data[4]?.grossProfit,
        },
        {
          id: 6,
          title: "Research And Development Expenses",
          row1: Data[0]?.researchAndDevelopmentExpenses,
          row2: Data[1]?.researchAndDevelopmentExpenses,
          row3: Data[2]?.researchAndDevelopmentExpenses,
          row4: Data[3]?.researchAndDevelopmentExpenses,
          row5: Data[4]?.researchAndDevelopmentExpenses,
        },

        {
          id: 8,
          title: "Selling And Marketing Expenses",
          row1: Data[0]?.sellingAndMarketingExpenses,
          row2: Data[1]?.sellingAndMarketingExpenses,
          row3: Data[2]?.sellingAndMarketingExpenses,
          row4: Data[3]?.sellingAndMarketingExpenses,
          row5: Data[4]?.sellingAndMarketingExpenses,
        },
        {
          id: 9,
          title: "Selling General And Administrative Expenses",
          row1: Data[0]?.sellingGeneralAndAdministrativeExpenses,
          row2: Data[1]?.sellingGeneralAndAdministrativeExpenses,
          row3: Data[2]?.sellingGeneralAndAdministrativeExpenses,
          row4: Data[3]?.sellingGeneralAndAdministrativeExpenses,
          row5: Data[4]?.sellingGeneralAndAdministrativeExpenses,
        },
        {
          id: 21,
          title: "Total Other Income Expenses Net",
          row1: Data[0]?.totalOtherIncomeExpensesNet,
          row2: Data[1]?.totalOtherIncomeExpensesNet,
          row3: Data[2]?.totalOtherIncomeExpensesNet,
          row4: Data[3]?.totalOtherIncomeExpensesNet,
          row5: Data[4]?.totalOtherIncomeExpensesNet,
        },
        {
          id: 11,
          title: "Operating Expenses",
          row1: Data[0]?.operatingExpenses,
          row2: Data[1]?.operatingExpenses,
          row3: Data[2]?.operatingExpenses,
          row4: Data[3]?.operatingExpenses,
          row5: Data[4]?.operatingExpenses,
        },
        {
          id: 20,
          title: "Operating Income",
          row1: Data[0]?.operatingIncome,
          row2: Data[1]?.operatingIncome,
          row3: Data[2]?.operatingIncome,
          row4: Data[3]?.operatingIncome,
          row5: Data[4]?.operatingIncome,
        },
        {
          id: 10,
          title: "Other Expenses",
          row1: Data[0]?.otherExpenses,
          row2: Data[1]?.otherExpenses,
          row3: Data[2]?.otherExpenses,
          row4: Data[3]?.otherExpenses,
          row5: Data[4]?.otherExpenses,
        },
        {
          id: 35,
          title: "Net Interest Income",
          row1: Data[0]?.netInterestIncome,
          row2: Data[1]?.netInterestIncome,
          row3: Data[2]?.netInterestIncome,
          row4: Data[3]?.netInterestIncome,
          row5: Data[4]?.netInterestIncome,
        },
        {
          id: 14,
          title: "Interest Income",
          row1: Data[0]?.interestIncome,
          row2: Data[1]?.interestIncome,
          row3: Data[2]?.interestIncome,
          row4: Data[3]?.interestIncome,
          row5: Data[4]?.interestIncome,
        },
        {
          id: 23,
          title: "Pre-Tax Income",
          row1: Data[0]?.incomeBeforeTax,
          row2: Data[1]?.incomeBeforeTax,
          row3: Data[2]?.incomeBeforeTax,
          row4: Data[3]?.incomeBeforeTax,
          row5: Data[4]?.incomeBeforeTax,
        },
        {
          id: 24,
          title: "Income Tax Expense",
          row1: Data[0]?.incomeTaxExpense,
          row2: Data[1]?.incomeTaxExpense,
          row3: Data[2]?.incomeTaxExpense,
          row4: Data[3]?.incomeTaxExpense,
          row5: Data[4]?.incomeTaxExpense,
        },

        {
          id: 15,
          title: "Interest Expense",
          row1: Data[0]?.interestExpense,
          row2: Data[1]?.interestExpense,
          row3: Data[2]?.interestExpense,
          row4: Data[3]?.interestExpense,
          row5: Data[4]?.interestExpense,
        },

        {
          id: 28,
          title: "Net Income Deductions",
          row1: Data[0]?.netIncomeDeductions,
          row2: Data[1]?.netIncomeDeductions,
          row3: Data[2]?.netIncomeDeductions,
          row4: Data[3]?.netIncomeDeductions,
          row5: Data[4]?.netIncomeDeductions,
        },
        {
          id: 24,
          title: "Net Income From Continuing Operations",
          row1: Data[0]?.netIncomeFromContinuingOperations,
          row2: Data[1]?.netIncomeFromContinuingOperations,
          row3: Data[2]?.netIncomeFromContinuingOperations,
          row4: Data[3]?.netIncomeFromContinuingOperations,
          row5: Data[4]?.netIncomeFromContinuingOperations,
        },
        {
          id: 25,
          title: "Net Income From Discontinued Operations",
          row1: Data[0]?.netIncomeFromDiscontinuedOperations,
          row2: Data[1]?.netIncomeFromDiscontinuedOperations,
          row3: Data[2]?.netIncomeFromDiscontinuedOperations,
          row4: Data[3]?.netIncomeFromDiscontinuedOperations,
          row5: Data[4]?.netIncomeFromDiscontinuedOperations,
        },

        {
          id: 19,
          title: "Non Operating Income Excluding Interest",
          row1: Data[0]?.nonOperatingIncomeExcludingInterest,
          row2: Data[1]?.nonOperatingIncomeExcludingInterest,
          row3: Data[2]?.nonOperatingIncomeExcludingInterest,
          row4: Data[3]?.nonOperatingIncomeExcludingInterest,
          row5: Data[4]?.nonOperatingIncomeExcludingInterest,
        },

        {
          id: 27,
          title: "Bottom Line NetIncome",
          row1: Data[0]?.bottomLineNetIncome,
          row2: Data[1]?.bottomLineNetIncome,
          row3: Data[2]?.bottomLineNetIncome,
          row4: Data[3]?.bottomLineNetIncome,
          row5: Data[4]?.bottomLineNetIncome,
        },

        {
          id: 16,
          title: "Depreciation And Amortization",
          row1: Data[0]?.depreciationAndAmortization,
          row2: Data[1]?.depreciationAndAmortization,
          row3: Data[2]?.depreciationAndAmortization,
          row4: Data[3]?.depreciationAndAmortization,
          row5: Data[4]?.depreciationAndAmortization,
        },

        {
          id: 7,
          title: "General And Administrative Expenses",
          row1: Data[0]?.generalAndAdministrativeExpenses,
          row2: Data[1]?.generalAndAdministrativeExpenses,
          row3: Data[2]?.generalAndAdministrativeExpenses,
          row4: Data[3]?.generalAndAdministrativeExpenses,
          row5: Data[4]?.generalAndAdministrativeExpenses,
        },

        {
          id: 26,
          title: "Other Adjustments To NetIncome",
          row1: Data[0]?.otherAdjustmentsToNetIncome,
          row2: Data[1]?.otherAdjustmentsToNetIncome,
          row3: Data[2]?.otherAdjustmentsToNetIncome,
          row4: Data[3]?.otherAdjustmentsToNetIncome,
          row5: Data[4]?.otherAdjustmentsToNetIncome,
        },

        {
          id: 27,
          title: "Net Income",
          row1: Data[0]?.netIncome,
          row2: Data[1]?.netIncome,
          row3: Data[2]?.netIncome,
          row4: Data[3]?.netIncome,
          row5: Data[4]?.netIncome,
        },
        {
          id: 100,
          title: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
        },
      ];
    }
    if (type == "BasicEps") {
      dataSources = [
        {
          id: 17,
          title: "EBIT",
          row1: Data[0]?.ebit,
          row2: Data[1]?.ebit,
          row3: Data[2]?.ebit,
          row4: Data[3]?.ebit,
          row5: Data[4]?.ebit,
        },

        {
          id: 29,
          title: "EPS",
          row1: Data[0]?.eps,
          row2: Data[1]?.eps,
          row3: Data[2]?.eps,
          row4: Data[3]?.eps,
          row5: Data[4]?.eps,
        },
        {
          id: 100,
          title: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
        },
      ];
    }
    if (type == "DiEps") {
      dataSources = [
        {
          id: 18,
          title: "EBITDA",
          row1: Data[0]?.ebitda,
          row2: Data[1]?.ebitda,
          row3: Data[2]?.ebitda,
          row4: Data[3]?.ebitda,
          row5: Data[4]?.ebitda,
        },

        {
          id: 30,
          title: "EPS Diluted",
          row1: Data[0]?.epsDiluted,
          row2: Data[1]?.epsDiluted,
          row3: Data[2]?.epsDiluted,
          row4: Data[3]?.epsDiluted,
          row5: Data[4]?.epsDiluted,
        },
        {
          id: 100,
          title: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
        },
      ];
    }

    if (type == "share") {
      dataSources = [
        {
          id: 31,
          title: "Average Basic Shares Outstanding",
          row1: Data[0]?.weightedAverageShsOut,
          row2: Data[1]?.weightedAverageShsOut,
          row3: Data[2]?.weightedAverageShsOut,
          row4: Data[3]?.weightedAverageShsOut,
          row5: Data[4]?.weightedAverageShsOut,
        },
        {
          id: 32,
          title: "Average Diluted Shares Outstanding",
          row1: Data[0]?.weightedAverageShsOutDil,
          row2: Data[1]?.weightedAverageShsOutDil,
          row3: Data[2]?.weightedAverageShsOutDil,
          row4: Data[3]?.weightedAverageShsOutDil,
          row5: Data[4]?.weightedAverageShsOutDil,
        },
        {
          id: 100,
          title: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
        },
      ];
    }
  } else if (filter == "balance-sheet") {
    if (type == "ASSET") {
      dataSources = [
        {
          id: 6,
          title: "Cash And Cash Equivalents",
          row1: Data[0]?.cashAndCashEquivalents,
          row2: Data[1]?.cashAndCashEquivalents,
          row3: Data[2]?.cashAndCashEquivalents,
          row4: Data[3]?.cashAndCashEquivalents,
          row5: Data[4]?.cashAndCashEquivalents,
        },
        {
          id: 33,
          title: "Short Term Investments",
          row1: Data[0]?.shortTermInvestments,
          row2: Data[1]?.shortTermInvestments,
          row3: Data[2]?.shortTermInvestments,
          row4: Data[3]?.shortTermInvestments,
          row5: Data[4]?.shortTermInvestments,
        },
        {
          id: 16,
          title: "Long Term Investments",
          row1: Data[0]?.longTermInvestments,
          row2: Data[1]?.longTermInvestments,
          row3: Data[2]?.longTermInvestments,
          row4: Data[3]?.longTermInvestments,
          row5: Data[4]?.longTermInvestments,
        },

        {
          id: 7,
          title: "Cash & Short Term Investments",
          row1: Data[0]?.cashAndShortTermInvestments,
          row2: Data[1]?.cashAndShortTermInvestments,
          row3: Data[2]?.cashAndShortTermInvestments,
          row4: Data[3]?.cashAndShortTermInvestments,
          row5: Data[4]?.cashAndShortTermInvestments,
        },
        {
          id: 2,
          title: "Accounts Receivables",
          row1: Data[0]?.accountsReceivables,
          row2: Data[1]?.accountsReceivables,
          row3: Data[2]?.accountsReceivables,
          row4: Data[3]?.accountsReceivables,
          row5: Data[4]?.accountsReceivables,
        },
        {
          id: 15,
          title: "Inventories",
          row1: Data[0]?.inventory,
          row2: Data[1]?.inventory,
          row3: Data[2]?.inventory,
          row4: Data[3]?.inventory,
          row5: Data[4]?.inventory,
        },

        {
          id: 21,
          title: "Other Current Assets",
          row1: Data[0]?.otherCurrentAssets,
          row2: Data[1]?.otherCurrentAssets,
          row3: Data[2]?.otherCurrentAssets,
          row4: Data[3]?.otherCurrentAssets,
          row5: Data[4]?.otherCurrentAssets,
        },

        {
          id: 26,
          title: "Other Payables",
          row1: Data[0]?.otherPayables,
          row2: Data[1]?.otherPayables,
          row3: Data[2]?.otherPayables,
          row4: Data[3]?.otherPayables,
          row5: Data[4]?.otherPayables,
        },
        {
          id: 24,
          title: "Other Non Current Assets",
          row1: Data[0]?.otherNonCurrentAssets,
          row2: Data[1]?.otherNonCurrentAssets,
          row3: Data[2]?.otherNonCurrentAssets,
          row4: Data[3]?.otherNonCurrentAssets,
          row5: Data[4]?.otherNonCurrentAssets,
        },

        {
          id: 27,
          title: "Other Receivables",
          row1: Data[0]?.otherReceivables,
          row2: Data[1]?.otherReceivables,
          row3: Data[2]?.otherReceivables,
          row4: Data[3]?.otherReceivables,
          row5: Data[4]?.otherReceivables,
        },

        {
          id: 8,
          title: "Common Stock",
          row1: Data[0]?.commonStock,
          row2: Data[1]?.commonStock,
          row3: Data[2]?.commonStock,
          row4: Data[3]?.commonStock,
          row5: Data[4]?.commonStock,
        },
        {
          id: 9,
          title: "Deferred Revenue",
          row1: Data[0]?.deferredRevenue,
          row2: Data[1]?.deferredRevenue,
          row3: Data[2]?.deferredRevenue,
          row4: Data[3]?.deferredRevenue,
          row5: Data[4]?.deferredRevenue,
        },
        {
          id: 12,
          title: "Goodwill",
          row1: Data[0]?.goodwill,
          row2: Data[1]?.goodwill,
          row3: Data[2]?.goodwill,
          row4: Data[3]?.goodwill,
          row5: Data[4]?.goodwill,
        },
        {
          id: 13,
          title: "Goodwill & Intangible Assets",
          row1: Data[0]?.goodwillAndIntangibleAssets,
          row2: Data[1]?.goodwillAndIntangibleAssets,
          row3: Data[2]?.goodwillAndIntangibleAssets,
          row4: Data[3]?.goodwillAndIntangibleAssets,
          row5: Data[4]?.goodwillAndIntangibleAssets,
        },
        {
          id: 18,
          title: "Net Debt",
          row1: Data[0]?.netDebt,
          row2: Data[1]?.netDebt,
          row3: Data[2]?.netDebt,
          row4: Data[3]?.netDebt,
          row5: Data[4]?.netDebt,
        },
        {
          id: 19,
          title: "Net Receivables",
          row1: Data[0]?.netReceivables,
          row2: Data[1]?.netReceivables,
          row3: Data[2]?.netReceivables,
          row4: Data[3]?.netReceivables,
          row5: Data[4]?.netReceivables,
        },
        {
          id: 42,
          title: "Total Non Current Assets",
          row1: Data[0]?.totalNonCurrentAssets,
          row2: Data[1]?.totalNonCurrentAssets,
          row3: Data[2]?.totalNonCurrentAssets,
          row4: Data[3]?.totalNonCurrentAssets,
          row5: Data[4]?.totalNonCurrentAssets,
        },

        {
          id: 44,
          title: "Total Payables",
          row1: Data[0]?.totalPayables,
          row2: Data[1]?.totalPayables,
          row3: Data[2]?.totalPayables,
          row4: Data[3]?.totalPayables,
          row5: Data[4]?.totalPayables,
        },
        {
          id: 45,
          title: "Total Stockholders Equity",
          row1: Data[0]?.totalStockholdersEquity,
          row2: Data[1]?.totalStockholdersEquity,
          row3: Data[2]?.totalStockholdersEquity,
          row4: Data[3]?.totalStockholdersEquity,
          row5: Data[4]?.totalStockholdersEquity,
        },
        {
          id: 100,
          title: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
        },
      ];
    }
    if (type == "LIABLE") {
      dataSources = [
        {
          id: 1,
          title: "Account Payables",
          row1: Data[0]?.accountPayables,
          row2: Data[1]?.accountPayables,
          row3: Data[2]?.accountPayables,
          row4: Data[3]?.accountPayables,
          row5: Data[4]?.accountPayables,
        },

        {
          id: 3,
          title: "Accrued Expenses",
          row1: Data[0]?.accruedExpenses,
          row2: Data[1]?.accruedExpenses,
          row3: Data[2]?.accruedExpenses,
          row4: Data[3]?.accruedExpenses,
          row5: Data[4]?.accruedExpenses,
        },
        {
          id: 22,
          title: "Other Current Liabilities",
          row1: Data[0]?.otherCurrentLiabilities,
          row2: Data[1]?.otherCurrentLiabilities,
          row3: Data[2]?.otherCurrentLiabilities,
          row4: Data[3]?.otherCurrentLiabilities,
          row5: Data[4]?.otherCurrentLiabilities,
        },
        {
          id: 23,
          title: "Other Liabilities",
          row1: Data[0]?.otherLiabilities,
          row2: Data[1]?.otherLiabilities,
          row3: Data[2]?.otherLiabilities,
          row4: Data[3]?.otherLiabilities,
          row5: Data[4]?.otherLiabilities,
        },

        {
          id: 25,
          title: "Other Non Current Liabilities",
          row1: Data[0]?.otherNonCurrentLiabilities,
          row2: Data[1]?.otherNonCurrentLiabilities,
          row3: Data[2]?.otherNonCurrentLiabilities,
          row4: Data[3]?.otherNonCurrentLiabilities,
          row5: Data[4]?.otherNonCurrentLiabilities,
        },

        {
          id: 4,
          title: "Accumulated Other Comprehensive Income Loss",
          row1: Data[0]?.accumulatedOtherComprehensiveIncomeLoss,
          row2: Data[1]?.accumulatedOtherComprehensiveIncomeLoss,
          row3: Data[2]?.accumulatedOtherComprehensiveIncomeLoss,
          row4: Data[3]?.accumulatedOtherComprehensiveIncomeLoss,
          row5: Data[4]?.accumulatedOtherComprehensiveIncomeLoss,
        },
        {
          id: 5,
          title: "Additional Paid In Capital",
          row1: Data[0]?.additionalPaidInCapital,
          row2: Data[1]?.additionalPaidInCapital,
          row3: Data[2]?.additionalPaidInCapital,
          row4: Data[3]?.additionalPaidInCapital,
          row5: Data[4]?.additionalPaidInCapital,
        },

        {
          id: 46,
          title: "Treasury Stock",
          row1: Data[0]?.treasuryStock,
          row2: Data[1]?.treasuryStock,
          row3: Data[2]?.treasuryStock,
          row4: Data[3]?.treasuryStock,
          row5: Data[4]?.treasuryStock,
        },
        {
          id: 47,
          title: "Capital Lease Obligations",
          row1: Data[0]?.capitalLeaseObligations,
          row2: Data[1]?.capitalLeaseObligations,
          row3: Data[2]?.capitalLeaseObligations,
          row4: Data[3]?.capitalLeaseObligations,
          row5: Data[4]?.capitalLeaseObligations,
        },
        {
          id: 48,
          title: "Capital Lease Obligations Current",
          row1: Data[0]?.capitalLeaseObligationsCurrent,
          row2: Data[1]?.capitalLeaseObligationsCurrent,
          row3: Data[2]?.capitalLeaseObligationsCurrent,
          row4: Data[3]?.capitalLeaseObligationsCurrent,
          row5: Data[4]?.capitalLeaseObligationsCurrent,
        },

        {
          id: 50,
          title: "Total Debt",
          row1: Data[0]?.totalDebt,
          row2: Data[1]?.totalDebt,
          row3: Data[2]?.totalDebt,
          row4: Data[3]?.totalDebt,
          row5: Data[4]?.totalDebt,
        },
        {
          id: 36,
          title: "Total Assets",
          row1: Data[0]?.totalAssets,
          row2: Data[1]?.totalAssets,
          row3: Data[2]?.totalAssets,
          row4: Data[3]?.totalAssets,
          row5: Data[4]?.totalAssets,
        },
        {
          id: 37,
          title: "Total Current Assets",
          row1: Data[0]?.totalCurrentAssets,
          row2: Data[1]?.totalCurrentAssets,
          row3: Data[2]?.totalCurrentAssets,
          row4: Data[3]?.totalCurrentAssets,
          row5: Data[4]?.totalCurrentAssets,
        },

        {
          id: 39,
          title: "Total Investments",
          row1: Data[0]?.totalInvestments,
          row2: Data[1]?.totalInvestments,
          row3: Data[2]?.totalInvestments,
          row4: Data[3]?.totalInvestments,
          row5: Data[4]?.totalInvestments,
        },
        {
          id: 38,
          title: "Total Current Liabilities",
          row1: Data[0]?.totalCurrentLiabilities,
          row2: Data[1]?.totalCurrentLiabilities,
          row3: Data[2]?.totalCurrentLiabilities,
          row4: Data[3]?.totalCurrentLiabilities,
          row5: Data[4]?.totalCurrentLiabilities,
        },
        {
          id: 40,
          title: "Total Liabilities",
          row1: Data[0]?.totalLiabilities,
          row2: Data[1]?.totalLiabilities,
          row3: Data[2]?.totalLiabilities,
          row4: Data[3]?.totalLiabilities,
          row5: Data[4]?.totalLiabilities,
        },
        {
          id: 43,
          title: "Total Non Current Liabilities",
          row1: Data[0]?.totalNonCurrentLiabilities,
          row2: Data[1]?.totalNonCurrentLiabilities,
          row3: Data[2]?.totalNonCurrentLiabilities,
          row4: Data[3]?.totalNonCurrentLiabilities,
          row5: Data[4]?.totalNonCurrentLiabilities,
        },

        {
          id: 41,
          title: "Total Liabilities And Total Equity",
          row1: Data[0]?.totalLiabilitiesAndTotalEquity,
          row2: Data[1]?.totalLiabilitiesAndTotalEquity,
          row3: Data[2]?.totalLiabilitiesAndTotalEquity,
          row4: Data[3]?.totalLiabilitiesAndTotalEquity,
          row5: Data[4]?.totalLiabilitiesAndTotalEquity,
        },

        {
          id: 100,
          title: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
        },
      ];
    }
    if (type == "SHARE") {
      dataSources = [
        {
          id: 31,
          title: "Retained Earnings",
          row1: Data[0]?.retainedEarnings,
          row2: Data[1]?.retainedEarnings,
          row3: Data[2]?.retainedEarnings,
          row4: Data[3]?.retainedEarnings,
          row5: Data[4]?.retainedEarnings,
        },
        {
          id: 30,
          title: "Property Plant Equipment Net",
          row1: Data[0]?.propertyPlantEquipmentNet,
          row2: Data[1]?.propertyPlantEquipmentNet,
          row3: Data[2]?.propertyPlantEquipmentNet,
          row4: Data[3]?.propertyPlantEquipmentNet,
          row5: Data[4]?.propertyPlantEquipmentNet,
        },

        {
          id: 32,
          title: "Short Term Debt",
          row1: Data[0]?.shortTermDebt,
          row2: Data[1]?.shortTermDebt,
          row3: Data[2]?.shortTermDebt,
          row4: Data[3]?.shortTermDebt,
          row5: Data[4]?.shortTermDebt,
        },
        {
          id: 28,
          title: "Preferred Stock",
          row1: Data[0]?.preferredStock,
          row2: Data[1]?.preferredStock,
          row3: Data[2]?.preferredStock,
          row4: Data[3]?.preferredStock,
          row5: Data[4]?.preferredStock,
        },
        {
          id: 29,
          title: "Prepaids",
          row1: Data[0]?.prepaids,
          row2: Data[1]?.prepaids,
          row3: Data[2]?.prepaids,
          row4: Data[3]?.prepaids,
          row5: Data[4]?.prepaids,
        },

        {
          id: 34,
          title: "Tax Assets",
          row1: Data[0]?.taxAssets,
          row2: Data[1]?.taxAssets,
          row3: Data[2]?.taxAssets,
          row4: Data[3]?.taxAssets,
          row5: Data[4]?.taxAssets,
        },
        {
          id: 35,
          title: "Tax Payables",
          row1: Data[0]?.taxPayables,
          row2: Data[1]?.taxPayables,
          row3: Data[2]?.taxPayables,
          row4: Data[3]?.taxPayables,
          row5: Data[4]?.taxPayables,
        },
        {
          id: 51,
          title: "Total Equity",
          row1: Data[0]?.totalEquity,
          row2: Data[1]?.totalEquity,
          row3: Data[2]?.totalEquity,
          row4: Data[3]?.totalEquity,
          row5: Data[4]?.totalEquity,
        },

        {
          id: 57,
          title: "Other Total Stockholders Equity",
          row1: Data[0]?.otherTotalStockholdersEquity,
          row2: Data[1]?.otherTotalStockholdersEquity,
          row3: Data[2]?.otherTotalStockholdersEquity,
          row4: Data[3]?.otherTotalStockholdersEquity,
          row5: Data[4]?.otherTotalStockholdersEquity,
        },
        {
          id: 100,
          title: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
        },
      ];
    }
  } else if (filter == "cashflow") {
    if (type == "CASH") {
      dataSources = [
        {
          id: 27,
          title: "Net Income",
          row1: Data[0]?.netIncome,
          row2: Data[1]?.netIncome,
          row3: Data[2]?.netIncome,
          row4: Data[3]?.netIncome,
          row5: Data[4]?.netIncome,
        },
        {
          id: 12,
          title: "Depreciation And Amortization",
          row1: Data[0]?.depreciationAndAmortization,
          row2: Data[1]?.depreciationAndAmortization,
          row3: Data[2]?.depreciationAndAmortization,
          row4: Data[3]?.depreciationAndAmortization,
          row5: Data[4]?.depreciationAndAmortization,
        },
        {
          id: 11,
          title: "Deferred Income Tax",
          row1: Data[0]?.deferredIncomeTax,
          row2: Data[1]?.deferredIncomeTax,
          row3: Data[2]?.deferredIncomeTax,
          row4: Data[3]?.deferredIncomeTax,
          row5: Data[4]?.deferredIncomeTax,
        },
        {
          id: 39,
          title: "Stock Based Compensation",
          row1: Data[0]?.stockBasedCompensation,
          row2: Data[1]?.stockBasedCompensation,
          row3: Data[2]?.stockBasedCompensation,
          row4: Data[3]?.stockBasedCompensation,
          row5: Data[4]?.stockBasedCompensation,
        },
        {
          id: 33,
          title: "Other Non Cash Items",
          row1: Data[0]?.otherNonCashItems,
          row2: Data[1]?.otherNonCashItems,
          row3: Data[2]?.otherNonCashItems,
          row4: Data[3]?.otherNonCashItems,
          row5: Data[4]?.otherNonCashItems,
        },
        {
          id: 2,
          title: "Accounts Receivables",
          row1: Data[0]?.accountsReceivables,
          row2: Data[1]?.accountsReceivables,
          row3: Data[2]?.accountsReceivables,
          row4: Data[3]?.accountsReceivables,
          row5: Data[4]?.accountsReceivables,
        },
        {
          id: 16,
          title: "Inventory",
          row1: Data[0]?.inventory,
          row2: Data[1]?.inventory,
          row3: Data[2]?.inventory,
          row4: Data[3]?.inventory,
          row5: Data[4]?.inventory,
        },
        {
          id: 34,
          title: "Other Working Capital",
          row1: Data[0]?.otherWorkingCapital,
          row2: Data[1]?.otherWorkingCapital,
          row3: Data[2]?.otherWorkingCapital,
          row4: Data[3]?.otherWorkingCapital,
          row5: Data[4]?.otherWorkingCapital,
        },

        {
          id: 6,
          title: "Change In Working Capital",
          row1: Data[0]?.changeInWorkingCapital,
          row2: Data[1]?.changeInWorkingCapital,
          row3: Data[2]?.changeInWorkingCapital,
          row4: Data[3]?.changeInWorkingCapital,
          row5: Data[4]?.changeInWorkingCapital,
        },
        {
          id: 100,
          title: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
        },
      ];
    }
    if (type == "Investing") {
      dataSources = [
        {
          id: 10,
          title: "Capital Expenditure",
          row1: Data[0]?.capitalExpenditure,
          row2: Data[1]?.capitalExpenditure,
          row3: Data[2]?.capitalExpenditure,
          row4: Data[3]?.capitalExpenditure,
          row5: Data[4]?.capitalExpenditure,
        },
        {
          id: 14,
          title: "Free Cash Flow",
          row1: Data[0]?.freeCashFlow,
          row2: Data[1]?.freeCashFlow,
          row3: Data[2]?.freeCashFlow,
          row4: Data[3]?.freeCashFlow,
          row5: Data[4]?.freeCashFlow,
        },
        {
          id: 3,
          title: "Acquisitions Net",
          row1: Data[0]?.acquisitionsNet,
          row2: Data[1]?.acquisitionsNet,
          row3: Data[2]?.acquisitionsNet,
          row4: Data[3]?.acquisitionsNet,
          row5: Data[4]?.acquisitionsNet,
        },
        {
          id: 21,
          title: "Net Cash Provided By Investing Activities",
          row1: Data[0]?.netCashProvidedByInvestingActivities,
          row2: Data[1]?.netCashProvidedByInvestingActivities,
          row3: Data[2]?.netCashProvidedByInvestingActivities,
          row4: Data[3]?.netCashProvidedByInvestingActivities,
          row5: Data[4]?.netCashProvidedByInvestingActivities,
        },
        {
          id: 31,
          title: "Other Financing Activities",
          row1: Data[0]?.otherFinancingActivities,
          row2: Data[1]?.otherFinancingActivities,
          row3: Data[2]?.otherFinancingActivities,
          row4: Data[3]?.otherFinancingActivities,
          row5: Data[4]?.otherFinancingActivities,
        },
        {
          id: 32,
          title: "Other Investing Activities",
          row1: Data[0]?.otherInvestingActivities,
          row2: Data[1]?.otherInvestingActivities,
          row3: Data[2]?.otherInvestingActivities,
          row4: Data[3]?.otherInvestingActivities,
          row5: Data[4]?.otherInvestingActivities,
        },
        {
          id: 100,
          title: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
        },
      ];
    }
    if (type == "Financing") {
      dataSources = [
        {
          id: 19,
          title: "Long Term Net Debt Issuance",
          row1: Data[0]?.longTermNetDebtIssuance,
          row2: Data[1]?.longTermNetDebtIssuance,
          row3: Data[2]?.longTermNetDebtIssuance,
          row4: Data[3]?.longTermNetDebtIssuance,
          row5: Data[4]?.longTermNetDebtIssuance,
        },
        {
          id: 38,
          title: "Short Term Net Debt Issuance",
          row1: Data[0]?.shortTermNetDebtIssuance,
          row2: Data[1]?.shortTermNetDebtIssuance,
          row3: Data[2]?.shortTermNetDebtIssuance,
          row4: Data[3]?.shortTermNetDebtIssuance,
          row5: Data[4]?.shortTermNetDebtIssuance,
        },
        {
          id: 25,
          title: "Net Debt Issuance",
          row1: Data[0]?.netDebtIssuance,
          row2: Data[1]?.netDebtIssuance,
          row3: Data[2]?.netDebtIssuance,
          row4: Data[3]?.netDebtIssuance,
          row5: Data[4]?.netDebtIssuance,
        },
        {
          id: 8,
          title: "Common Stock Issuance",
          row1: Data[0]?.commonStockIssuance,
          row2: Data[1]?.commonStockIssuance,
          row3: Data[2]?.commonStockIssuance,
          row4: Data[3]?.commonStockIssuance,
          row5: Data[4]?.commonStockIssuance,
        },
        {
          id: 7,
          title: "Common Dividends Paid",
          row1: Data[0]?.commonDividendsPaid,
          row2: Data[1]?.commonDividendsPaid,
          row3: Data[2]?.commonDividendsPaid,
          row4: Data[3]?.commonDividendsPaid,
          row5: Data[4]?.commonDividendsPaid,
        },
        {
          id: 9,
          title: "Common Stock Repurchased",
          row1: Data[0]?.commonStockRepurchased,
          row2: Data[1]?.commonStockRepurchased,
          row3: Data[2]?.commonStockRepurchased,
          row4: Data[3]?.commonStockRepurchased,
          row5: Data[4]?.commonStockRepurchased,
        },
        {
          id: 24,
          title: "Net Common Stock Issuance",
          row1: Data[0]?.netCommonStockIssuance,
          row2: Data[1]?.netCommonStockIssuance,
          row3: Data[2]?.netCommonStockIssuance,
          row4: Data[3]?.netCommonStockIssuance,
          row5: Data[4]?.netCommonStockIssuance,
        },
        {
          id: 20,
          title: "Net Cash Provided By Financing Activities",
          row1: Data[0]?.netCashProvidedByFinancingActivities,
          row2: Data[1]?.netCashProvidedByFinancingActivities,
          row3: Data[2]?.netCashProvidedByFinancingActivities,
          row4: Data[3]?.netCashProvidedByFinancingActivities,
          row5: Data[4]?.netCashProvidedByFinancingActivities,
        },
        {
          id: 100,
          title: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
        },
      ];
    }
    if (type == "cashbeginning") {
      dataSources = [
        {
          id: 4,
          title: "Cash At Beginning Of Period",
          row1: Data[0]?.cashAtBeginningOfPeriod,
          row2: Data[1]?.cashAtBeginningOfPeriod,
          row3: Data[2]?.cashAtBeginningOfPeriod,
          row4: Data[3]?.cashAtBeginningOfPeriod,
          row5: Data[4]?.cashAtBeginningOfPeriod,
        },
        {
          id: 23,
          title: "Net Change In Cash",
          row1: Data[0]?.netChangeInCash,
          row2: Data[1]?.netChangeInCash,
          row3: Data[2]?.netChangeInCash,
          row4: Data[3]?.netChangeInCash,
          row5: Data[4]?.netChangeInCash,
        },
        {
          id: 5,
          title: "Cash At End Of Period",
          row1: Data[0]?.cashAtEndOfPeriod,
          row2: Data[1]?.cashAtEndOfPeriod,
          row3: Data[2]?.cashAtEndOfPeriod,
          row4: Data[3]?.cashAtEndOfPeriod,
          row5: Data[4]?.cashAtEndOfPeriod,
        },
        {
          id: 100,
          title: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
        },
      ];
    }
    if (type == "Items") {
      dataSources = [
        {
          id: 42,
          title: "Capital Expenditure",
          row1: Data[0]?.capitalExpenditure,
          row2: Data[1]?.capitalExpenditure,
          row3: Data[2]?.capitalExpenditure,
          row4: Data[3]?.capitalExpenditure,
          row5: Data[4]?.capitalExpenditure,
        },

        {
          id: 29,
          title: "Net Stock Issuance",
          row1: Data[0]?.netStockIssuance,
          row2: Data[1]?.netStockIssuance,
          row3: Data[2]?.netStockIssuance,
          row4: Data[3]?.netStockIssuance,
          row5: Data[4]?.netStockIssuance,
        },
        {
          id: 28,
          title: "Net Preferred StockIssuance",
          row1: Data[0]?.netPreferredStockIssuance,
          row2: Data[1]?.netPreferredStockIssuance,
          row3: Data[2]?.netPreferredStockIssuance,
          row4: Data[3]?.netPreferredStockIssuance,
          row5: Data[4]?.netPreferredStockIssuance,
        },
        {
          id: 100,
          title: "",
          row1: "",
          row2: "",
          row3: "",
          row4: "",
          row5: "",
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
      id: 6,
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
    return sign + num.toFixed(2);
  }
}
export function formatMoneyNumber2(
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
    return sign + (absNum / 1_000_000_000_000).toFixed(2) + "T";
  } else if (absNum >= 1_000_000_000) {
    return sign + (absNum / 1_000_000_000).toFixed(2) + "B";
  } else if (absNum >= 1_000_000) {
    return sign + (absNum / 1_000_000).toFixed(2) + "M";
  } else if (absNum >= 1_000) {
    return sign + (absNum / 1_000).toFixed(2) + "K";
  } else {
    return sign + num.toFixed(2);
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

export function formatDateToHumanReadableNew(isoDateString: string): string {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  //return `${year}-${month}`;
  return `${year}`;
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
