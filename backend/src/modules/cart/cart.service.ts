import {
  getCartItemsRepo,
  addToCartRepo,
  updateCartItemRepo,
  removeCartItemRepo,
  clearCartRepo,
  findProductByIdRepo,
} from "./cart.repository";

import type {
  AddToCartInput,
  UpdateCartInput,
} from "./cart.validation";

// GET
export const getCartItemsService = async (
  userId: string
) => {
  return await getCartItemsRepo(userId);
};

// ADD
export const addToCartService = async (
  userId: string,
  data: AddToCartInput
) => {
  const { productId, quantity } = data;

  const product = await findProductByIdRepo(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  return await addToCartRepo(
    quantity,
    productId,
    userId
  );
};

// UPDATE
export const updateCartItemService = async (
  productId: string,
  userId: string,
  data: UpdateCartInput
) => {
  const { quantity } = data;

  const updated = await updateCartItemRepo(
    quantity,
    productId,
    userId
  );

  if (!updated) {
    throw new Error("Cart item not found");
  }

  return updated;
};

// REMOVE
export const removeCartItemService = async (
  productId: string,
  userId: string
) => {
  const deleted = await removeCartItemRepo(
    productId,
    userId
  );

  if (!deleted) {
    throw new Error("Cart item not found");
  }
};

// CLEAR
export const clearCartService = async (
  userId: string
) => {
  await clearCartRepo(userId);
};