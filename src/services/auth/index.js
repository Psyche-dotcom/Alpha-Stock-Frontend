"use client";
import { routes } from "../api-routes";
import httpService from "../httpService";
// import { ErrorHandler } from "../errorHandler";
import useMutateItem from "../useMutateItem";

export const useLogin = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postDataWithoutToken(payload, routes.login()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data?.result || {};
      handleSuccess(resData);
      console.log(requestParams);
    },
  });

  return {
    loginData: data,
    // loginDataError: ErrorHandler(error),
    loginIsLoading: isPending,
    loginPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};
