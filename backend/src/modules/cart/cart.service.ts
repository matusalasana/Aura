import { 
  getCartItemsRepo,
  addToCartRepo,
  updateCartItemRepo,
  removeCartItemRepo,
  clearCartRepo,
  findProductByIdRepo
} from './cart.repository';


// GET ALL
export const getCartItemsService = async (userId: string) => {
  if (!userId || userId === null || userId === undefined) {
    throw new Error("User id is required");
  }

  const result = await getCartItemsRepo(userId);

  return result;
};


// ADD
export const addToCartService = async (
  userId: string,
  data: any
) => {
  const { productId, quantity } = data;

  const normalizedProductId = productId as string;
  const normalizedQuantity = Number(quantity);

  if (!normalizedProductId) {
    throw new Error("Product id not found");
  }

  if (!normalizedQuantity || isNaN(normalizedQuantity)) {
    throw new Error("Quantity not found");
  }

  if (!userId || userId === null || userId === undefined) {
    throw new Error("User id is required");
  }

  const exists = await findProductByIdRepo(normalizedProductId);

  if (!exists) {
    throw new Error("Product not found");
  }

  const result = await addToCartRepo(
    normalizedQuantity,
    normalizedProductId,
    userId
  );

  return result;
};


// UPDATE
export const updateCartItemService = async (
  productId: string,
  userId: string,
  data: any
) => {
  const { quantity } = data;

  const normalizedQuantity = Number(quantity);
  const normalizedProductId = productId as string;

  const exists = await findProductByIdRepo(normalizedProductId);

  if (!normalizedProductId) {
    throw new Error("Product id not found");
  }

  if (!normalizedQuantity || isNaN(normalizedQuantity)) {
    throw new Error("Quantity not found");
  }

  if (!userId || userId === null || userId === undefined) {
    throw new Error("User id is required");
  }

  if (!exists) {
    throw new Error("Product not found");
  }

  const result = await updateCartItemRepo(
    normalizedQuantity,
    normalizedProductId,
    userId
  );

  return result;
};


// REMOVE
export const removeCartItemService = async (
  productId: string,
  userId: string
) => {
  const normalizedProductId = productId as string;

  if (!normalizedProductId) {
    throw new Error("Product id not found");
  }

  if (!userId || userId === null || userId === undefined) {
    throw new Error("User id is required");
  }

  const exists = await findProductByIdRepo(normalizedProductId);

  if (!exists) {
    throw new Error("Product not found");
  }

  await removeCartItemRepo(
    normalizedProductId,
    userId
  );
};


// CLEAR
export const clearCartService = async (userId: string) => {
  if (!userId || userId === null || userId === undefined) {
    throw new Error("User id is required");
  }

  await clearCartRepo(userId);
};