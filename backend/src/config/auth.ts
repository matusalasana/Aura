import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../db";
import * as schema from "../db/schema";
import { Env } from "./env";


export const auth = betterAuth({
  
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  secret: Env.BETTER_AUTH_SECRET,

  baseURL: Env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
  },

  trustedOrigins: [
    Env.CLIENT_ORIGIN,
  ],
  
});