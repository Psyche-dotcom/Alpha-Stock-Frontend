import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email provided"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" }),
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
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" }),
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

export const resetPasswordSchema = z
  .object({
    email: z.string().email({ message: "Invalid email format" }),
    token: z.string().min(1, { message: "Token is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/\d/, { message: "Password must contain at least one number" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export const searchSchema = z.object({
  search: z.string(),
});

export type SearchSchemaType = z.infer<typeof searchSchema>;

export const confirmEmailSchema = z.object({
  email: z.string().email("Invalid email provided"),
  token: z.string(),
});

export type ConfirmEmailSchemaType = z.infer<typeof confirmEmailSchema>;

export const updateDetailsSchema = z.object({
  email: z.string().email("Invalid email provided"),
  firstName: z.string().min(3, { message: "Must be grester than 2 letters" }),
  lastName: z.string().min(3, { message: "Must be grester than 2 letters" }),
  userName: z.string().min(3, { message: "Must be grester than 2 letters" }),
  phoneNumber: z.string().min(6, { message: "Must be grester than 2 letters" }),
  country: z.string(),
});

export type UpdateSchemaType = z.infer<typeof updateDetailsSchema>;
