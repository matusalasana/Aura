import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';

import { users } from "./users"


export const carts = pgTable('carts', {
  
  id: uuid("id").defaultRandom().primaryKey(),
  
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull().unique(),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});