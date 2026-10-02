import { z } from "zod";


const orderItemSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  quantity: z.number().int().positive(),
});

export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1),
});


const updateOrderSchema = createOrderSchema.partial()

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;