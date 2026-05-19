import { z } from "zod"

export const createCategoriesSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  image_url: z.string().min(1, "Category image is required"),
});

export type CreateCategoriesInput = z.infer<typeof createCategoriesSchema>;