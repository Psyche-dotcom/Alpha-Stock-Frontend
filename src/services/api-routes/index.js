export const routes = {
  login: () => "/api/user/login",
  signup: () => "/api/user/register",
  forgotPassword: (email) => `/api/user/forgot_password?email=${email}`,
  resetPassword: () => "/api/user/reset_password",
  confirmEmail: () => "/api/user/confirm-email",
  profile: () => "/api/user/info",
  retrievePlans: () => "/api/subscription/retrieve/all",
  updateProfile: (email) => `/api/user/update_details/${email}`,
  blog: () => "/api/blog/post/retrieve/all",
  getSingleBlog: () => "/api/blog/post/retrieve/single",
  getSingleBlogComments: () => "/api/blog/comment/retrieve/all",
  getSingleBlogCommentsComment: () => "/api/blog/comment/reply/retrieve/all",
  getAllUsers: (page_number, per_page_size, data) => {
    const params = new URLSearchParams(data);
    return `/api/all/${per_page_size}/${page_number}?${params}`;
  },
  suspendUser: (email) => `/api/admin/suspend_user/${email}`,
  buyPlan: (planid) => `/api/payment/create/buy_plan?plainid=${planid}`,
  unSuspendUser: (email) => `/api/admin/unsuspend_user/${email}`,
  deleteUser: (email) => `/api/user/delete_user/${email}`,
  getSubscriptions: () => "/api/subscription/retrieve/all",
  getSubscription: (id) => `/api/subscription/info/${id}`,
  confirmSubscription: (token) =>
    `/api/payment/webhook/confirm-payment?token=${token}`,
  getStockInfo: (symbol) => `/api/stock/info/profile?symbol=${symbol}`,
  getStockInfoEod: (symbol, startdate, endDate) =>
    `/api/stock/historical/eod?symbol=${symbol}&startDate=${startdate}&endDate=${endDate}`,
  getStockIncomeStatementUrl: (symbol, period) =>
    `/api/stock/income-statement?symbol=${symbol}&period=${period}`,
  getStockMetricsUrl: (symbol, period) =>
    `/api/stock/fundamental-metric?symbol=${symbol}&period=${period}`,
  balanceSheetUrl: (symbol, period) =>
    `/api/stock/balance-sheet?symbol=${symbol}&period=${period}`,
  cashFlowUrl: (symbol, period) =>
    `/api/stock/cash-flow?symbol=${symbol}&period=${period}`,
  stockAnalysisStatsUrl: (symbol, period) =>
    `/api/stock/stock-analyer-stats?symbol=${symbol}&period=${period}`,
  createSubscription: () => `/api/subscription/create`,
  editSubscription: () => `/api/subscription/update`,
  addBlogComment: () => `/api/blog/comment/add`,
  addBlogCommentReply: () => `/api/blog/comment/reply/add`,
  commentLikeUnlike: () => `/api/blog/comment/like_unlike`,
  blogLikeUnlike: () => `/api/payment/user/all`,
  getUserPayment: (perPageSize, pageNumber, user_id) =>
    `/api/payment/user/all/${user_id}/${perPageSize}/${pageNumber}`,
  getAllPayments: (perPageSize, pageNumber) =>
    `/api/payment/user/all/${perPageSize}/${pageNumber}`,
  getCompanies: () =>
    `https://financialmodelingprep.com/stable/stock-list?apikey=${process.env.NEXT_PUBLIC_API_KEY}`,
  getWishlist: () => "/api/stock/get-wishlist",
  deleteWishlist: () => "/api/stock/delete-wishlist",
  updateWishlist: () => "/api/stock/update-wishlist",
};
