export const ErrorHandler = (error, useMessage = false) => {
  if (!error) return;
  let message = "";
  let defaultMessage = "Something went wrong, try again please.";
  console.log(error);
  if (error?.response) {
    if (error?.response?.status > 500 && error?.response?.status < 600) {
      message = defaultMessage;
    } else {
      message = error?.response?.data?.errors
        ? Object.values(error?.response?.data?.errors)?.[0]?.[0]
        : error?.response?.data?.validationMessages?.[0] ||
          error?.response?.data?.userMessage ||
          error?.response?.data?.message ||
          error?.response?.message ||
          error?.message ||
          error?.response?.data?.Message ||
          error?.response?.data?.responseDescription ||
          error?.response?.data?.error ||
          error?.response?.data?.title ||
          error?.response?.data?.errorMessages[0] ||
          defaultMessage;
      if (useMessage) {
        message = error.response.data.message || error.response.data.Message;
      }
    }
  } else if (error?.request) {
    message = error?.message;
  } else {
    message = error?.message;
  }
  return message;
};
