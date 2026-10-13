
import type { Product } from "@/types/product";
import type { Order } from "@/types/order";


export type PlanEnum = "starter" | "pro" | "enterprise";


export type Store = {
  id: string;
  name: string;
  slug: string;
  plan: string;
  description: string | null;
  logo: string | null;
  products?: Product[];
  orders?: Order[];
};