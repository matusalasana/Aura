import { z } from "zod"

export const createCategorySchema = z.object({
  name: z.string().min(2),
  image_url: z.string().min(1, "Category image is required"),
});

export const updateCategorySchema = z.object({
  name: z.string(). optional(),
  image_url: z.string().optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;