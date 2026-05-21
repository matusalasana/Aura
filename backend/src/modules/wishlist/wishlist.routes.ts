import { Router } from 'express';
import { WishlistController } from './wishlist.controller';
import { verifyJWT } from '../../middleware/auth.middleware';

const router = Router();

router.use(verifyJWT);

router.get('/', WishlistController.getWishlistItems);
router.post('/', WishlistController.addToWishlist);
router.delete('/:productId', WishlistController.removeFromWishlist);

export default router;