import { z } from 'zod';

export const productSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    description: z.string(),
    price: z.number().positive(),
    stock: z.number().int().nonnegative(),
    category_id: z.string().uuid(),
    is_featured: z.boolean().optional(),
    is_recommended: z.boolean().optional(),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    stock: z.number().int().nonnegative().optional(),
    category_id: z.string().uuid().optional(),
    is_featured: z.boolean().optional(),
    is_recommended: z.boolean().optional(),
  }),
});
