import {
  pgTable,
  uuid,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { user } from "./auth.js";



export const stores = pgTable(
  "stores",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: text("name").notNull(),

    slug: text("slug").notNull(),

    ownerId: text("owner_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    description: text("description"),

    logo: text("logo"),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("store_slug_uidx").on(table.slug),
  ],
);




export const storeRelations = relations(stores, ({ one }) => ({
  owner: one(user, {
    fields: [stores.ownerId],
    references: [user.id],
  }),
}));