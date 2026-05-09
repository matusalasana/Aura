import { Router } from 'express';
import { verifyJWT, authorize } from '../../middleware/auth.middleware';

import {
  getMyNotifications,
  markNotificationRead,
  getAllNotifications,
  createNotification,
  deleteNotification,
} from './notifications.controller.js';

const router = Router();

router.use(verifyJWT);

router.get('/me', getMyNotifications);
router.patch('/:id/read', markNotificationRead);

// ADMIN
router.get('/admin/all', authorize('admin'), getAllNotifications);
router.post('/admin', authorize('admin'), createNotification);
router.delete('/admin/:id', authorize('admin'), deleteNotification);

export default router;