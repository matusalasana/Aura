import { db } from "@/db/index.js";
import { user } from "@/db/schema/auth.js";

import { eq, and, gt, lt } from "drizzle-orm";




const findUserById = async (userId: string) => {
  return await db
    .select()
    .from(user)
    .where(
      eq(user.id, userId)
    )
};


export const AuthRepository = {
  findUserById,
};