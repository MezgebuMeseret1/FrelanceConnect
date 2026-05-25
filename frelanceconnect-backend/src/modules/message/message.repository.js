import prisma from "../../core/config/db.js";

export const create = (data) => {
  return prisma.message.create({
    data,
  });
};

export const getConversation = (userId, otherUserId) => {
  return prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

export const getUserMessages = (userId) => {
  return prisma.message.findMany({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};