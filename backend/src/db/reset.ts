import { sql } from "drizzle-orm";
import { db } from "./index";


export const resetDatabase = async () => {
  await db.execute(sql`
    TRUNCATE TABLE
      products,
      product_images,
      users,
      stores,
      otps,
      refresh_tokens
    RESTART IDENTITY CASCADE;
  `);
};

resetDatabase();