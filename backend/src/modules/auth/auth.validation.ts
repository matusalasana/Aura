import { z } from 'zod';

export const registerSchema = z.object({
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  email: z.string().email().trim(),
  password: z.string().min(8, "Password must be al least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8, "Password must be al least 8 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;