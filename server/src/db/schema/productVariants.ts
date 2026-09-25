import {
  boolean,
  integer,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  index,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { products } from "@/db/schema";

export const productVariants = pgTable(
  "product_variants",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, {
        onDelete: "cascade",
      }),

    size: varchar("size", { length: 100 }).notNull(),

    color: varchar("color", { length: 100 }).notNull(),

    sku: varchar("sku", { length: 100 }).notNull(),

    price: numeric("price", {
      precision: 12,
      scale: 2,
    }).notNull(),

    stock: integer("stock_quantity")
      .notNull()
      .default(0),

    isActive: boolean("is_active")
      .notNull()
      .default(true),

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
    uniqueIndex("product_variants_product_sku_unique").on(
      table.productId,
      table.sku,
    ),

    index("product_variants_product_id_idx").on(
      table.productId,
    ),
  ],
);