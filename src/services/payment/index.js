import { routes } from "../api-routes";
import { ErrorHandler } from "../errorHandler";
import useFetchItem from "../useFetchItem";
import httpService from "../httpService";

export const useGetPayment = ({ enabled = true }) => {
  const { isLoading, error, data, refetch, isFetching, setFilter } =
    useFetchItem({
      queryKey: ["payment"],
      queryFn: ({ perPageSize, pageNumber, user_id }) => {
        return httpService.getData(
          routes.getUserPayment(perPageSize, pageNumber, user_id)
        );
      },
      enabled,
      retry: 2,
    });
  return {
    isPaymentLoading: isLoading,
    paymentData: data?.data?.result || [],
    paymentError: ErrorHandler(error),
    refetchPaymentData: refetch,
    setPaymentFilter: setFilter,
  };
};

export const useGetAllPayments = ({ enabled = true }) => {
  const { isLoading, error, data, refetch, setFilter } = useFetchItem({
    queryKey: ["allPayment"],
    queryFn: ({ perPageSize, pageNumber }) => {
      return httpService.getData(
        routes.getAllPayments(perPageSize, pageNumber)
      );
    },
    enabled,
    retry: 2,
  });
  return {
    isPaymentLoading: isLoading,
    paymentData: data?.data?.result || [],
    paymentError: ErrorHandler(error),
    refetchPaymentData: refetch,
    setPaymentFilter: setFilter,
  };
};
