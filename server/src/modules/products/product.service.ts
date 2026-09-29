import { ProductRepository } from "@/modules/products/product.repository.js";

import type {
  CreateProductInput,
  UpdateProductInput,
} from "@/modules/products/product.validations.js";

const createProduct = async (
  storeId: string,
  data: CreateProductInput,
) => {
  const allowedTypes = ["simple", "variant"];
  if(data.type === undefined  || !allowedTypes.includes(data.type)) {
    throw new Error("Product type is not valid")
  }
  

  if(data.type === "simple") {
  if (data.price === undefined) {
    throw new Error(
      "Simple products require a price",
    );

    if (data.stock === undefined) {
      throw new Error(
        "Simple products require stock quantity",
      );
    }

    if (data.sku === undefined) {
      throw new Error(
        "Simple products require a SKU",
      );
    }
  }
  }

  return ProductRepository.create(storeId, data);
};

const getProduct = async (
  productId: string,
  storeId: string,
) => {
  const product =
    await ProductRepository.findByIdAndStore(
      productId,
      storeId,
    );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

const getProducts = async (
  storeId: string,
) => {
  return ProductRepository.findByStore(storeId);
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

  return ProductRepository.update(
    productId,
    storeId,
    data,
  );
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

  return product;
};

export const ProductService = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};