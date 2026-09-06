import { pgTable, uuid, text, timestamp, boolean, decimal, jsonb } from 'drizzle-orm/pg-core';

import { products } from "./products"


export const productVariants = pgTable('product_variants', {
  
  id: uuid("id").defaultRandom().primaryKey(),
  
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  
  sku: text('sku').notNull().unique(),
  
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  
  isPublished: boolean("is_published")
      .default(false)
      .notNull(),
      
  compareAtPrice: decimal('compare_at_price', { precision: 10, scale: 2 }),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});