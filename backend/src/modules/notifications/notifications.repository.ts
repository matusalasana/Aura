import { sql } from "../../config/db.js";

// GET BY USER ID
export const getNotificationsByUserIdRepo = async (userId: string) => {
  return await sql`
    SELECT *
    FROM notifications
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;
};


// MARK AS READ
export const markNotificationAsReadRepo = async (id: string, userId: string) => {
  const result = await sql`
    UPDATE notifications
    SET is_read = true
    WHERE id = ${id}
      AND user_id = ${userId}
    RETURNING *;
  `;

  return result[0];
};


// CREATE
export const createNotificationRepo = async (
  userId: string,
  title: string,
  message: string,
  type: string = "info"
) => {
  const result = await sql`
    INSERT INTO notifications (
      user_id,
      title,
      message,
      type
    )
    VALUES (
      ${userId},
      ${title},
      ${message},
      ${type}
    )
    RETURNING *;
  `;

  return result[0];
};


// GET ALL (ADMIN)
export const getAllNotificationsRepo = async () => {
  return await sql`
    SELECT 
      n.*,
      u.full_name as user_name
    FROM notifications n
    JOIN users u ON n.user_id = u.id
    ORDER BY n.created_at DESC
  `;
};


// DELETE
export const deleteNotificationRepo = async (id: string) => {
  await sql`
    DELETE FROM notifications
    WHERE id = ${id};
  `;
};