import { ProductRepository } from "@/modules/products/product.repository.js";
import { VariantRepository } from "@/modules/variants/variant.repository.js";

import type {
  CreateVariantInput,
  UpdateVariantInput,
} from "@/modules/products/variant.validations.js";

const createVariant = async (
  productId: string,
  storeId: string,
  data: CreateVariantInput[],
) => {
  const product =
    await ProductRepository.findByIdAndStore(
      productId,
      storeId,
    );

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.type !== "variant") {
    throw new Error(
      "Variants can only be added to variant products",
    );
  }

  const existing =
    await VariantRepository.findBySku(
      productId,
      data.sku,
    );

  if (existing) {
    throw new Error(
      "A variant with this SKU already exists",
    );
  }

  const dataToInsert = data.map((d) => ({
    ...d,
    productId,
  }));
  
  return VariantRepository.create(dataToInsert);
};

const getVariants = async (
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

  return VariantRepository.findByProduct(
    productId,
  );
};

const getVariant = async (
  productId: string,
  variantId: string,
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

  const variant =
    await VariantRepository.findByIdAndProduct(
      variantId,
      productId,
    );

  if (!variant) {
    throw new Error("Variant not found");
  }

  return variant;
};

const updateVariant = async (
  productId: string,
  variantId: string,
  storeId: string,
  data: UpdateVariantInput,
) => {
  const product =
    await ProductRepository.findByIdAndStore(
      productId,
      storeId,
    );

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.type !== "variant") {
    throw new Error(
      "Variants can only be updated for variant products",
    );
  }

  const variant =
    await VariantRepository.findByIdAndProduct(
      variantId,
      productId,
    );

  if (!variant) {
    throw new Error("Variant not found");
  }

  if (data.sku) {
    const existing =
      await VariantRepository.findBySku(
        productId,
        data.sku,
      );

    if (
      existing &&
      existing.id !== variantId
    ) {
      throw new Error(
        "A variant with this SKU already exists",
      );
    }
  }

  return VariantRepository.update(
    variantId,
    productId,
    data,
  );
};

const deleteVariant = async (
  productId: string,
  variantId: string,
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

  const variant =
    await VariantRepository.remove(
      variantId,
      productId,
    );

  if (!variant) {
    throw new Error("Variant not found");
  }

  return variant;
};

export const VariantService = {
  createVariant,
  getVariants,
  getVariant,
  updateVariant,
  deleteVariant,
};