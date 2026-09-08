import {
  pgTable,
  text,
  uuid,
  varchar,
  timestamp,
  pgEnum,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { stores } from "./stores.js";


export const statusEnum = pgEnum("status", [
  "pending",
  "active",
  "suspended"
]);


export const storeDomains = pgTable(
  "store_domains",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    storeId: uuid("store_id")
      .notNull()
      .references(() => stores.id, { onDelete: "cascade" }),

    domain: text("domain").notNull(),

    customDomain: text("custom_domain").notNull(),

    status: statusEnum("status")
      .notNull()
      .default("pending"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    domainIdx: uniqueIndex("store_domain_idx").on(table.domain),
  })
);


export const storeDomainRelations = relations(storeDomains, ({ one }) => ({
  stores: one(stores, {
    fields: [storeDomains.storeId],
    references: [stores.id],
  }),
}));