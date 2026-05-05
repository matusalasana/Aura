import { neon } from "@neondatabase/serverless"
import { DATABASE_URL } from "./env"
import logger from "../utils/logger";

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

export const sql = neon(DATABASE_URL);

export const connectDB = async () => {
  try {
    await sql`SELECT NOW()`;
    logger.info('✅ Database connected (Neon)');
    return true;
  } catch (err) {
    logger.error('❌ Database connection failed:', err);
    return false;
  }
};
