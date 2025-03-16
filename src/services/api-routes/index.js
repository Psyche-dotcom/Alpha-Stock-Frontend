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
};
