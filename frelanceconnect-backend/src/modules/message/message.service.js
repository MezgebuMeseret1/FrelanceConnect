import * as repo from "./message.repository.js";
import { createNotification } from "../notification/notification.service.js";

// Send message
export const sendMessage = async ({ senderId, receiverId, content }) => {
  if (!content) throw new Error("Message cannot be empty");
  if (!receiverId) throw new Error("receiverId is required");

  // 1. Save message
  const message = await repo.create({
    senderId,
    receiverId,
    content,
  });

  // 2. Create notification (SAFE INSIDE FUNCTION)
  await createNotification({
    userId: receiverId,
    type: "MESSAGE",
    message: "You received a new message",
  });

  return message;
};

// Get conversation
export const getConversation = async (userId, otherUserId) => {
  return repo.getConversation(userId, otherUserId);
};

// Get all messages for user
export const getMyMessages = async (userId) => {
  return repo.getUserMessages(userId);
};