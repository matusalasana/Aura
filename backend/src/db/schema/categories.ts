import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { stores } from "./stores"

export const categories = pgTable('categories', {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  storeId: uuid('parent_id').references(() => stores.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});