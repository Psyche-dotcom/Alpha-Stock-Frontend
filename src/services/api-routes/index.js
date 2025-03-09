export const routes = {
  login: () => "/api/user/login",
  signup: () => "/api/user/register",
  forgotPassword: (email) => `/api/user/forgot_password?email=${email}`,
  resetPassword: () => "/api/user/reset_password",
  confirmEmail: () => "/api/user/confirm-email",
  profile: () => "/api/user/info",
  updateProfile: (email) => `/api/user/update_details/${email}`,
};
