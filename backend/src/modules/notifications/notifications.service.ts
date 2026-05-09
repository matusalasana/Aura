import {
  getNotificationsByUserIdRepo,
  markNotificationAsReadRepo,
  createNotificationRepo,
  getAllNotificationsRepo,
  deleteNotificationRepo,
} from './notifications.repository.js';


// GET MY
export const getMyNotificationsService = async (userId: string) => {
  return await getNotificationsByUserIdRepo(userId);
};


// MARK READ
export const markNotificationReadService = async (id: string, userId: string) => {
  return await markNotificationAsReadRepo(id, userId);
};


// CREATE
export const sendNotificationService = async (
  userId: string,
  title: string,
  message: string,
  type?: string
) => {
  return await createNotificationRepo(userId, title, message, type);
};


// GET ALL
export const getAllNotificationsService = async () => {
  return await getAllNotificationsRepo();
};


// DELETE
export const deleteNotificationService = async (id: string) => {
  await deleteNotificationRepo(id);
};