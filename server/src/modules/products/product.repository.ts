import { eq, and } from "drizzle-orm";

import { db } from "@/db/index.js";
import { products } from "@/db/schema/index.js";
import type { CreateProductInput, UpdateProductInput } from "@/modules/products/product.validations.js";



const create = async (storeId: string, data: CreateProductInput) => {
  const [product] = await db
    .insert(products)
    .values({...data, storeId})
    .returning();

  return product;
};

const findById = async (id: string) => {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  return product ?? null;
};

const findByIdAndStore = async (
  id: string,
  storeId: string,
) => {
  const [product] = await db
    .select()
    .from(products)
    .where(
      and(
        eq(products.id, id),
        eq(products.storeId, storeId),
      ),
    )
    .limit(1);

  return product ?? null;
};

const findByStore = async (storeId: string) => {
  return db
    .select()
    .from(products)
    .where(eq(products.storeId, storeId));
};

const update = async (
  id: string,
  storeId: string,
  data: UpdateProductInput,
) => {
  const [product] = await db
    .update(products)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(products.id, id),
        eq(products.storeId, storeId),
      ),
    )
    .returning();

  return product ?? null;
};

const deleteOne = async (
  id: string,
  storeId: string,
) => {
  const [product] = await db
    .delete(products)
    .where(
      and(
        eq(products.id, id),
        eq(products.storeId, storeId),
      ),
    )
    .returning();

  return product ?? null;
};



export const ProductRepository = {
  create,
  update,
  deleteOne,
  findById,
  findByIdAndStore,
  findByStore,
}