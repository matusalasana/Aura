import { defineConfig } from "drizzle-kit";
import { Env } from "./src/config/env";

export default defineConfig({
  schema: "./src/db/schema",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: Env.DATABASE_URL,
  },
});