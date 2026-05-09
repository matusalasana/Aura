import { Request, Response } from 'express';
import {
  getMyNotificationsService,
  markNotificationReadService,
  getAllNotificationsService,
  sendNotificationService,
  deleteNotificationService,
} from './notifications.service.js';
import { ApiResponse } from '../../utils/ApiResponse.js';


// GET MY NOTIFICATIONS
export const getMyNotifications = async (req: Request, res: Response) => {
  try {
    const list = await getMyNotificationsService(req.user!.id);

    return res
      .status(200)
      .json(ApiResponse(200, list, 'Notifications fetched successfully'));
  } catch (err: any) {
    console.log('Get notifications error:', err.message);

    return res.status(500).json({ message: err.message });
  }
};


// MARK AS READ
export const markNotificationRead = async (req: Request, res: Response) => {
  try {
    const notification = await markNotificationReadService(
      req.params.id,
      req.user!.id
    );

    return res
      .status(200)
      .json(ApiResponse(200, notification, 'Notification marked as read'));
  } catch (err: any) {
    console.log('Mark notification error:', err.message);

    return res.status(400).json({ message: err.message });
  }
};


// GET ALL (ADMIN)
export const getAllNotifications = async (req: Request, res: Response) => {
  try {
    const list = await getAllNotificationsService();

    return res
      .status(200)
      .json(ApiResponse(200, list, 'Admin notifications fetched'));
  } catch (err: any) {
    console.log('Get all notifications error:', err.message);

    return res.status(500).json({ message: err.message });
  }
};


// CREATE (ADMIN)
export const createNotification = async (req: Request, res: Response) => {
  try {
    const { userId, title, message, type } = req.body;

    const notification = await sendNotificationService(
      userId,
      title,
      message,
      type
    );

    return res
      .status(201)
      .json(ApiResponse(201, notification, 'Notification created'));
  } catch (err: any) {
    console.log('Create notification error:', err.message);

    return res.status(400).json({ message: err.message });
  }
};


// DELETE
export const deleteNotification = async (req: Request, res: Response) => {
  try {
    await deleteNotificationService(req.params.id);

    return res
      .status(200)
      .json(ApiResponse(200, {}, 'Notification deleted'));
  } catch (err: any) {
    console.log('Delete notification error:', err.message);

    return res.status(400).json({ message: err.message });
  }
};