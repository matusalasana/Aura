
import {
  pgTable,
  uuid,
  varchar,
  text,
  numeric,
  integer,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { vendors } from "./vendors";

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    vendorId: uuid("vendor_id")
      .references(() => vendors.id, {
        onDelete: "cascade",
      })
      .notNull(),

    name: varchar("name", { length: 150 }).notNull(),

    description: text("description"),

    price: numeric("price", {
      precision: 10,
      scale: 2,
    }).notNull(),

    stock: integer("stock").notNull().default(0),

    thumbnail: text("thumbnail"),

    category: varchar("category", {
      length: 80,
    }).notNull(),

    isPublished: boolean("is_published")
      .default(false)
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    vendorIdx: index("products_vendor_idx").on(table.vendorId),
    categoryIdx: index("products_category_idx").on(table.category),
  })
);