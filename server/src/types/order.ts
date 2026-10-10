import type {
  orders,
  shippingInformation,
  orderItems,
} from "@/db/schema/index.js";

export type OrderStatus =
  | "Pending"
  | "Paid"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export type OrderData = Omit<
  typeof orders.$inferInsert,
  "shippingAddress"
>;

export type OrderItem = Omit<
  typeof orderItems.$inferInsert,
  "id" | "orderId"
>;

export type ShippingAddress = Omit<
  typeof shippingInformation.$inferInsert,
  "id" | "createdAt" | "updatedAt"
>;