
import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

import { products } from "./products";

export const productImages = pgTable("product_images", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  productId: uuid("product_id")
    .references(() => products.id, {
      onDelete: "cascade",
    })
    .notNull(),

  imageUrl: text("image_url")
    .notNull(),

  publicId: text("public_id")
    .notNull(),

  order: integer("order")
    .default(0)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});