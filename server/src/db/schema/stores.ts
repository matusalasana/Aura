import {
  pgTable,
  pgEnum,
  uuid,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { user } from "./auth.js";
import { plans } from "@/db/schema/plans.js";

export const storeStatusEnum = pgEnum("store_status", [
  "pending",
  "active",
  "suspended",
]);

export const stores = pgTable(
  "stores",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    planId: uuid("plan_id")
      .notNull()
      .references(() => plans.id, {
        onDelete: "cascade",
      }),

    storeName: text("name").notNull(),

    slug: text("slug").notNull().unique(),

    ownerId: text("owner_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    status: storeStatusEnum("status").notNull().default("pending"),

    description: text("description"),

    logo: text("logo").notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("store_slug_uidx").on(table.slug),
  ],
);


export type Store = typeof stores.$inferSelect;