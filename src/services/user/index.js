import { showErrorAlert, showSuccessAlert } from "@/utils/alert";
import { routes } from "../api-routes";
import { ErrorHandler } from "../errorHandler";
import httpService from "../httpService";
import useFetchItem from "../useFetchItem";
import useMutateItem from "../useMutateItem";

export const useGetUsers = ({ enabled = false }) => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["fetchUsers"],
    queryFn: ({ page_number, per_page_size, params }) =>
      httpService.getData(
        routes.getAllUsers(page_number, per_page_size, params)
      ),
    enabled,
    retry: 1,
  });

  return {
    getUsersIsLoading: isLoading,
    getUsersData: data?.data?.result || [],
    getUsersFilter: filter,
    getUsersError: ErrorHandler(error),
    refetchUsers: refetch,
    setUsersFilter: setFilter,
  };
};

export const useSuspendUser = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: ({ email }) =>
      httpService.postData({}, routes.suspendUser(email)),
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
    suspendUserData: data,
    suspendUserDataError: ErrorHandler(error),
    suspendUserIsLoading: isPending,
    suspendUserPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useUnsuspendUser = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: ({ email }) =>
      httpService.postData({}, routes.unSuspendUser(email)),
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
    unSuspendUserData: data,
    unSuspendUserDataError: ErrorHandler(error),
    unSuspendUserIsLoading: isPending,
    unSuspendUserPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useDeleteUser = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (email) => httpService.deleteData(routes.deleteUser(email)),
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
    deleteUserData: data,
    deleteUserDataError: ErrorHandler(error),
    deleteUserIsLoading: isPending,
    deleteUserPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useGetUsersStats = () => {
  const { isFetched, isLoading, error, data, refetch, isFetching, setFilter } =
    useFetchItem({
      queryKey: ["userstats"],
      queryFn: () => {
        return httpService.getData(routes.userStats());
      },
      retry: 2,
    });
  return {
    isUserStatsFetching: isFetching,
    isUserStatsLoading: isLoading,
    userStatsData: data?.data?.result || {},
    userStatsError: ErrorHandler(error),
    refetchUserStatsData: refetch,
  };
};

export const useUploadUserProfile = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: ({ email, file }) =>
      httpService.uploadProfile(file, routes.updateUserProfile(email)),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data?.result || {};
      handleSuccess(resData);
    },
    onError: (error) => {
      showErrorAlert("Error uploading file");
    },
  });

  return {
    uploadData: data,
    uploadIsLoading: isPending,
    uploadFile: (file, email) => mutateAsync({ file, email }),
  };
};
