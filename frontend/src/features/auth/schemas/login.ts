import { z } from 'zod';


export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Must be at least 8 digits"),
});


export type LoginInput = z.infer<typeof loginSchema>;