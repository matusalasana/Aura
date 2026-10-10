import { and, eq } from "drizzle-orm";

import { db } from "@/db/index.js";
import { productVariants } from "@/db/schema/index.js";

import type {
  CreateVariantInput,
  UpdateVariantInput,
} from "@/modules/variants/variant.validations.js";

const create = async (
  data: (typeof productVariants.$inferInsert)[],
) => {
  return db
    .insert(productVariants)
    .values(data)
    .returning();
};

const findById = async (id: string) => {
  const [variant] = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.id, id))
    .limit(1);

  return variant ?? null;
};

const findByIdAndProduct = async (
  id: string,
  productId: string,
) => {
  const [variant] = await db
    .select()
    .from(productVariants)
    .where(
      and(
        eq(productVariants.id, id),
        eq(productVariants.productId, productId),
      ),
    )
    .limit(1);

  return variant ?? null;
};

const findBySku = async (
  productId: string,
  sku: string,
) => {
  const [variant] = await db
    .select()
    .from(productVariants)
    .where(
      and(
        eq(productVariants.productId, productId),
        eq(productVariants.sku, sku),
      ),
    )
    .limit(1);

  return variant ?? null;
};

const findByProduct = async (
  productId: string,
) => {
  return db
    .select()
    .from(productVariants)
    .where(
      eq(productVariants.productId, productId),
    );
};

const update = async (
  id: string,
  productId: string,
  data: UpdateVariantInput,
) => {
  const [variant] = await db
    .update(productVariants)
    .set({
      ...data,
      price: data.price !== undefined ? String(data.price) : undefined,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(productVariants.id, id),
        eq(productVariants.productId, productId),
      ),
    )
    .returning();

  return variant ?? null;
};

const remove = async (
  id: string,
  productId: string,
) => {
  const [variant] = await db
    .delete(productVariants)
    .where(
      and(
        eq(productVariants.id, id),
        eq(productVariants.productId, productId),
      ),
    )
    .returning();

  return variant ?? null;
};

export const VariantRepository = {
  create,
  findById,
  findByIdAndProduct,
  findBySku,
  findByProduct,
  update,
  remove,
};