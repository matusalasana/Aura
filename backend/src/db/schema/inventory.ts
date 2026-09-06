import { pgTable, uuid, timestamp, integer } from 'drizzle-orm/pg-core';

import { productVariants } from "./productVariants";


export const inventory = pgTable('inventory', {
  
  id: uuid("id").defaultRandom().primaryKey(),
  
  variantId: uuid('variant_id').references(() => productVariants.id, { onDelete: 'cascade' }).notNull().unique(),
  
  stock: integer('stock').default(0).notNull(),
  
  lowStockThreshold: integer('low_stock_threshold').default(5).notNull(),
  
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});