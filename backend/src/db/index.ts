import { neon } from "@neondatabase/serverless";
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import logger from "../utils/logger"
import { Env } from "../config/env";

if (!Env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({
  connectionString: Env.DATABASE_URL!,
});

export const db = drizzle(pool);


export const connectDB = async () => {
  try {
    await db.select();
    logger.info(`✅ Aura Database Connected!`);
    return true;
  } catch (err: any) {
    logger.error('❌ Aura Database connection failed:', err);
    return false;
  }
};