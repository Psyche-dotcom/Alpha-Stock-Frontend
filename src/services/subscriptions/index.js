import { showErrorAlert, showSuccessAlert } from "@/utils/alert";
import { routes } from "../api-routes";
import { ErrorHandler } from "../errorHandler";
import httpService from "../httpService";
import useFetchItem from "../useFetchItem";

export const useGetSubscriptions = ({ enabled = false }) => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["fetchSubscriptions"],
    queryFn: () => httpService.getData(routes.getSubscriptions()),
    enabled,
    retry: 1,
  });

  return {
    getSubscriptionsIsLoading: isLoading,
    getSubscriptionsData: data?.data?.result || [],
    getSubscriptionsFilter: filter,
    getSubscriptionsError: ErrorHandler(error),
    refetchSubscriptions: refetch,
    setSubscriptionsFilter: setFilter,
  };
};

export const useGetSubscription = ({ enabled = false }) => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["fetchSubscription"],
    queryFn: ({ id }) => httpService.getData(routes.getSubscription(id)),
    enabled,
    retry: 1,
  });

  return {
    getSubscriptionIsLoading: isLoading,
    getSubscriptionData: data?.data?.result || [],
    getSubscriptionFilter: filter,
    getSubscriptionError: ErrorHandler(error),
    refetchSubscription: refetch,
    setSubscriptionFilter: setFilter,
  };
};

export const useCreateSubscription = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postData(payload, routes.createSubscription()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data?.result || {};
      handleSuccess(resData);
      showSuccessAlert(resData);
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    createSubscriptionData: data,
    createSubscriptionError: ErrorHandler(error),
    createSubscriptionIsLoading: isPending,
    createSubscriptionPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};
