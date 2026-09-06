import { eq, and } from "drizzle-orm";
import { db } from "../index
import { products } from "../schema/products";


const findMany = async(storeId: string) => {
  const products = await db
    .select()
    .from(products)
    .where(
      eq(products.storeId, storeId)
    );
    
  return products || [];
};


const findById = async ({
      id,
      storeId
    }:{
      id: string,
      storeId: string
    }) => {
  const product = await db
    .select()
    .from(products)
    .where(
      and(
        eq(products.storeId, storeId), 
        eq(products.id, id))
    );
    
  return product || null;
};


export const scopedProducts = {
  findMany,
  findById
}