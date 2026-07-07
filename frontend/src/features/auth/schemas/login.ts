import { z } from 'zod';


export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password_hash: z.string().min(8, "Password must be al least 8 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;