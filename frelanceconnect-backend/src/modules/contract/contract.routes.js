import express from "express";
import * as controller from "./contract.controller.js";
import { authMiddleware } from "../../core/middleware/auth.middleware.js";
import { roleMiddleware } from "../../core/middleware/role.middleware.js";

const router = express.Router();

// CREATE CONTRACT
router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["CLIENT"]),
  controller.createContract
);

// GET MY CONTRACTS
router.get(
  "/me",
  authMiddleware,
  controller.getMyContracts
);

// GET SINGLE CONTRACT
router.get(
  "/:id",
  authMiddleware,
  controller.getContract
);

export default router;