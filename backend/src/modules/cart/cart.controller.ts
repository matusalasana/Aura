import { Request, Response } from "express";

import {
  getCartItemsService,
  addToCartService,
  updateCartItemService,
  removeCartItemService,
  clearCartService,
} from "./cart.service";

// GET CART
export const getCartItems = async (
  req: Request,
  res: Response
) => {
  try {
    const cart = await getCartItemsService(req.user!.id);

    return res.status(200).json({
      data: cart,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ADD
export const addToCart = async (
  req: Request,
  res: Response
) => {
  try {
    const cartItem = await addToCartService(
      req.user!.id,
      req.body
    );

    return res.status(201).json({
      message: "Item added to cart",
      data: cartItem,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// UPDATE
export const updateCartItem = async (
  req: Request,
  res: Response
) => {
  try {
    const cartItem = await updateCartItemService(
      req.params.productId,
      req.user!.id,
      req.body
    );

    return res.status(200).json({
      message: "Cart updated",
      data: cartItem,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// REMOVE
export const removeCartItem = async (
  req: Request,
  res: Response
) => {
  try {
    await removeCartItemService(
      req.params.productId,
      req.user!.id
    );

    return res.status(200).json({
      message: "Cart item removed",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// CLEAR
export const clearCart = async (
  req: Request,
  res: Response
) => {
  try {
    await clearCartService(req.user!.id);

    return res.status(200).json({
      message: "Cart cleared",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};