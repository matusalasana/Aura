
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

export type Store = {
  id: string;
  storeName: string;
  slug: string;
  description: string | null;
  logo: string | null;
};