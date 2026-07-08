import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(5),
  email: z.string().email().trim(),
  password: z.string().min(8, "Password must be al least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8, "Password must be al least 8 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;