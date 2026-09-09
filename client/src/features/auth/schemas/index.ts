import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(5),
  email: z.string().email().trim(),
  password: z.string().min(8, "Password must be al least 8 characters"),
});

export const signinSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8, "Password must be al least 8 characters"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;