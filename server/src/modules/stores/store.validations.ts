import { z } from "zod";


const storeStatusEnum = z.enum([
  "pending",
  "active",
  "suspended",
]);

export const createStoreSchema = z.object({
  storeName: z
    .string()
    .min(2, "Store name must be at least 2 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  logo: z.string().min(1),

  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),

  status: storeStatusEnum,
  
  planId: z.uuid().min(1),
});


export const updateStoreSchema = createStoreSchema.partial()

export type CreateStoreInput = z.infer<typeof createStoreSchema>;

export type UpdateStoreInput = z.infer<typeof updateStoreSchema>;