import { z } from 'zod';



export const registerSchema = z.object({
  first_name: z.string().min(3, "Too short"),
  last_name: z.string().min(3, "Too short"),
  email: z.string().email(),
  password: z.string().min(8, "Must be at least 8 digits"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Must be at least 8 digits"),
});



export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;