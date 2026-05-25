import prisma from "../../core/config/db.js";

// create notification
export const create = (data) => {
  return prisma.notification.create({ data });
};

// get user notifications
export const findByUser = (userId) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });
};

// mark as read
export const markAsRead = (id) => {
  return prisma.notification.update({
    where: { id: Number(id) },
    data: { isRead: true }
  });
};