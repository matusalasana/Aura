import { Router } from 'express';
import { PaymentController } from './payments.controller';
import { verifyJWT } from '../../middleware/auth.middleware';

const router = Router();

router.post('/intent', verifyJWT, PaymentController.createIntent);
router.post('/confirm', verifyJWT, PaymentController.confirmPayment);
router.post('/webhook', PaymentController.webhook);

export default router;
