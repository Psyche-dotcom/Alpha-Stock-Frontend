export const routes = {
  login: () => "/api/user/login",
  socialLogin: () => "/api/user/social/login",
  signup: () => "/api/user/register",
  forgotPassword: (email) => `/api/user/forgot_password?email=${email}`,
  resetPassword: () => "/api/user/reset_password",
  confirmEmail: () => "/api/user/confirm-email",
  profile: () => "/api/user/info",
  retrievePlans: () => "/api/subscription/retrieve/all",
  updateProfile: (email) => `/api/user/update_details/${email}`,
  blog: (page, limit) => `/api/stock/news/general?page=${page}&limit=${limit}`,
  pressRelease: (page, limit) => `/api/stock/news/general/press_release?page=${page}&limit=${limit}`,
  stockNews: (symbol, page, limit) =>
    `/api/stock/news/specific_stock_news?symbol=${symbol}&page=${page}&limit=${limit}`,
  createBlog: () => "/api/blog/create",
  getSingleBlog: () => "/api/blog/post/retrieve/single",
  deleteBlog: (id) => `/api/blog/delete/${id}`,
  updateBlog: (id) => `/api/blog/update/${id}`,
  updateBlogStatus: () => `/api/blog/admin/update/blogstatus`,
  getSingleBlogComments: () => "/api/blog/comment/retrieve/all",
  getSingleBlogCommentsComment: () => "/api/blog/comment/reply/retrieve/all",
  getAllUsers: (page_number, per_page_size, data) => {
    const params = new URLSearchParams(data);
    return `/api/all/${per_page_size}/${page_number}?${params}`;
  },
  suspendUser: (email) => `/api/admin/suspend_user/${email}`,
  buyPlan: (planid) => `/api/payment/create/buy_plan?plainid=${planid}`,
  buyPlanStripe: (planid) =>
    `/api/payment/stripe/create/buy_plan?plainid=${planid}`,
  unSuspendUser: (email) => `/api/admin/unsuspend_user/${email}`,
  deleteUser: (email) => `/api/user/delete_user/${email}`,
  getSubscriptions: () => "/api/subscription/retrieve/all",
  getSubscription: (id) => `/api/subscription/info/${id}`,
  confirmSubscription: (token) =>
    `/api/payment/webhook/confirm-payment?token=${token}`,
  confirmStripeSubscription: (token) =>
    `/api/payment/webhook/stripe/confirm-payment?session_id=${token}`,
  Alpha8PillerScreener: (symbol) =>
    `/api/stock/alpha-8-piller-screener?symbol=${symbol}&period=annual`,
  getStockInfo: (symbol) => `/api/stock/info/profile?symbol=${symbol}`,
  getStockInfoEod: (symbol, startdate, endDate) =>
    `/api/stock/historical/eod?symbol=${symbol}&startDate=${startdate}&endDate=${endDate}`,
  getStockIncomeStatementUrl: (symbol, period) =>
    `/api/stock/income-statement?symbol=${symbol}&period=${period}&duration=10`,
  // TTM Endpoints
  getStockIncomeStatementTTMUrl: (symbol) =>
    `/api/stock/income-statement-ttm?symbol=${symbol}&duration=10`,
  getStockBalanceSheetTTMUrl: (symbol) =>
    `/api/stock/balance-sheet-ttm?symbol=${symbol}&duration=10`,
  getStockCashFlowTTMUrl: (symbol) =>
    `/api/stock/cash-flow-ttm?symbol=${symbol}&duration=10`,
  getStockMetricsUrl: (symbol, period) =>
    `/api/stock/fundamental-metric?symbol=${symbol}&period=${period}`,
  getStockWishListIsAddedUrl: (symbol) =>
    `/api/stock/get-wishlist-is-added?symbol=${symbol}`,
  balanceSheetUrl: (symbol, period) =>
    `/api/stock/balance-sheet?symbol=${symbol}&period=${period}&duration=10`,
  cashFlowUrl: (symbol, period) =>
    `/api/stock/cash-flow?symbol=${symbol}&period=${period}&duration=10`,
  stockAnalysisStatsUrl: (symbol, period) =>
    `/api/stock/stock-analyer-stats?symbol=${symbol}&period=${period}`,
  stockAlphaStatsUrl: (symbol, period) =>
    `/api/stock/stock-alpha-stats?symbol=${symbol}&period=${period}`,
  createSubscription: () => `/api/subscription/create`,
  stockAnalyzerUrlpredict: () => `/api/stock/stock-analyer-stats/predict`,
  addStockWishListUrl: () => `/api/stock/add-wishlist`,
  editSubscription: () => `/api/subscription/update`,
  mycurrentAlphaUrl: () => `/api/stock/mypiller/current`,
  addBlogComment: () => `/api/blog/comment/add`,
  addBlogCommentReply: () => `/api/blog/comment/reply/add`,
  commentLikeUnlike: () => `/api/blog/comment/like_unlike`,
  blogLikeUnlike: () => `/api/payment/user/all`,
  getUserPayment: (perPageSize, pageNumber, user_id) =>
    `/api/payment/user/all/${user_id}/${perPageSize}/${pageNumber}`,
  getAllPayments: (perPageSize, pageNumber) =>
    `/api/payment/user/all/${perPageSize}/${pageNumber}`,
  getCompanies: (symbol) => `/api/stock/search?symbol=${symbol}`,
  getWishlist: () => "/api/stock/get-wishlist",
  deleteWishlist: () => "/api/stock/delete-wishlist",
  updateWishlist: () => "/api/stock/update-wishlist",
  addmyPillerUrl: () => "/api/stock/mypiller/update",
  userStats: () => "/api/admin/userstats",
  userCommunity: () => "/api/community/retrieve/user/channel",
  addchannel: () => "/api/community/create/channel",
  addSavedMessage: () => "/api/community/channel/message/saved",
  addCommunityCategory: (catName) =>
    `/api/community/create/category?CategoryName=${catName}`,
  getChannelMessageUrl: (roomid) =>
    `/api/community/channel/messages/all?RoomId=${roomid}`,
  getChannelMessageReplyUrl: (messid) =>
    `/api/community/channel/message/reply?messageid=${messid}`,
  categoryUrl: () => "/api/community/retrieve/category/all",
  categoryChannelCountUrl: () =>
    "/api/community/retrieve/category/channel/messages",
  uploadPicture: () => "/api/blog/upload/picture",
  updateUserProfile: (email) => `/api/user/update_picture/${email}`,
  communityCommentDownvoteUnDownvote: () =>
    `/api/community/channel/message/unlike`,
  communityCommentLikeUnlike: () => `/api/community/channel/message/like`,
  savedMessages: () => `/api/community/channel/message/fav`,
};
