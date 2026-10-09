import { eq, and } from "drizzle-orm";

import { db } from "@/db/index.js";
import {
  products,
  productImages,
} from "@/db/schema/index.js";

import type {
  CreateProductInput,
  UpdateProductInput,
} from "@/modules/products/product.validations.js";

const create = async ({
  storeId, 
  productData,
  productImagesData
}:{
  storeId: string,
  productData: CreateProductInput
}) => {
  return db.transaction( async(tx) => {
    
    const [product] = await tx
      .insert(products)
      .values({
        ...productData,
        price:
          productData.price !== undefined
            ? productData.price.toString()
            : undefined,
        storeId,
      })
      .returning();

    const imagesDataToInsert = productImagesData.map((prev) => {
      return {
        ...prev,
        productId: product.id
      }
    })
  
    const images = await tx
      .insert(productImages)
      .values(imagesDataToInsert)
      .returning();
  
    return { product, images };
    
  })
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
      images: true,
    },
  });

  return product ?? null;
};

const findByStore = async (storeId: string) => {
  const results = await db.query.products.findMany({
    where: eq(products.storeId, storeId),

    with: {
      variants: true,
      images: true,
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