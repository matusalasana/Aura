import { z } from "zod";

export const productTypeSchema = z.enum([
  "simple",
  "variant",
]);

export const productStatusSchema = z.enum([
  "draft",
  "active",
  "archived",
]);

export const basicInfoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Product name is required")
    .max(255, "Product name must not be greater than 255 characters"),

  slug: z
    .string()
    .trim()
    .min(1, "Product slug is required")
    .max(255, "Product slug must not be greater than 255 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    ),

  description: z
    .string()
    .trim()
    .max(5000, "Description must not be greater than 5000 characters")
    .optional(),

  type: productTypeSchema,
});

export const inventoryInfoSchema = z.object({
  price: z
    .number()
    .positive("Price must be greater than 0")
    .optional(),

  stock: z
    .number()
    .int("Stock quantity must be an integer")
    .min(0, "Stock quantity cannot be negative")
    .optional(),

  sku: z
    .string()
    .trim()
    .max(100, "SKU must be 100 characters or less")
    .optional(),

  status: productStatusSchema.optional(),
});

/* Combined schema */
export const createProductSchema = basicInfoSchema.merge(
  inventoryInfoSchema,
);

/* Update */
export const updateProductSchema = createProductSchema.partial();

/* Types */
export type BasicInfoData = z.infer<typeof basicInfoSchema>;

export type InventoryInfoData = z.infer<
  typeof inventoryInfoSchema
>;

export type CreateProductInput = z.infer<
  typeof createProductSchema
>;

export type UpdateProductInput = z.infer<
  typeof updateProductSchema
>;