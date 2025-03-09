"use client";
import { routes } from "../api-routes";
import httpService from "../httpService";
import { ErrorHandler } from "../errorHandler";
import useMutateItem from "../useMutateItem";
import { showErrorAlert, showSuccessAlert } from "@/utils/alert";
import Storage from "@/utils/storage";

export const useLogin = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postDataWithoutToken(payload, routes.login()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data?.result || {};
      handleSuccess(resData);
      Storage.set("token", requestParams?.data?.result?.jwt);
      Storage.set("role", requestParams?.data?.result?.userRole[0] || "");
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
      alert("Is this called again");
    },
  });

  return {
    loginData: data,
    loginDataError: ErrorHandler(error),
    loginIsLoading: isPending,
    loginPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useSignup = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postDataWithoutToken(payload, routes.signup()),
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
    signupData: data,
    signupDataError: ErrorHandler(error),
    signupIsLoading: isPending,
    signupPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useForgotPassword = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: ({ email }) =>
      httpService.postDataWithoutToken({}, routes.forgotPassword(email)),
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
    forgotPasswordData: data,
    forgotPasswordDataError: ErrorHandler(error),
    forgotPasswordIsLoading: isPending,
    forgotPasswordPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useResetPassword = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postDataWithoutToken(payload, routes.resetPassword()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data?.result || {};
      handleSuccess(resData);
      console.log(requestParams);
      showSuccessAlert(resData);
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    resetPasswordData: data,
    resetPasswordDataError: ErrorHandler(error),
    resetPasswordIsLoading: isPending,
    resetPasswordPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useConfirmEmail = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postDataWithoutToken(payload, routes.confirmEmail()),
    onSuccess: (requestParams) => {
      handleSuccess(requestParams);
      showSuccessAlert(requestParams);
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    confirmEmailData: data,
    confirmEmailDataError: ErrorHandler(error),
    confirmEmailIsLoading: isPending,
    confirmEmailPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};
