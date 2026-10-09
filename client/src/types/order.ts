
export type OrderStatus =
  | "Pending"
  | "Paid"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface OrderItem {
  id?: string;
  variantId?: string;
  unitPrice: string | number;
  quantity: number;
  total: number;
}


export interface Order {
  id: string;
  storeId: string;
  customer: string;
  orderNumber: string;
  status: OrderStatus;
  amount: number;
  date: string;
  items?: OrderItem[],
  createdAt?: string;
  updatedAt?: string;
}