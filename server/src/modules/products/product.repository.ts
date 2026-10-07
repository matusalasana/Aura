import { eq, and } from "drizzle-orm";

import { db } from "@/db/index.js";
import {
  products,
} from "@/db/schema/index.js";

import type {
  CreateProductInput,
  UpdateProductInput,
} from "@/modules/products/product.validations.js";

const create = async (
  storeId: string,
  data: CreateProductInput,
) => {
  const [product] = await db
    .insert(products)
    .values({
      ...data,
      price:
        data.price !== undefined
          ? data.price.toString()
          : undefined,
      storeId,
    })
    .returning();

  return product;
};

const findById = async (id: string) => {
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),

    with: {
      variants: true,
    },
  });

  return product ?? null;
};

const findByIdAndStore = async (
  id: string,
  storeId: string,
) => {
  const product = await db.query.products.findFirst({
    where: and(
      eq(products.id, id),
      eq(products.storeId, storeId),
    ),

    with: {
      variants: true,
    },
  });

  return product ?? null;
};

const findByStore = async (storeId: string) => {
  const results = await db.query.products.findMany({
    where: eq(products.storeId, storeId),

    with: {
      variants: true,
    },
  });

  return results ?? [];
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
      price:
        data.price !== undefined
          ? data.price.toString()
          : undefined,
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
};