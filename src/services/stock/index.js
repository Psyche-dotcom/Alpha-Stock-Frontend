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

export const useGetMetrics = ({ enabled = false }) => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["get-metrics"],
    queryFn: ({ symbol, period }) =>
      httpService.getData(routes.getStockMetricsUrl(symbol, period)),
    enabled,
    retry: 1,
  });

  return {
    getMetricsIsLoading: isLoading,
    getMetricsData: data?.data?.result || [],
    getMetricsFilter: filter,
    getMetricsError: ErrorHandler(error),
    refetchGetMetrics: refetch,
    setMetricsFilter: setFilter,
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

export const useGetStockAnalysisStat = ({ enabled = false }) => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["stock-analysis-stats"],
    queryFn: ({ symbol, period }) =>
      httpService.getData(routes.stockAnalysisStatsUrl(symbol, period)),
    enabled,
    retry: 1,
  });

  return {
    getStockAnalysisStatIsLoading: isLoading,
    getStockAnalysisStatData: data?.data?.result || [],
    getStockAnalysisStatFilter: filter,
    getStockAnalysisStatError: ErrorHandler(error),
    refetchGetStockAnalysisStat: refetch,
    setGetStockAnalysisStatFilter: setFilter,
  };
};
export const useGetStockInfoEod = ({
  enabled = false,
  queryKey = "stockInfo-Performance",
}) => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: [queryKey],
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
export const usePredictStock = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postData(payload, routes.stockAnalyzerUrlpredict()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data || {};
      handleSuccess(resData);
      showSuccessAlert("Stock prediction data fetched successfully.");
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    predictStockData: data?.data,
    predictStockError: ErrorHandler(error),
    predictStockIsLoading: isPending,
    predictStockPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};
