import { showErrorAlert, showSuccessAlert } from "@/utils/alert";
import { routes } from "../api-routes";
import { ErrorHandler } from "../errorHandler";
import httpService from "../httpService";
import useFetchItem from "../useFetchItem";
import useMutateItem from "../useMutateItem";
export const useGetChannel = () => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["get-channel"],
    queryFn: () => httpService.getData(routes.userCommunity()),
    retry: 1,
  });
  return {
    getChannelIsLoading: isLoading,
    getChannelData: data?.data?.result || [],
    getChannelError: ErrorHandler(error),
    refetchChannel: refetch,
    setChannelFilter: setFilter,
  };
};
export const useGetCategory = () => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["get-category"],
    queryFn: () => httpService.getData(routes.categoryUrl()),
    retry: 1,
  });
  return {
    getChannelCategoryIsLoading: isLoading,
    getChannelCategoryData: data?.data?.result || [],
    getChannelCategoryError: ErrorHandler(error),
    refetchChannelCategory: refetch,
    setChannelCategoryFilter: setFilter,
  };
};

export const useGetChannelMessages = ({ enabled = false }) => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["channel-messages"],
    queryFn: ({ roomid }) =>
      httpService.getData(routes.getChannelMessageUrl(roomid)),
    enabled,
    retry: 1,
  });

  return {
    getChannelMesaggesIsLoading: isLoading,
    getChannelMesaggesData: data?.data?.result || [],
    getChannelMesaggesFilter: filter,
    getChannelMesaggesError: ErrorHandler(error),
    refetchGetChannelMesagges: refetch,
    setGetChannelMesaggesFilter: setFilter,
  };
};

export const useGetCategoryChannelCount = () => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["get-category-channel-count"],
    queryFn: () => httpService.getData(routes.categoryChannelCountUrl()),
    retry: 1,
  });
  return {
    getChannelCategoryCountIsLoading: isLoading,
    getChannelCategoryCountData: data?.data?.result || [],
    getChannelCategoryCountError: ErrorHandler(error),
    refetchChannelCategoryCount: refetch,
    setChannelCategoryCountFilter: setFilter,
  };
};
export const useAddCategory = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postData(null, routes.addCommunityCategory(payload.category)),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data || {};
      handleSuccess(resData);
      showSuccessAlert("Category created successfully.");
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    categoryAddData: data?.data,
    categoryAddError: ErrorHandler(error),
    categoryAddIsLoading: isPending,
    categoryAddPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};
export const useAddChannel = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) => httpService.postData(payload, routes.addchannel()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data || {};
      handleSuccess(resData);
      showSuccessAlert("channel created successfully.");
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    channelAddData: data?.data,
    channelAddError: ErrorHandler(error),
    channelAddIsLoading: isPending,
    channelAddPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};
