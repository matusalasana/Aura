import { ProductRepository } from "@/modules/products/product.repository.js";
import { redis } from "@/config/redis.js";
import { VariantRepository } from "@/modules/variants/variant.repository.js";
  
import type {
  CreateProductInput,
  UpdateProductInput,
} from "@/modules/products/product.validations.js";


const PRODUCT_CACHE_TTL = 60*10 ; // 10 minutes

const productKey = (storeId: string, productId: string) =>
  `store:${storeId}:product:${productId}`;

const productsKey = (storeId: string) =>
  `store:${storeId}:products`;




const createProduct = async (
  storeId: string,
  data: CreateProductInput,
) => {
  if (data.type !== "simple" && data.type !== "variant") {
    throw new Error("Product type is not valid");
  }

  if (data.type === "simple") {
    if (data.price === undefined) {
      throw new Error("Simple products require a price");
    }

    if (data.stock === undefined) {
      throw new Error("Simple products require stock quantity");
    }

    if (data.sku === undefined) {
      throw new Error("Simple products require a SKU");
    }
  }

  const product = await ProductRepository.create(storeId, data);

  // Product list has changed.
  await redis.del(productsKey(storeId));

  return product;
};

const getProduct = async (
  productId: string,
  storeId: string,
) => {
  const key = productKey(storeId, productId);

  // 1. Try Redis first
  const cachedProduct = await redis.get(key);

  if (cachedProduct) {
    return cachedProduct;
  }

  // 2. Fall back to database
  const product =
    await ProductRepository.findByIdAndStore(
      productId,
      storeId,
    );

  if (!product) {
    throw new Error("Product not found");
  }

  // 3. Cache database result
  await redis.set(key, product, {
    ex: PRODUCT_CACHE_TTL,
  });

  return product;
};

const getProducts = async (storeId: string) => {
  const key = productsKey(storeId);

  // 1. Try Redis first
  const cachedProducts = await redis.get(key);

  if (cachedProducts) {
    return cachedProducts;
  }

  // 2. Get from database
  const products = await ProductRepository.findByStore(storeId);

  // 3. Calculate average price for variant products
  const refinedProducts = products.map((product) => {
    if (product.type !== "variant" || product.price !== null) {
      return product;
    }

    const prices = product.variants
      .map((variant) => Number(variant.price))
      .filter((price) => !Number.isNaN(price));

    if (!prices.length) {
      return product;
    }

    const averagePrice =
      prices.reduce((sum, price) => sum + price, 0) / prices.length;

    return {
      ...product,
      price: averagePrice.toFixed(2),
    };
  });

  // 4. Cache refined products
  await redis.set(key, refinedProducts, {
    ex: PRODUCT_CACHE_TTL,
  });

  return refinedProducts;
};

const updateProduct = async (
  productId: string,
  storeId: string,
  data: UpdateProductInput,
) => {
  const product =
    await ProductRepository.findByIdAndStore(
      productId,
      storeId,
    );

  if (!product) {
    throw new Error("Product not found");
  }

  const updatedProduct =
    await ProductRepository.update(
      productId,
      storeId,
      data,
    );

  // Invalidate both individual and list caches.
  await redis.del(
    productKey(storeId, productId),
    productsKey(storeId),
  );

  return updatedProduct;
};

const deleteProduct = async (
  productId: string,
  storeId: string,
) => {
  const product =
    await ProductRepository.deleteOne(
      productId,
      storeId,
    );

  if (!product) {
    throw new Error("Product not found");
  }

  // Invalidate both individual and list caches.
  await redis.del(
    productKey(storeId, productId),
    productsKey(storeId),
  );

  return product;
};

export const ProductService = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};