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
    .number()
    .positive()
    .min(1, "Price is required"),
    

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
  
  price: z
    .number()
    .positive()
    .min(1, "Price is required"),
    

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






const baseProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Product name is required")
    .max(
      255,
      "Product name must be 255 characters or less",
    ),

  slug: z
    .string()
    .trim()
    .min(1, "Product slug is required")
    .max(
      255,
      "Product slug must be 255 characters or less",
    )
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    ),

  description: z
    .string()
    .trim()
    .max(
      5000,
      "Description must be 5000 characters or less",
    )
    .optional(),

  type: productTypeSchema,

  price: z
    .string()
    .regex(
      /^\d+(?:\.\d{1,2})?$/,
      "Price must be a valid amount",
    )
    .optional(),

  stockQuantity: z
    .number()
    .int("Stock quantity must be an integer")
    .min(
      0,
      "Stock quantity cannot be negative",
    )
    .optional(),

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

export const createProductSchema =
  z.discriminatedUnion("type", [
    baseProductSchema.extend({
      type: z.literal("simple"),

      price: z
        .string()
        .regex(
          /^\d+(?:\.\d{1,2})?$/,
          "Price must be a valid amount",
        ),

      stockQuantity: z
        .number()
        .int("Stock quantity must be an integer")
        .min(
          0,
          "Stock quantity cannot be negative",
        ),

      sku: z
        .string()
        .trim()
        .min(1, "SKU is required")
        .max(
          100,
          "SKU must be 100 characters or less",
        ),
    }),

    baseProductSchema.extend({
      type: z.literal("variant"),
    }),
  ]);

export const updateProductSchema = baseProductSchema.partial()


export type BasicInfoData = z.infer<
  typeof basicInfoSchema
>;

export type InventoryInfoData = z.infer<
  typeof inventoryInfoSchema
>;

export type VariantsData = z.infer<
  typeof variantsSchema
>;




export type CreateProductInput = z.infer<
  typeof createProductSchema
>;

export type UpdateProductInput = z.infer<
  typeof updateProductSchema
>;

export type ProductFormData =
  CreateProductInput;