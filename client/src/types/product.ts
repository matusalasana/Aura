
import type {
  VariantsData,
} from "@/features/products/schemas";

export type ProductType = "simple" | "variant";

export type ProductStatus = "draft" | "active" | "archived";

export interface ProductVariant extends VariantsData {
  id?: string;
  productId?: string;
}

export interface ProductImage {
  id?: string;
  url: string;
  publicId?: string;
  createdAt?: string;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  description?: string;
  type: ProductType;
  price: string;
  stock: number;
  sku?: string;
  status: ProductStatus;
  images?: ProductImage[];
  variants?: ProductVariant[];
  createdAt?: string;
  updatedAt?: string;
}