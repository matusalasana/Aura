import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const vendors = pgTable("vendors", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),

  storeName: varchar("store_name", { length: 255 }).notNull(),

  description: text("description"),

  logoUrl: text("logo_url"),
  bannerUrl: text("banner_url"),

  status: varchar("status", { length: 20 }).default("pending"),

  payoutEmail: varchar("payout_email", { length: 255 }),
  tinNumber: varchar("tin_number", { length: 255 }).notNull(),

  logoPublicId: text("logo_public_id"),
  bannerPublicId: text("banner_public_id"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});