import { z } from "zod";

export const storeSignupSchema = z.object({
  storeName: z
    .string()
    .min(2, "Store name must be at least 2 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),

  plan: z.enum(["starter", "pro", "enterprise"]),
});

export type FormData = z.infer<typeof storeSignupSchema>;