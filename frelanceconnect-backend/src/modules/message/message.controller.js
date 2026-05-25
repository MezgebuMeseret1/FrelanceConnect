import * as service from "./message.service.js";

// Send message
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id; // from auth middleware
    const { receiverId, content } = req.body;

    const message = await service.sendMessage({
      senderId,
      receiverId,
      content,
    });

    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get conversation between 2 users
export const getConversation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUserId } = req.params;

    const messages = await service.getConversation(userId, Number(otherUserId));

    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get my messages
export const getMyMessages = async (req, res) => {
  try {
    const userId = req.user.id;

    const messages = await service.getMyMessages(userId);

    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};