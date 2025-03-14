import { showErrorAlert, showSuccessAlert } from "@/utils/alert";
import { routes } from "../api-routes";
import { ErrorHandler } from "../errorHandler";
import httpService from "../httpService";
import useFetchItem from "../useFetchItem";
import useMutateItem from "../useMutateItem";

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
export const useConfirmSubscriptionsPayment = ({ enabled = false }) => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["confirmSubscriptions"],
    queryFn: ({ token }) =>
      httpService.getData(routes.confirmSubscription(token)),
    enabled,
    retry: 1,
  });

  return {
    confirmSubscriptionsIsLoading: isLoading,
    confirmSubscriptionsData: data?.data || [],
    confirmSubscriptionsFilter: filter,
    confirmSubscriptionsError: ErrorHandler(error),
    refetchConfirmSubscriptions: refetch,
    setConfirmSubscriptionsFilter: setFilter,
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

export const useEditSubscription = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.putData(payload, routes.editSubscription()),
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
    editSubscriptionData: data,
    editSubscriptionError: ErrorHandler(error),
    editSubscriptionIsLoading: isPending,
    editSubscriptionPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};
export const useBuySubscription = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postData(payload, routes.buyPlan(payload.Id)),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data?.result || {};
      handleSuccess(resData);
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    buySubscriptionData: data,
    buySubscriptionError: ErrorHandler(error),
    buySubscriptionIsLoading: isPending,
    buySubscriptionPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};
