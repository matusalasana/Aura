import { z } from 'zod';

export const createProductSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive().min(100, "Amount must be greater than 100 ETB"),
  stock: z.number().int().nonnegative(),
  vendor_id: z.string().uuid().min(1, "Vendor is required"),
  category_id: z.string().uuid().min(1, "Category is required"),
  sizes: z.array(z.string()).optional().default([]),
  colors: z.array(z.string()).optional().default([]),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
});

export const updateProductSchema = z.object({
  id: z.string().uuid().min(1, "Product id required"),
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  stock: z.number().int().nonnegative(),
  category_id: z.string().uuid().optional(),
  sizes: z.array(z.string()).optional().default([]),
  colors: z.array(z.string()).optional().default([]),
  images: z.array(z.string()).optional().default([]),
});

export interface ProductFilters {
  minPrice?: number,
  maxPrice?: number,
  categoryId?: string,
  search?: string,
  
  featured?: boolean,
  bestseller?: boolean,
  
  page?: number,
  limit?: number
};

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
