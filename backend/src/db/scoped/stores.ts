import { eq, and } from "drizzle-orm";
import { db } from "../../db";

import { stores } from "../schema/stores";



const findMany = async () => {
  const stores = await db
    .select()
    .from(stores);
  
  return stores || [];
};


const findById = async (id: string) => {
  
  const store = await db
    .select()
    .from(stores)
    .where(
      eq(stores.storeId, id)
    )
    .limit(1);

  return store[0] || null;
};



export const scopedStores = {
  findMany,
  findById,
};