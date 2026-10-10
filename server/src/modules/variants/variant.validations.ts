import { z } from "zod";

const variantSchema = z.object({
  size: z
    .string()
    .trim()
    .min(1, "Product size is required")
    .max(100, "Product size must be less than 100 characters"),

  color: z
    .string()
    .trim()
    .min(1, "Product color is required")
    .max(100, "Product color must be less than 100 characters"),

  price: z
    .number()
    .positive("Price must be greater than 0"),

  stock: z
    .number()
    .int("Stock quantity must be an integer")
    .min(0, "Stock quantity cannot be negative"),

  sku: z
    .string()
    .trim()
    .min(1, "SKU cannot be empty")
    .max(100, "SKU must be 100 characters or less"),
});

export const createVariantSchema = z.array(variantSchema);

export const updateVariantSchema = variantSchema.partial();

export type VariantInput = z.infer<typeof variantSchema>;
export type CreateVariantInput = z.infer<typeof createVariantSchema>;
export type UpdateVariantInput = z.infer<typeof updateVariantSchema>;