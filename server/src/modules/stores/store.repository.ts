import { db } from "@/db/index.js";
import { stores, products } from "@/db/schema/index.js";
import type { UpdateStoreInput, CreateStoreInput } from "@/modules/stores/store.validations.js"

import { eq, and } from "drizzle-orm";

const createStore = async ({
  storeData,
  ownerId,
}: {
  storeData: CreateStoreInput;
  ownerId: string;
}) => {
  
  return await db
    .insert(stores)
    .values({
    ...storeData,
    ownerId,
    })
    .returning();
};

const findBySlug = async (slug: string) => {
  return await db.query.stores.findFirst({
    where: eq(stores.slug, slug),
    with: {
      products: true
    }
  });
};

const getAll = async () => {

  return await db.query.stores.findMany();
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

const findByStoreId = async (storeId: string) => {

  return await db.query.stores.findFirst({
    where: eq(stores.id, storeId)
  });
};

const update = async ({
  ownerId,
  data
}: {
  ownerId: string;
  data: UpdateStoreInput;
}) => {

  return await db
    .update(stores)
    .set(data)
    .where(
      eq(stores.ownerId, ownerId)
    )
    .returning();
  
};

const deleteStore = async (storeId: string) => {

  return await db
    .delete(stores)
    .where(
      eq(stores.id, storeId)
    )
    .returning();
  
};


const findProductByIdAndStore = async ({
  storeId,
  productId,
}: {
  storeId: string
  productId: string
}) => {

  return await db.query.products.findFirst({
    where: and(
      eq(products.storeId, storeId),
      eq(products.id, productId)
      ),
  });
};


export const StoreRepository = {
  createStore,
  findBySlug,
  findByOwnerId,
  getAll,
  update,
  deleteStore,
  findByStoreId,

  findProductByIdAndStore,
};