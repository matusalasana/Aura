import {
  pgTable,
  pgEnum,
  uuid,
  text,
  varchar,
  numeric,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { shippingInformation, stores, user } from "@/db/schema/index.js";

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);


export const orders = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    storeId: uuid("store_id")
      .notNull()
      .references(() => stores.id, {
        onDelete: "cascade",
      }),

    customerId: text("customer_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "restrict",
      }),

    orderNumber: varchar("order_number", {
      length: 30,
    }).notNull(),

    status: orderStatusEnum("status")
      .notNull()
      .default("pending"),

    subtotal: numeric("subtotal", {
      precision: 12,
      scale: 2,
    })
      .notNull(),

    shippingAddress: uuid("shipping_address")
      .notNull()
      .references(() => shippingInformation.id, {
        onDelete: "cascade"
      }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("orders_store_id_idx").on(table.storeId),

    index("orders_customer_id_idx").on(table.customerId),

    index("orders_status_idx").on(table.status),
  ],
);