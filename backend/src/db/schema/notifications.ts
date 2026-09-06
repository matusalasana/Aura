import { pgTable, uuid, text, timestamp, boolean, decimal } from 'drizzle-orm/pg-core';

import { users } from "./users";


export const notifications = pgTable('notifications', {
  
  id: uuid("id").defaultRandom().primaryKey(),
  
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  
  title: text('title').notNull(),
  
  message: text('message').notNull(),
  
  isRead: boolean('is_read').default(false).notNull(),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});