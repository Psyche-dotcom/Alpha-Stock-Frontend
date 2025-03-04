import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email provided"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters" }),
  lastName: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters" }),
  userName: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email("Invalid email provided"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  phoneNumber: z.string().regex(/^\+?[0-9]{6,15}$/, {
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
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  email: z.string().email(),
  token: z.string(),
});

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export const searchSchema = z.object({
  search: z.string(),
});

export type SearchSchemaType = z.infer<typeof searchSchema>;
