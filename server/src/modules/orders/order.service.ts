import { OrderRepository } from "@/modules/orders/order.repository.js";
import type { CreateOrderInput } from "@/modules/orders/order.validations.js";
import { generateOrderNumber } from "@/utils/generateOrderNumber";
import { redis } from "@/config/redis.js";


const ORDER_CACHE_TTL = 60*10 ; // 10 minutes

const orderKey = (storeId: string, orderId: string) =>
  `store:${storeId}:order:${orderId}:`;

const ordersKey = (storeId: string, customerId: string) =>
  `store:${storeId}:orders:${customerId}`;



const createOrder = async (
  storeId: string,
  customerId: string,
  data: CreateOrderInput,
) => {
  
  for (const item of data.items) {
    
    const product = await OrderRepository.findProductForOrder(item.productId);

    if (!product) {
      throw new Error(`Product ${item.productId} not found`);
    }

    if (product.storeId !== storeId) {
      throw new Error("Product does not belong to this store");
    }

    if (product.status !== "active") {
      throw new Error(`Product "${product.name}" is not available`);
    }

    if (product.type === "simple") {
      if (item.variantId) {
        throw new Error(
          `Simple product "${product.name}" cannot have a variant`,
        );
      }

      if (product.price === null || product.stock === null) {
        throw new Error(
          `Product "${product.name}" has invalid pricing or stock`,
        );
      }

      if (item.quantity > product.stock) {
        throw new Error(
          `Not enough stock for "${product.name}"`,
        );
      }
    }

    if (product.type === "variant") {
      if (!item.variantId) {
        throw new Error(
          `Variant is required for "${product.name}"`,
        );
      }

      const variant = await OrderRepository.findVariantForOrder(item.variantId);

      if (!variant) {
        throw new Error("Variant not found");
      }

      if (variant.productId !== product.id) {
        throw new Error("Variant does not belong to this product");
      }

      if (!variant.isActive) {
        throw new Error("This variant is not available");
      }

      if (item.quantity > variant.stock) {
        throw new Error(
          `Not enough stock for "${product.name}"`,
        );
      }
    }
  }

  
  const orderItems = [];
  let subtotal = 0;

  for (const item of data.items) {
    const product = await OrderRepository.findProductForOrder(item.productId);

    if (!product) {
      throw new Error(`Product ${item.productId} not found`);
    }

    let unitPrice: string;
    let variantSize: string | null = null;
    let variantColor: string | null = null;
    let sku: string | null = product.sku;

    if (product.type === "simple") {
      unitPrice = product.price!;
    } else {
      const variant = await OrderRepository.findVariantForOrder(item.variantId!);

      if (!variant) {
        throw new Error("Variant not found");
      }

      unitPrice = variant.price;
      variantSize = variant.size;
      variantColor = variant.color;
      sku = variant.sku;
    }

    const itemTotal = Number(unitPrice) * item.quantity;

    subtotal += itemTotal;

    orderItems.push({
      productId: product.id,
      variantId: item.variantId ?? null,

      unitPrice,
      quantity: item.quantity,
      total: itemTotal.toFixed(2),
    });
  }

  const orderNumber = generateOrderNumber();

  const shippingInfo = {
    customerId,
    
    customerName: data.shipping.name,
    customerEmail: data.shipping.email,
    customerPhone: data.shipping.phone,

    shippingAddress: data.shipping.address,
    shippingCity: data.shipping.city,
    shippingSubcity: data.shipping.subcity,
    shippingNotes: data.shipping.notes,
  };

  const order = {
    storeId,
    customerId,
    orderNumber,
    subtotal: subtotal.toFixed(2),
  }

  const result = await OrderRepository.createOrderWithItems(
    order,
    orderItems,
    shippingInfo
  );

  await redis.del(orderKey(storeId, result.id));

  return result;
};

const getOrders = async(storeId: string, customerId: string) => {

  const key = ordersKey(storeId, customerId);

  const cachedOrders = await redis.get(key);

  if (cachedOrders) {
    return cachedOrders;
  }
  
  return await OrderRepository.getAll(storeId, customerId);
}


export const OrderService = {
  createOrder,
  getOrders,
}