import { z } from "zod"


export const basicInfoSchema = z.object({
  id: z.string().uuid().optional(),
  category_id: z.string().uuid().min(1, "category is required"),
  name: z.string().min(2),
  description: z.string(),
  is_featured: z.boolean().optional(),
  is_bestseller: z.boolean().optional(),
});

export const variantsSchema = z.object({
  product_id: z.string().uuid().optional(),
  color: z.string().min(1, "Color is required"),
  size: z.string().min(1, "Size is required"),
  price: z.number().positive().min(100, "Amount must be greater than 100 ETB"),
  stock_quantity: z.number().int().nonnegative(),
  sku: z.string().min(1, "sku is required")
});

export const imagesUploadSchema = z.object({
  product_id: z.string().uuid().optional(),
  url: z.string().min(1, "Image is required"),
});



export type BasicInfoInput = z.infer<typeof basicInfoSchema>;
export type VariantsInput = z.infer<typeof variantsSchema>;
export type ImageUploadSchema = z.infer<typeof imagesUploadSchema>;