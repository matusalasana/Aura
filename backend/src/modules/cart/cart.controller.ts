import { Request, Response } from 'express';
import { 
  getCartItemsService, 
  addToCartService,
  updateCartItemService, 
  removeCartItemService, 
  clearCartService
} from './cart.service';

export const getCartItems = async (req: Request, res: Response) => {
  try {
    const cart = await getCartItemsService(req.user.id);

    return res.status(200).json(cart);
  } catch (error: any) {
    console.log(error.message);

    return res.status(500).json({
      message: 'Failed to get cart items',
    });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const cartItem = await addToCartService(
      req.user.id,
      req.body
    );

    return res.status(201).json(cartItem);
  } catch (error: any) {
    console.log(error.message);

    return res.status(500).json({
      message: 'Failed to add item to cart',
    });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const cartItem = await updateCartItemService(
      req.params.id,
      req.user.id,
      req.body
    );

    return res.status(200).json(cartItem);
  } catch (error: any) {
    console.log(error.message);

    return res.status(500).json({
      message: 'Failed to update cart item',
    });
  }
};

export const removeCartItem = async (req: Request, res: Response) => {
  try {
    await removeCartItemService(req.params.id, req.user!.id);

    return res.status(200).json({
      message: 'Cart item removed successfully',
    });
  } catch (error: any) {
    console.log(error.message);

    return res.status(500).json({
      message: 'Failed to remove cart item',
    });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    await clearCartService(req.user!.id);

    return res.status(200).json({
      message: 'Cart cleared',
    });
  } catch (error: any) {
    console.log(error.message);

    return res.status(500).json({
      message: 'Failed to clear cart',
    });
  }
};