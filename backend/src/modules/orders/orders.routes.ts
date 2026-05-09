import { Router } from 'express';
import { OrderController } from './orders.controller';
import { verifyJWT, authorize } from '../../middleware/auth.middleware';

const router = Router();

router.use(verifyJWT);

router.post('/', OrderController.createOrder);
router.get('/', OrderController.getUserOrders);
router.get('/:id', OrderController.getOrderDetails);

// Admin
router.get('/admin/all', authorize('admin'), OrderController.getAllOrders);
router.patch('/:id/status', authorize('admin'), OrderController.updateOrderStatus);

export default router;
