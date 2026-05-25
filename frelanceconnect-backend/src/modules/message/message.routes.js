import express from "express";
import * as controller from "./message.controller.js";
import { authMiddleware } from "../../core/middleware/auth.middleware.js";
const router = express.Router();

// 🔐 send message
router.post("/", authMiddleware, controller.sendMessage);


// 💬 get conversation between 2 users
router.get("/conversation/:otherUserId", authMiddleware, controller.getConversation);

// 📩 get my messages
router.get("/", authMiddleware, controller.getMyMessages);

export default router;