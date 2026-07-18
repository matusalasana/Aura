import { z } from "zod";


// CREATE PRODUCT

export const createProductSchema = z.object({

  name: z
    .string()
    .min(3, "Product name must be at least 3 characters")
    .max(150, "Product name must not exceed 150 characters")
    .trim(),


  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters")
    .trim(),


  price: z
    .number({
      message: "Price must be a number",
    })
    .positive("Price must be greater than 0"),


  stock: z
    .number({
      message: "Stock must be a number",
    })
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative"),


  category_id: z
    .string()
    .uuid("Invalid category id"),


  thumbnail_url: z
    .string()
    .optional(),


  is_published: z
    .boolean()
    .default(false),

});




// UPDATE PRODUCT

export const updateProductSchema = z.object({

  name: z
    .string()
    .min(3, "Product name must be at least 3 characters")
    .max(150, "Product name must not exceed 150 characters")
    .trim()
    .optional(),


  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters")
    .trim()
    .optional(),


  price: z
    .number({
      message: "Price must be a number",
    })
    .positive("Price must be greater than 0")
    .optional(),


  stock: z
    .number({
      message: "Stock must be a number",
    })
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative")
    .optional(),


  category_id: z
    .string()
    .uuid("Invalid category id")
    .optional(),


  thumbnail_url: z
    .string()
    .optional(),


  is_published: z
    .boolean()
    .optional(),

});




// PRODUCT FILTER QUERY

export const productQuerySchema = z.object({

  category_id: z
    .string()
    .uuid()
    .optional(),


  search: z
    .string()
    .trim()
    .optional(),


  min_price: z
    .string()
    .optional(),


  max_price: z
    .string()
    .optional(),


  page: z
    .string()
    .optional(),


  limit: z
    .string()
    .optional(),

});




// EXPORT TYPES

export type CreateProductInput = z.infer<
  typeof createProductSchema
>;


export type UpdateProductInput = z.infer<
  typeof updateProductSchema
>;


export type ProductQueryInput = z.infer<
  typeof productQuerySchema
>;