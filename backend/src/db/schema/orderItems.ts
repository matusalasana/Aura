import { pgTable, uuid, integer, timestamp, decimal } from 'drizzle-orm/pg-core';

import { orders } from "./orders"
import { productVariants } from "./productVariants"


export const orderItems = pgTable('order_items', {
  
  id: uuid("id").defaultRandom().primaryKey(),
  
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  
  variantId: uuid('variant_id').references(() => productVariants.id, { onDelete: 'set null' }),
  
  quantity: integer('quantity').notNull(),
  
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
});