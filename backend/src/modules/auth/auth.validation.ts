import { z } from 'zod';


const RoleEnum = z.enum([
  "customer", "vendor", "admin", "support"
]);

const TypeEnum = z.enum([
  "verify_email", "reset_password"
]);



export const registerSchema = z.object({
  name: z.string().min(5),
  email: z.string().email().trim(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email().trim(),
  otp: z.string().min(6),
  password: z.string().min(8, "Password must be al least 8 characters"),
});

export const resendOTPSchema = z.object({
  email: z.string().email().trim(),
  type: TypeEnum,
});




export type RegisterInput = z.infer<typeof registerSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;