import { routes } from "../api-routes";
import { ErrorHandler } from "../errorHandler";
import httpService from "../httpService";
import useMutateItem from "../useMutateItem";

export const useTrendingAnalysis = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postDataWithoutToken(payload, routes.blog()),
    onSuccess: (requestParams) => {
      console.log(requestParams);
      const resData = requestParams?.result?.result || [];
      handleSuccess(resData);
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    getTrendingData: data?.data?.result?.result || [],
    getTrendingError: ErrorHandler(error),
    getTrendingIsLoading: isPending,
    trendPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useAboutMarket = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postDataWithoutToken(payload, routes.blog()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.result?.result || [];
      handleSuccess(resData);
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    getAboutMarketData: data?.data?.result?.result || [],
    getAboutMarketError: ErrorHandler(error),
    getAboutMarketIsLoading: isPending,
    aboutMarketPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useGetBlogs = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postDataWithoutToken(payload, routes.blog()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.result || {};
      handleSuccess(resData);
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    getBlogsData: data?.data?.result || {},
    getBlogsError: ErrorHandler(error),
    getBlogsIsLoading: isPending,
    getBlogsPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useGetBlog = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postDataWithoutToken(payload, routes.getSingleBlog()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.result || {};
      handleSuccess(resData);
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    getBlogData: data?.data?.result || {},
    getBlogError: ErrorHandler(error),
    getBlogIsLoading: isPending,
    getBlogPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useGetBlogComments = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postDataWithoutToken(payload, routes.getSingleBlogComments()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.result || {};
      handleSuccess(resData);
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    getBlogCommentsData: data?.data?.result || {},
    getBlogCommentsError: ErrorHandler(error),
    getBlogCommentsIsLoading: isPending,
    getBlogCommentsPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useGetBlogCommentsComment = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postDataWithoutToken(
        payload,
        routes.getSingleBlogCommentsComment()
      ),
    onSuccess: (requestParams) => {
      const resData = requestParams?.result || {};
      handleSuccess(resData);
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    getBlogCommentsCommentData: data?.data?.result || {},
    getBlogCommentsCommentError: ErrorHandler(error),
    getBlogCommentsCommentIsLoading: isPending,
    getBlogCommentsCommentPayload: (requestPayload) =>
      mutateAsync(requestPayload),
  };
};
