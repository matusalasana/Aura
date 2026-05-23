import { Router } from 'express';
import { verifyJWT, authorize } from '../../middleware/auth.middleware';

import { AnalyticsController } from './analytics.controller.js';

const router = Router();

router.use(verifyJWT, authorize('admin'));

router.get('/overview', AnalyticsController.getAnalyticsOverview);
router.get('/revenue', AnalyticsController.getRevenueAnalytics);
router.get('/top-products', AnalyticsController.getTopProductsAnalytics);
router.get('/users', AnalyticsController.getUserAnalytics);

export default router;