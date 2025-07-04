import { showErrorAlert, showSuccessAlert } from "@/utils/alert";
import { routes } from "../api-routes";
import { ErrorHandler } from "../errorHandler";
import httpService from "../httpService";
import useMutateItem from "../useMutateItem";
import useFetchItem from "../useFetchItem";

export const useTrendingAnalysis = (handleSuccess) => {
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

export const useGetBlogs = (page, limit) => {
  const { isLoading, error, data } = useFetchItem({
    queryKey: ["general-news", page, limit],
    queryFn: () => httpService.getData(routes.blog(page, limit)),
    enabled: true,
    retry: 1,
  });

  return {
    getBlogsData: data?.data?.result || [],
    getBlogsError: ErrorHandler(error),
    getBlogsIsLoading: isLoading,
  };
};

export const useGetPressRelease = (page, limit) => {
  const { isLoading, error, data } = useFetchItem({
    queryKey: ["press-release", page, limit],
    queryFn: () => httpService.getData(routes.pressRelease(page, limit)),
    enabled: true,
    retry: 1,
  });

  return {
    getPressReleaseData: data?.data?.result || [],
    getPressReleaseError: ErrorHandler(error),
    getPressReleaseIsLoading: isLoading,
  };
};

export const useGetStockNews = (symbol, page, limit) => {
  const { isLoading, error, data } = useFetchItem({
    queryKey: ["specific-stock-news", symbol, page, limit], // make queryKey dynamic
    queryFn: () => httpService.getData(routes.stockNews(symbol, page, limit)),
    enabled: true,
    retry: 1,
  });

  return {
    getBlogsData: data?.data?.result || [],
    getBlogsError: ErrorHandler(error),
    getBlogsIsLoading: isLoading,
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
      const resData = requestParams?.result || [];
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

export const useAddComment = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postData(payload, routes.addBlogComment()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data?.result;
      handleSuccess(resData);
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    addCommentData: data,
    addCommentDataError: ErrorHandler(error),
    addCommentIsLoading: isPending,
    addCommentPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useAddCommentReply = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postData(payload, routes.addBlogCommentReply()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data?.result;
      handleSuccess(resData);
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    addCommentReplyData: data,
    addCommentReplyDataError: ErrorHandler(error),
    addCommentReplyIsLoading: isPending,
    addCommentReplyPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useCommentLIkeUnlike = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postData(payload, routes.commentLikeUnlike()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data?.result;
      handleSuccess(resData);
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    likeUnlikeData: data,
    likeUnlikeError: ErrorHandler(error),
    likeUnlikeIsLoading: isPending,
    likeUnlikePayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useBlogLikeUnlike = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.postData(payload, routes.blogLikeUnlike()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data?.result;
      handleSuccess(resData);
    },
    onError: (error) => {
      showErrorAlert(error?.response?.data?.errorMessages[0]);
    },
  });

  return {
    likeUnlikeData: data,
    likeUnlikeError: ErrorHandler(error),
    likeUnlikeIsLoading: isPending,
    likeUnlikePayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useCreateBlog = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) => httpService.postData(payload, routes.createBlog()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data?.result || {};
      handleSuccess(resData);
    },
    onError: (error) => {
      showErrorAlert(
        error?.response?.data?.errorMessages[0] || "Error creating blog"
      );
    },
  });

  return {
    blogCreateData: data,
    blogCreateIsLoading: isPending,
    blogCreatePayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useDeleteBlog = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (id) => httpService.deleteData(routes.deleteBlog(id)),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data?.result || {};
      handleSuccess(resData);
      showSuccessAlert(resData);
    },
    onError: (error) => {
      showErrorAlert("Error deleting blog");
    },
  });

  return {
    deleteBlogData: data,
    // deleteBlogDataError: ErrorHandler(error),
    deleteBlogIsLoading: isPending,
    deleteBlogPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useUpdateBlog = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: ({ id, payload }) =>
      httpService.putData(payload, routes.updateBlog(id)),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data?.result || {};
      handleSuccess(resData);
    },
    onError: (error) => {
      showErrorAlert("Error updating blog!");
    },
  });

  return {
    updateBlogData: data,
    updateBlogDataError: ErrorHandler(error),
    updateBlogIsLoading: isPending,
    updateBlogPayload: ({ id, payload }) => mutateAsync({ id, payload }),
  };
};

export const useUpdateBlogStatus = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload) =>
      httpService.putData(payload, routes.updateBlogStatus()),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data?.result || {};
      handleSuccess(resData);
      showSuccessAlert(resData);
    },
    onError: (error) => {
      console.log(error);
      showErrorAlert("Error updating blog status!");
    },
  });

  return {
    updateBlogStatusData: data,
    updateBlogStatusIsLoading: isPending,
    updateBlogStatusPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};
