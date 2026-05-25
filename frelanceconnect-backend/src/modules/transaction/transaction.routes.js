import express from "express";
import * as controller from "./transaction.controller.js";
import { authMiddleware } from "../../core/middleware/auth.middleware.js";
import { roleMiddleware } from "../../core/middleware/role.middleware.js";

const router = express.Router();

// My transactions
router.get("/", authMiddleware, controller.getMyTransactions);

// Get single transaction
router.get("/:id", authMiddleware, controller.getTransaction);

// Admin only: all transactions
router.get(
  "/admin/all",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  controller.getAllTransactions
);

export default router;