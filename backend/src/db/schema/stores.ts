import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const stores = pgTable("stores", {
  id: uuid("id").defaultRandom().primaryKey(),

  storeName: varchar("store_name", { length: 255 }).notNull(),
  
  subdomain: varchar("subdomain", { length: 63 }).notNull().unique(),
  
  customDomain: varchar("custom_domain", { length: 255 }),
  
  isActive: boolean("is_active").notNull().default(true),

  createdAt: timestamp("created_at").defaultNow(),
});