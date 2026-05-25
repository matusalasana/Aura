import { Router } from 'express';
import { verifyJWT, authorize } from '../../middleware/auth.middleware';

import { NotificationController } from './notifications.controller.js';

const router = Router();

router.use(verifyJWT);

router.get('/me', NotificationController.getMyNotifications);
router.patch('/:id/read', NotificationController.markNotificationRead);

// ADMIN
router.get('/admin/all', authorize('admin'), NotificationController.getAllNotifications);
router.post('/admin', authorize('admin'), NotificationController.createNotification);
router.delete('/admin/:id', authorize('admin'), NotificationController.deleteNotification);

export default router;