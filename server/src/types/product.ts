export type ProductType = "simple" | "variant";

export type ProductStatus = "draft" | "active" | "archived";

export type ProductVariant = {
  id?: string;
  productId?: string;
  price: string;
  size: string;
  color: string;
  sku?: string;
  stock: number;
  isActive: boolean;
}

export type ProductImage = {
  id?: string;
  url: string;
  publicId?: string;
  createdAt?: string;
}

export type Product = {
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