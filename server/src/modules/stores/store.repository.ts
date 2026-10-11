import { db } from "@/db/index.js";
import { stores } from "@/db/schema/stores.js";
import { type StoreInput } from "@/modules/stores/store.validations.js";

import { eq, and } from "drizzle-orm";

const createStore = async ({
  data,
  ownerId,
}: {
  data: StoreInput;
  ownerId: string;
}) => {
  
  return await db
    .insert(stores)
    .values({
    ...data,
    ownerId,
    })
    .returning();
};

const findBySlug = async (slug: string) => {
  return await db.query.stores.findFirst({
    where: eq(stores.slug, slug),
  });
};


const findByOwnerId = async (ownerId: string) => {

  return await db.query.stores.findFirst({
    where: eq(stores.ownerId, ownerId),
    with: {
      products: true,
      orders: true,
    },
  });
};

export const StoreRepository = {
  createStore,
  findBySlug,
  findByOwnerId
};