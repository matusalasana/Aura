import { Router } from "express";

import {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "./cart.controller";

import { verifyJWT } from "../../middleware/auth.middleware";

import { validate } from "../../middleware/validation.middleware";

import {
  addToCartSchema,
  updateCartSchema,
} from "./cart.validation";

const router = Router();

router.use(verifyJWT);

router.get("/", getCartItems);

router.post(
  "/items",
  validate(addToCartSchema),
  addToCart
);

router.patch(
  "/items/:productId",
  validate(updateCartSchema),
  updateCartItem
);

router.delete(
  "/items/:productId",
  removeCartItem
);

router.delete("/", clearCart);

export default router;