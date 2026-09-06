import { pgTable, uuid, pgEnum, timestamp, decimal } from 'drizzle-orm/pg-core';

import { users } from "./users"
import { stores } from "./stores"
import { addresses } from "./addresses"


export const statusEnum = pgEnum("status", [
  "pending",
  "cancelled",
  "received",
]);

export const orders = pgTable('orders', {
  
  id: uuid("id").defaultRandom().primaryKey(),
  
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  
  storeId: uuid('store_id').references(() => stores.id, { onDelete: 'set null' }),
  
  status: statusEnum("status").default('pending').notNull(),
  
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  
  shippingAddressId: uuid('shipping_address_id').references(() => addresses.id),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});