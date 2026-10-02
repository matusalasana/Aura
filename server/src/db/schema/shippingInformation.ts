import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp
} from "drizzle-orm/pg-core";

import { user } from "@/db/schema/index.js";

export const shippingInformation = pgTable(
  "shipping_information",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    customerId: text("customer_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "restrict",
      }),

    // Customer information snapshot
    customerName: text("customer_name").notNull(),

    customerEmail: text("customer_email").notNull(),

    customerPhone: text("customer_phone").notNull(),

    // Delivery information snapshot
    shippingAddress: text("shipping_address").notNull(),

    shippingCity: text("shipping_city").notNull(),

    shippingSubcity: text("shipping_subcity").notNull(),

    shippingNotes: text("shipping_notes"),

    isDefault: boolean("is_default").default(false),
    
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  }
);