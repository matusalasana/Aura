import { z } from "zod"


export const basicInfoSchema = z.object({
  id: z.string().uuid().optional(),
  category_id: z.string().min(1, "category is required"),
  name: z.string().min(2),
  description: z.string().min(15, "Too short"),
  is_featured: z.boolean().optional(),
  is_bestseller: z.boolean().optional(),
});

export const variantsSchema = z.object({
  color: z.string().min(1, "Color is required"),
  size: z.string().min(1, "Size is required"),
  price: z.number().positive().min(100, "Price must be greater than 100 ETB"),
  stock_quantity: z.number().int().nonnegative().min(1, "minimum stock quantity is one"),
});

export const imagesUploadSchema = z.object({
  product_id: z.string().uuid().optional(),
  url: z.string().min(1, "Image is required"),
});

export type BasicInfoInput = z.infer<typeof basicInfoSchema>;
export type VariantsInput = z.infer<typeof variantsSchema>;
export type ImageUploadSchema = z.infer<typeof imagesUploadSchema>;