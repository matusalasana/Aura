import { db } from "@/db/index.js";
import { user } from "@/db/schema/auth.js";

import { eq, and, gt, lt } from "drizzle-orm";




const findUserById = async (userId: string) => {
  const result = await db
    .select()
    .from(user)
    .where(
      eq(user.id, userId)
    )

  return result[0] || null;
};


export const AuthRepository = {
  findUserById,
};