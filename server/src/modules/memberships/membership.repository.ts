import { and, eq } from "drizzle-orm";
import { db } from "@/db/index.js";
import { storeMemberships } from "@/db/schema/index.js";

export const findStoreMembership = async (
  userId: string,
  storeId: string
) => {
  return db
    .select()
    .from(storeMemberships)
    .where(
      and(
        eq(storeMemberships.userId, userId),
        eq(storeMemberships.storeId, storeId),
      )
    )
};