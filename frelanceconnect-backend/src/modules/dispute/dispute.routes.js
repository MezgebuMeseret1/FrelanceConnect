import express from "express";
import * as controller from "./dispute.controller.js";
import { authMiddleware } from "../../core/middleware/auth.middleware.js";
import { roleMiddleware } from "../../core/middleware/role.middleware.js";

const router = express.Router();

// create dispute
router.post("/", authMiddleware, controller.createDispute);

// get my disputes
router.get("/", authMiddleware, controller.getMyDisputes);

// admin resolve dispute
router.patch(
  "/:id/resolve",
  authMiddleware,
  roleMiddleware("ADMIN"),
  controller.resolveDispute
);

export default router;