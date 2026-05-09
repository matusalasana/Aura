import { Router } from 'express';
import { verifyJWT, authorize } from '../../middleware/auth.middleware';

import {
  getAnalyticsOverview,
  getRevenueAnalytics,
  getTopProductsAnalytics,
  getUserAnalytics,
} from './analytics.controller.js';

const router = Router();

router.use(verifyJWT, authorize('admin'));

router.get('/overview', getAnalyticsOverview);
router.get('/revenue', getRevenueAnalytics);
router.get('/top-products', getTopProductsAnalytics);
router.get('/users', getUserAnalytics);

export default router;