import { pgTable, uuid, timestamp, integer } from 'drizzle-orm/pg-core';

import { carts } from "./carts";
import { productVariants } from "./productVariants";


export const cartItems = pgTable('cart_items', {
  
  id: uuid("id").defaultRandom().primaryKey(),
  
  cartId: uuid('cart_id').references(() => carts.id, { onDelete: 'cascade' }).notNull(),
  
  variantId: uuid('variant_id').references(() => productVariants.id, { onDelete: 'cascade' }).notNull(),
  
  quantity: integer('quantity').notNull(),
});