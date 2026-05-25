import { Request, Response } from 'express';
import {
  getMyNotificationsService,
  markNotificationReadService,
  getAllNotificationsService,
  sendNotificationService,
  deleteNotificationService,
} from './notifications.service.js';

// GET MY NOTIFICATIONS
const getMyNotifications = async (req: Request, res: Response) => {
  try {
    const list = await getMyNotificationsService(req.user!.id);

    return res.status(200).json(list);
  } catch (err: any) {
    console.log('Get notifications error:', err.message);

    return res.status(500).json({
      message: `Get notifications error: ${err.message}`,
    });
  }
};

// MARK AS READ
const markNotificationRead = async (req: Request, res: Response) => {
  try {
    const notification = await markNotificationReadService(
      req.params.id,
      req.user!.id
    );

    return res.status(200).json(notification);
  } catch (err: any) {
    console.log('Mark notification error:', err.message);

    return res.status(400).json({
      message: `Mark notification error: ${err.message}`,
    });
  }
};

// GET ALL (ADMIN)
const getAllNotifications = async (req: Request, res: Response) => {
  try {
    const list = await getAllNotificationsService();

    return res.status(200).json(list);
  } catch (err: any) {
    console.log('Get all notifications error:', err.message);

    return res.status(500).json({
      message: `Get all notifications error: ${err.message}`,
    });
  }
};

// CREATE (ADMIN)
const createNotification = async (req: Request, res: Response) => {
  try {
    const { userId, title, message, type } = req.body;

    const notification = await sendNotificationService(
      userId,
      title,
      message,
      type
    );

    return res.status(201).json(notification);
  } catch (err: any) {
    console.log('Create notification error:', err.message);

    return res.status(400).json({
      message: `Create notification error: ${err.message}`,
    });
  }
};

// DELETE
const deleteNotification = async (req: Request, res: Response) => {
  try {
    await deleteNotificationService(req.params.id);

    return res.status(200).json({
      message: 'Notification deleted',
    });
  } catch (err: any) {
    console.log('Delete notification error:', err.message);

    return res.status(400).json({
      message: `Delete notification error: ${err.message}`,
    });
  }
};

export const NotificationController = {
  getMyNotifications,
  markNotificationRead,
  getAllNotifications,
  createNotification,
  deleteNotification,
};