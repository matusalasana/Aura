import { eq, and, sql, innerJoin } from "drizzle-orm";

import { db } from "@/db/index.js";
import { 
  products, 
  productVariants, 
  user, 
  orders, 
  orderItems, 
  shippingInformation } from "@/db/schema/index.js";



const createOrderWithItems = async (
  orderData: typeof orders.$inferInsert,
  items: (typeof orderItems.$inferInsert)[],
  shippingInfo: typeof shippingInformation.$inferInsert
) => {
  return db.transaction(async (tx) => {
    const [shippingAddress] = await tx
      .insert(shippingInformation)
      .values(shippingInfo)
      .returning();
    
    const [order] = await tx
      .insert(orders)
      .values({
        ...orderData,
        shippingAddress: shippingAddress.id,
      })
      .returning();

    await tx.insert(orderItems).values(
      items.map((item) => ({
        ...item,
        orderId: order.id,
      })),
    );

    for (const item of items) {
      if (item.variantId) {
        await tx
          .update(productVariants)
          .set({
            stock: sql`${productVariants.stock} - ${item.quantity}`,
          })
          .where(eq(productVariants.id, item.variantId));
      } else {
        await tx
          .update(products)
          .set({
            stock: sql`${products.stock} - ${item.quantity}`,
          })
          .where(eq(products.id, item.productId));
      }
    }

    return order;
  });
};

const getAll = async(storeId: string, customerId: string) => {
  const results = await db
    .select({
      orderNumber: orders.orderNumber,
      customer: user.name,
      date: orders.createdAt,
      amount: orders.subtotal,
      status: orders.status,
    })
    .from(orders)
    .innerJoin(user, eq(user.id, orders.customerId))
    .where( 
      and (
        eq(orders.storeId, storeId),
        eq(orders.customerId, customerId)
      )
    );

  return results;
};

const findProductForOrder = async (productId: string) => {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  return product;
};

const findVariantForOrder = async (variantId: string) => {
  const [variant] = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.id, variantId))
    .limit(1);

  return variant;
};


export const OrderRepository = {
  createOrderWithItems,
  findProductForOrder,
  findVariantForOrder,
  getAll,
}