import express from "express";
import * as controller from "./payment.controller.js";
import { chapaWebhook } from "./payment.webhook.js";
import { authMiddleware } from "../../core/middleware/auth.middleware.js";

const router = express.Router();

// initiate payment
router.post(
  "/initiate",
  authMiddleware,
  controller.initiatePayment
);

// webhook (NO auth)
router.post("/webhook", chapaWebhook);

export default router;