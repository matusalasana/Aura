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
  id: z.string().uuid().min(1, "Id of the product you're trying to update is required"),
  category_id: z.string().uuid().optional(),
  name: z.string().min(2),
  description: z.string(),
  average_rating: z.number().positive(),
  rating_count: z.int().nonnegative(),
  is_featured: z.boolean().optional(),
  is_bestseller: z.boolean().optional(),
  
  variants: z.array(
    z.object({
      product_id: z.string().uuid().optional(),
      color: z.string().min(1, "Color is required"),
      size: z.string().min(1, "Size is required"),
      price: z.number().positive().min(100, "Amount must be greater than 100 ETB"),
      
      sku: z.string().min(1, "sku is required")
  })),
  
  images: z.array(
    z.object({
      product_id: z.string().uuid().optional(),
      url: z.string().min(1, "Image is required"),
    })
  ),
  
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
