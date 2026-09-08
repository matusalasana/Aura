import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins"
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../db/index.js";
import * as schema from "../db/schema/index.js";
import { Env } from "./env.js";
import { sendEmail } from "@/utils/email.js"
import { verifyEmailTemplate } from "@/templates/verifyEmail.js";

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

  socialProviders: { 
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account",
    },
  },

  trustedOrigins: [
    Env.CLIENT_ORIGIN,
  ],
  
});