import { pgTable, uuid, text, uuid, boolean, decimal, jsonb } from 'drizzle-orm/pg-core';
import { users } from "./users"


export const addresses = pgTable('addresses', {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  street: text('street').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  postalCode: text('postal_code').notNull(),
  country: text('country').notNull(),
  isDefault: boolean('is_default').default(false).notNull(),
});