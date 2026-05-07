import { Router } from 'express';
import {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from './cart.controller';

import { verifyJWT } from '../../middleware/auth.middleware';

const router = Router();

router.use(verifyJWT);

router.get('/', getCartItems);
router.post('/items', addToCart);
router.patch('/items/:id', updateCartItem);
router.delete('/items/:id', removeCartItem);
router.delete('/', clearCart);

export default router;