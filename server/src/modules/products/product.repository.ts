import { eq, and } from "drizzle-orm";

import { db } from "@/db/index.js";
import { products } from "@/db/schema";



const create = async (data) => {
  const [product] = await db
    .insert(products)
    .values(data)
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

const findBySlug = async (
  storeId: string,
  slug: string,
) => {
  const [product] = await db
    .select()
    .from(products)
    .where(
      and(
        eq(products.storeId, storeId),
        eq(products.slug, slug),
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
  data: Partial<typeof products.$inferInsert>,
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
  findBySlug,
  findByStore,
}