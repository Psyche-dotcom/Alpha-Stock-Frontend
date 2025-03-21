import { showErrorAlert, showSuccessAlert } from "@/utils/alert";
import { routes } from "../api-routes";
import { ErrorHandler } from "../errorHandler";
import httpService from "../httpService";
import useFetchItem from "../useFetchItem";
import useMutateItem from "../useMutateItem";

export const useGetStockInfo = ({ enabled = false }) => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["stockInfo-company"],
    queryFn: ({ symbol }) => httpService.getData(routes.getStockInfo(symbol)),
    enabled,
    retry: 1,
  });

  return {
    getStockInfoIsLoading: isLoading,
    getStockInfoData: data?.data?.result || [],
    getStockInfoFilter: filter,
    getStockInfoError: ErrorHandler(error),
    refetchGetStockInfo: refetch,
    setGetStockInfoFilter: setFilter,
  };
};
export const useGetIncomeStatement = ({ enabled = false }) => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["income-statement"],
    queryFn: ({ symbol, period }) =>
      httpService.getData(routes.getStockIncomeStatementUrl(symbol, period)),
    enabled,
    retry: 1,
  });

  return {
    getIncomeStatementIsLoading: isLoading,
    getIncomeStatementData: data?.data?.result || [],
    getIncomeStatementFilter: filter,
    getIncomeStatementError: ErrorHandler(error),
    refetchGetIncomeStatement: refetch,
    setGetIncomeStatementFilter: setFilter,
  };
};

export const useGetBalanceSheet = ({ enabled = false }) => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["balance-sheet"],
    queryFn: ({ symbol, period }) =>
      httpService.getData(routes.balanceSheetUrl(symbol, period)),
    enabled,
    retry: 1,
  });

  return {
    getBalanceSheetIsLoading: isLoading,
    getBalanceSheetData: data?.data?.result || [],
    getBalanceSheetFilter: filter,
    getBalanceSheetError: ErrorHandler(error),
    refetchGetBalanceSheet: refetch,
    setGetBalanceSheetFilter: setFilter,
  };
};
export const useGetCashFlow = ({ enabled = false }) => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["cashflow"],
    queryFn: ({ symbol, period }) =>
      httpService.getData(routes.cashFlowUrl(symbol, period)),
    enabled,
    retry: 1,
  });

  return {
    getCashFlowIsLoading: isLoading,
    getCashFlowData: data?.data?.result || [],
    getCashFlowFilter: filter,
    getCashFlowError: ErrorHandler(error),
    refetchGetCashFlow: refetch,
    setGetCashFlowFilter: setFilter,
  };
};
export const useGetStockInfoEod = ({ enabled = false }) => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["stockInfo-Performance"],
    queryFn: ({ symbol, startDate, endDate }) =>
      httpService.getData(routes.getStockInfoEod(symbol, startDate, endDate)),
    enabled,
    retry: 1,
  });

  return {
    getStockInfoEodIsLoading: isLoading,
    getStockInfoEodData: data?.data?.result || [],
    getStockInfoEodFilter: filter,
    getStockInfoEodError: ErrorHandler(error),
    refetchGetStockEodInfo: refetch,
    setGetStockInfoEodFilter: setFilter,
  };
};
