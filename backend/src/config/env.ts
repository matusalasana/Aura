import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();



const envSchema = z.object({
  // Basic
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(3000),

  // Databases
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  // Authentication
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.string().url(),

  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  // Sentry 
  SENTRY_DSN: z.string().url().min(1, "SENTRY_DSN is required"),

  // Origins
  CLIENT_ORIGIN: z
    .string()
    .url()
    .default("http://localhost:5173"),
  SERVER_ORIGIN: z
    .string()
    .url()
    .default("http://localhost:3000"),
  
  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),

  // Email
  SMTP_HOST: z.string().optional(),

  SMTP_PORT: z.coerce
    .number()
    .int()
    .positive()
    .default(2525),

  SMTP_SECURE: z.coerce.boolean().default(false),

  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().optional(),

});

const parsedEnv = envSchema.parse(process.env);

export const Env = {
  
  NODE_ENV: parsedEnv.NODE_ENV,
  PORT: parsedEnv.PORT,
  
  DATABASE_URL: parsedEnv.DATABASE_URL,
  UPSTASH_REDIS_REST_URL: parsedEnv.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: parsedEnv.UPSTASH_REDIS_REST_TOKEN,

  BETTER_AUTH_URL: parsedEnv.BETTER_AUTH_URL,
  BETTER_AUTH_SECRET: parsedEnv.BETTER_AUTH_SECRET,

  GOOGLE_CLIENT_ID: parsedEnv.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: parsedEnv.GOOGLE_CLIENT_SECRET,

  SENTRY_DSN: parsedEnv.SENTRY_DSN,

  CLIENT_ORIGIN: parsedEnv.NODE_ENV === "production" 
    ? parsedEnv.CLIENT_ORIGIN
    : "http://localhost:5173",
  SERVER_ORIGIN: parsedEnv.NODE_ENV === "production" 
    ? parsedEnv.SERVER_ORIGIN
    : "http://localhost:3000",

  CLOUDINARY_API_SECRET: parsedEnv.CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY: parsedEnv.CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME: parsedEnv.CLOUDINARY_CLOUD_NAME,

  SMTP_HOST: parsedEnv.SMTP_HOST,
  SMTP_PORT: parsedEnv.SMTP_PORT,
  SMTP_SECURE: parsedEnv.SMTP_SECURE,
  SMTP_USER: parsedEnv.SMTP_USER,
  SMTP_PASS: parsedEnv.SMTP_PASS,
  EMAIL_FROM: parsedEnv.EMAIL_FROM,

};