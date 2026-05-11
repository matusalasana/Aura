import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email().trim(),
  password_hash: z.string().min(8),
  full_name: z.string().min(3)
});

export const loginSchema = z.object({
  email: z.string().email().trim(),
  password_hash: z.string(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email().trim(),
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(8),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;