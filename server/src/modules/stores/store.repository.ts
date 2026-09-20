import { db } from "@/db/index.js";
import { stores } from "@/db/schema/stores.js";

import { eq, and, gt, lt } from "drizzle-orm";




const createStore = async ({
  data,
  ownerId
}:{
  data: StoreInput,
  ownerId: string
}) => {
  return await db
    .insert(stores)
    .values({
      ...data,
      ownerId
    })
    .returning();
};


export const StoreRepository = {
  createStore,
};