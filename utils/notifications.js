import Notification from "../models/Notification.js";

export async function createNotification({ userId, title, message, ticketId = null }) {
  return Notification.create({
    user: userId,
    title,
    message,
    ticket: ticketId,
  });
}
