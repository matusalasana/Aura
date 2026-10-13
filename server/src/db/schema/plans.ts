import {
  numeric,
  pgTable,
  text,
  timestamp,
  index,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";


export const plans = pgTable(
  "plans",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),

    description: text("description"),

    monthlyPrice: numeric("monthly_price", {
      precision: 12,
      scale: 2,
    }).notNull(),

    yearlyPrice: numeric("yearly_price", {
      precision: 12,
      scale: 2,
    }).notNull(),

    iconName: varchar("icon_name", { length: 255 }).notNull(),

    cta: text("cta"),

    features: text("features")
      .array()
      .notNull()
      .default([]),

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
  }
);