import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";

export const otpTypeEnum = pgEnum("otp_type", [
  "verify_email",
  "reset_password",
]);

export const otps = pgTable(
  "otps",
  {
    id: uuid("id")
        .defaultRandom()
        .primaryKey(),

    email: varchar("email", {
      length: 255,
    }).notNull(),

    codeHash: varchar("code_hash", {
      length: 255,
    }).notNull(),

    type: otpTypeEnum("type").notNull(),

    expiresAt: timestamp("expires_at", {
      withTimezone: true,
    }).notNull(),

    usedAt: timestamp("used_at", {
      withTimezone: true,
    }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    emailIdx: index("otp_email_idx").on(table.email),
    typeIdx: index("otp_type_idx").on(table.type),
  })
);