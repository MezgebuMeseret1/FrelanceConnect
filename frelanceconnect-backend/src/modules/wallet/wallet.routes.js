import express from "express";
import * as controller from "./wallet.controller.js";
import { authMiddleware } from "../../core/middleware/auth.middleware.js";
import { roleMiddleware } from "../../core/middleware/role.middleware.js";

const router = express.Router();

// Get wallet
router.get("/", authMiddleware, controller.getWallet);

// Deposit money (CLIENT)
router.post(
  "/deposit",
  authMiddleware,
  roleMiddleware(["CLIENT"]),
  controller.deposit
);

// Hold funds (CLIENT)
router.post(
  "/hold",
  authMiddleware,
  roleMiddleware(["CLIENT"]),
  controller.holdFunds
);

// Release funds (CLIENT → FREELANCER)
router.post(
  "/release",
  authMiddleware,
  roleMiddleware(["CLIENT"]),
  controller.releaseFunds
);

export default router;