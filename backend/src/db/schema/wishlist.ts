import { pgTable, uuid, text, timestamp, boolean, decimal } from 'drizzle-orm/pg-core';

import { users } from "./users";
import { products } from "./products";


export const wishlists = pgTable('wishlists', {
  
  id: uuid("id").defaultRandom().primaryKey(),
  
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});