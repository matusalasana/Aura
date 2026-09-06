
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { stores } from "./stores";
import { categories } from "./categories";

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    storeId: uuid("store_id").notNull().references(() => stores.id),
    
    categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'set null' }),

    name: varchar("name", { length: 200 }).notNull(),
    slug: text('slug').notNull().unique(),
    
    description: text("description"),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    storeIdx: index("products_store_idx").on(table.storeId),
    storeCategoryIdx: index("products_store_category_idx").on(table.storeId, table.categoryId),
  })
);