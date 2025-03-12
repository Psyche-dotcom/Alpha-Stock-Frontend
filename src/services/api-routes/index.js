export const routes = {
  login: () => "/api/user/login",
  signup: () => "/api/user/register",
  forgotPassword: (email) => `/api/user/forgot_password?email=${email}`,
  resetPassword: () => "/api/user/reset_password",
  confirmEmail: () => "/api/user/confirm-email",
  profile: () => "/api/user/info",
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
  unSuspendUser: (email) => `/api/admin/unsuspend_user/${email}`,
  deleteUser: (email) => `/api/user/delete_user/${email}`,
  getSubscriptions: () => "/api/subscription/retrieve/all",
  getSubscription: (id) => `/api/subscription/info/${id}`,
  createSubscription: () => `/api/subscription/create`,
};
