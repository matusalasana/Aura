import { z } from 'zod';

export const createProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2),
  description: z.string(),
  average_rating: z.number().positive(),
  rating_count: z.int().nonnegative(),
  is_featured: z.boolean().optional(),
  is_bestseller: z.boolean().optional(),
  
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  category_id: z.string().uuid()
});

export const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  stock: z.number().int().nonnegative().optional(),
  category_id: z.string().uuid().optional(),
  is_featured: z.boolean().optional(),
  is_recommended: z.boolean().optional(),
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