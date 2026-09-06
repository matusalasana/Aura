
import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  boolean
} from "drizzle-orm/pg-core";

import { products } from "./products";
import { productVariants } from "./productVariants";

export const productImages = pgTable("product_images", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  
  variantId: uuid('variant_id').references(() => productVariants.id, { onDelete: 'set null' }),
  
  url: text('url').notNull(),

  isPrimary: boolean('is_primary').default(false).notNull(),
  
  publicId: text("public_id")
    .notNull(),

  order: integer("order")
    .default(0)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});