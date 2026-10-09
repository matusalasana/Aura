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
    .max(
      255,
      "Product name must not be greater than 255 characters",
    ),

  slug: z
    .string()
    .trim()
    .min(1, "Product slug is required")
    .max(
      255,
      "Product slug must not be greater than 255 characters",
    )
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    ),

  images: z.array(z.instanceof(File)).max(10),

  description: z
    .string()
    .trim()
    .max(
      5000,
      "Description must not be greater than 5000 characters",
    )
    .optional(),

  type: productTypeSchema,
});


export const inventoryInfoSchema = z.object({
  price: z
    .string()
    .regex(/^\d+(?:\.\d{1,2})?$/, "Price must be a valid amount"),
    

  stock: z
    .number()
    .int("Stock quantity must be an integer")
    .min(
      1,
      "Stock quantity cannot be negative",
    ),

  sku: z
    .string()
    .trim()
    .min(1, "SKU cannot be empty")
    .max(
      100,
      "SKU must be 100 characters or less",
    )
    .optional(),

  status: productStatusSchema.optional(),
});


export const variantsSchema = z.object({

  price: z
    .string()
    .regex(/^\d+(?:\.\d{1,2})?$/, "Price must be a valid amount"),
  
  size: z
    .string()
    .trim()
    .min(1, "Product size is required")
    .max(
      100,
      "Product size must be less than 100 characters",
    ),

  color: z
    .string()
    .trim()
    .min(1, "Product color is required")
    .max(
      100,
      "Product color must be less than 100 characters",
    ),
    

  stock: z
    .number()
    .int("Stock quantity must be an integer")
    .min(
      1,
      "Stock quantity cannot be negative",
    ),

  sku: z
    .string()
    .trim()
    .min(1, "SKU cannot be empty")
    .max(
      100,
      "SKU must be 100 characters or less",
    ),
});




export type BasicInfoData = z.infer<
  typeof basicInfoSchema
>;

export type InventoryInfoData = z.infer<
  typeof inventoryInfoSchema
>;

export type VariantsData = z.infer<
  typeof variantsSchema
>;