import express from "express";
import * as controller from "./notification.controller.js";
import { authMiddleware } from "../../core/middleware/auth.middleware.js";

const router = express.Router();

// get my notifications
router.get("/", authMiddleware, controller.getNotifications);

// mark notification as read
router.patch("/:id/read", authMiddleware, controller.markAsRead);

export default router;