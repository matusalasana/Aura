import { pgTable, uuid, text, timestamp, boolean, decimal } from 'drizzle-orm/pg-core';

import { stores } from "./stores";


export const coupons = pgTable('coupons', {
  
  id: uuid("id").defaultRandom().primaryKey(),
  
  storeId: uuid("store_id").references(() => stores.id).notNull(),
  
  code: text('code').notNull().unique(),
  
  discountAmount: decimal('discount_amount', { precision: 10, scale: 2 }).notNull(),
  
  minOrderAmount: decimal('min_order_amount', { precision: 10, scale: 2 }),
  
  usageLimit: uuid('usage_limit'),
  
  expiresAt: timestamp('expires_at'),
  
  isActive: boolean('is_active').default(true).notNull(),
});