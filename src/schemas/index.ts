import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email provided"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  fullname: z
    .string()
    .min(3, { message: "Fullname must be at least 3 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email("Invalid email provided"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  phonenumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Invalid phone number format",
  }),
  country: z.string({
    required_error: "Please select a country.",
  }),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email provided"),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  newpassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmpassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export const searchSchema = z.object({
  search: z.string(),
});

export type SearchSchemaType = z.infer<typeof searchSchema>;
