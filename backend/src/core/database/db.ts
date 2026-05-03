import { neon } from "@neondatabase/serverless"
import { DATABASE_URL } from "../config/env"

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

export const sql = neon(DATABASE_URL);

export const connectDB = async () => {
  try {
    const result = await sql`SELECT NOW()`;
    console.log('✅ Aura DB connected ');
    return true;
  } catch (err) {
    console.error('❌ Database connection  failed ):', err);
    return false;
  }
};