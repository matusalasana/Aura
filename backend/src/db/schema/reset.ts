import { sql } from "drizzle-orm";

import { db } from "../index.js";
import  logger from "@/utils/logger.js";


export const resetSchema = async () => {
  await db.execute(sql`
    DROP SCHEMA IF EXISTS public CASCADE;
    CREATE SCHEMA public;
  `);
  
  logger.info("Schema dropped successfully")
};

resetSchema();