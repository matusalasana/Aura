import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { storeMemberships } from "@/db/schema";

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