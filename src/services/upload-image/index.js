"use client";
import { routes } from "../api-routes";
import httpService from "../httpService";
import { ErrorHandler } from "../errorHandler";
import useMutateItem from "../useMutateItem";

export const useUploadFile = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.uploadFile(payload, routes.uploadPicture()),
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
    uploadFile: (file, fileName) => mutateAsync({ file, fileName }),
  };
};

