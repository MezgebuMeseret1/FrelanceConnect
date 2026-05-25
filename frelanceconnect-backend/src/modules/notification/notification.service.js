import * as repo from "./notification.repository.js";

// create notification (used by other modules)
export const createNotification = ({ userId, type, message }) => {
  return repo.create({
    userId,
    type,
    message
  });
};

// get my notifications
export const getMyNotifications = (userId) => {
  return repo.findByUser(userId);
};

// mark read
export const markAsRead = (id) => {
  return repo.markAsRead(id);
};

