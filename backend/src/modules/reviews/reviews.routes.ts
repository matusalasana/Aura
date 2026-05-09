import { Router } from 'express';
import { ReviewController } from './reviews.controller';
import { verifyJWT } from '../../middleware/auth.middleware';

const router = Router();

router.get('/products/:productId', ReviewController.getProductReviews);
router.get('/me', verifyJWT, ReviewController.getUserReviews);
router.post('/', verifyJWT, ReviewController.createReview);
router.patch('/:id', verifyJWT, ReviewController.updateReview);
router.delete('/:id', verifyJWT, ReviewController.deleteReview);

export default router;
