import {
  pgTable,
  pgEnum,
  uuid,
  numeric,
  integer,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { orders, products, productVariants } from "@/db/schema/index.js";

export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, {
        onDelete: "cascade",
      }),

    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, {
        onDelete: "restrict",
      }),

    variantId: uuid("variant_id").references(
      () => productVariants.id,
      {
        onDelete: "restrict",
      },
    ),

    unitPrice: numeric("unit_price", {
      precision: 12,
      scale: 2,
    }).notNull(),

    quantity: integer("quantity").notNull(),

    total: numeric("total", {
      precision: 12,
      scale: 2,
    }).notNull(),
  },
  (table) => [
    index("order_items_order_id_idx").on(table.orderId),

    index("order_items_product_id_idx").on(table.productId),
  ],
);