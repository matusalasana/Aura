import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", [
  "customer",
  "vendor",
  "admin",
  "support",
]);

export const users = pgTable("users", 
  {
    id: uuid("id")
        .defaultRandom()
        .primaryKey(),

  name: varchar("name", { length: 100 })
        .notNull(),

  email: varchar("email", { length: 255 })
          .notNull()
          .unique(),

  passwordHash: varchar("password_hash", { length: 255 }).notNull(),

  avatar: varchar("avatar", { length: 500 }),

  role: roleEnum("role")
        .default("customer")
        .notNull(),

  isVerified: boolean("is_verified")
              .default(false)
              .notNull(),

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
  (table) => ({
    emailIdx: index("users_email_idx").on(table.email),
    roleIdx: index("users_role_idx").on(table.role),
  })
);