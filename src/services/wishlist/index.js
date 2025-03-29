import { showErrorAlert, showSuccessAlert } from "@/utils/alert";
import { routes } from "../api-routes";
import { ErrorHandler } from "../errorHandler";
import httpService from "../httpService";
import useFetchItem from "../useFetchItem";
import useMutateItem from "../useMutateItem";

export const useGetWishlist = () => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["wishlists"],
    queryFn: () => httpService.getData(routes.getWishlist()),
    retry: 1,
  });
  console.log(error);
  return {
    getWishlistIsLoading: isLoading,
    getWishlistData: data?.data?.result || [],
    // getWishlistError: ErrorHandler(error),
    refetchWishlist: refetch,
    setWishlistFilter: setFilter,
  };
};

export const useDeleteWishlist = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.deleteDataPayload(payload, routes.deleteWishlist()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data?.result || {};
      handleSuccess(resData);
      showSuccessAlert(resData);
    },
    onError: (error) => {
      console.log(error);
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    deleteWishlistData: data,
    deleteWishlistError: ErrorHandler(error),
    deleteWishlistIsLoading: isPending,
    deleteWishlistPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useUpdateWatchlist = (handleSuccess) => {
  const { data, error, isPending, mutate } = useMutateItem({
    mutationFn: (payload) =>
      httpService.putData(payload, routes.updateWishlist()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data;
      handleSuccess(resData);
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    updateWishlistData: data,
    updateWishError: ErrorHandler(error),
    updateWishlistIsLoading: isPending,
    updateWishlistPayload: (payload) => mutate(payload),
  };
};
