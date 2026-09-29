import {
  boolean,
  integer,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  index,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { stores } from "@/db/schema/index.js";

export const productTypeEnum = pgEnum("product_type", [
  "simple",
  "variant",
]);

export const productStatusEnum = pgEnum("product_status", [
  "draft",
  "active",
  "archived",
]);



export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    storeId: uuid("store_id")
      .notNull()
      .references(() => stores.id, {
        onDelete: "cascade",
      }),

    name: varchar("name", { length: 255 }).notNull(),

    description: text("description"),

    status: productStatusEnum("status")
      .notNull()
      .default("draft"),
    
    type: productTypeEnum("type").notNull().default("simple"),

    // Simple products columns (not for variant)
    price: numeric("price", {
      precision: 12,
      scale: 2,
    }),

    stock: integer("stock"),

    sku: varchar("sku", { length: 100 }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [

    index("products_store_id_idx").on(table.storeId),

    index("products_type_idx").on(table.type),

    index("products_status_idx").on(table.status),
  ],
);