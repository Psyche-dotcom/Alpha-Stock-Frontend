import { routes } from "../api-routes";
import { ErrorHandler } from "../errorHandler";
import useFetchItem from "../useFetchItem";
import httpService from "../httpService";
import useMutateItem from "../useMutateItem";

export const useGetProfile = ({ enabled = true }) => {
  const { isFetched, isLoading, error, data, refetch, isFetching, setFilter } =
    useFetchItem({
      queryKey: ["profile"],
      queryFn: () => {
        return httpService.getData(routes.profile());
      },
      enabled,
      retry: 2,
    });
  return {
    isProfileFetching: isFetching,
    isProfileLoading: isLoading,
    profileData: data?.data || {},
    profileError: ErrorHandler(error),
    refetchProfileData: refetch,
  };
};

export const useUpdateProfile = (handleSuccess) => {
  const { data, error, isPending, mutate } = useMutateItem({
    mutationFn: ({ payload, email }) =>
      httpService.patchData(payload, routes.updateProfile(email)),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data;
      handleSuccess(resData);
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    updateProfileData: data,
    // updateProfileError: ErrorHandler(error),
    updateProfileIsLoading: isPending,
    updateProfilePayload: ({ payload, email }) => mutate({ payload, email }),
  };
};
