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
export const useGetMyCurrentAlpha = ({ enabled = false }) => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["current-alpha"],
    queryFn: () => httpService.getData(routes.mycurrentAlphaUrl()),
    enabled,
    retry: 1,
  });

  return {
    getMyCurrentAlphaIsLoading: isLoading,
    getMyCurrentAlphaData: data?.data?.result || [],
    getMyCurrentAlphaFilter: filter,
    getMyCurrentAlphaError: ErrorHandler(error),
    refetchGetMyCurrentAlpha: refetch,
    setGetMyCurrentAlphaFilter: setFilter,
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

export const useGetIsWishListAdded = ({ enabled = false }) => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["get-wish-list-is-added"],
    queryFn: ({ symbol }) =>
      httpService.getData(routes.getStockWishListIsAddedUrl(symbol)),
    enabled,
    retry: 1,
  });

  return {
    getWishlistIsAddedIsLoading: isLoading,
    getWishlistIsAddedData: data?.data?.result || [],
    getWishlistIsAddedFilter: filter,
    getWishlistIsAddedError: ErrorHandler(error),
    refetchGetWishlistIsAdded: refetch,
    setWishlistIsAddedFilter: setFilter,
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
export const useGetStockAlphaStat = ({ enabled = false }) => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["stock-alpha-stats"],
    queryFn: ({ symbol, period }) =>
      httpService.getData(routes.stockAlphaStatsUrl(symbol, period)),
    enabled,
    retry: 1,
  });

  return {
    getStockAlphaStatIsLoading: isLoading,
    getStockAlphaStatData: data?.data?.result || [],
    getStockAlphaStatFilter: filter,
    getStockAlphaStatError: ErrorHandler(error),
    refetchGetStockAlphaStat: refetch,
    setGetStockAlphaStatFilter: setFilter,
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
export const useAddStockWishList = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postData(payload, routes.addStockWishListUrl()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data || {};
      handleSuccess(resData);
      showSuccessAlert("Stock added to wishlist successfully.");
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    wishListAddData: data?.data,
    wishListAddError: ErrorHandler(error),
    wishListAddIsLoading: isPending,
    wishListAddPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};
export const useAddMyPiller = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postData(payload, routes.addmyPillerUrl()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data || {};
      handleSuccess(resData);
      showSuccessAlert("Piller updated successfully.");
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    myAddPillerData: data?.data,
    myAddPillerError: ErrorHandler(error),
    myAddPillerIsLoading: isPending,
    myAddPillerPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};
