import { pgTable, uuid, text, timestamp, boolean, decimal } from 'drizzle-orm/pg-core';

import { users } from "./users";
import { products } from "./products";


export const reviews = pgTable('reviews', {
  
  id: uuid("id").defaultRandom().primaryKey(),
  
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  
  rating: uuid('rating').notNull(),
  
  comment: text('comment'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});