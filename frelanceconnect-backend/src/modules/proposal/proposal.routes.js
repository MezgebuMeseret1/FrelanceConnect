import express from "express";
import * as controller from "./proposal.controller.js";
import { authMiddleware } from "../../core/middleware/auth.middleware.js";
import { roleMiddleware } from "../../core/middleware/role.middleware.js";

const router = express.Router();

// FREELANCER submits proposal
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["FREELANCER"]),
  controller.createProposal
);

// FREELANCER sees OWN proposals ✅ FIXED
router.get(
  "/me",
  authMiddleware,
  roleMiddleware(["FREELANCER"]),
  controller.getMyProposals
);

// CLIENT sees proposals for a job
router.get(
  "/job/:jobId",
  authMiddleware,
  roleMiddleware(["CLIENT"]),
  controller.getJobProposals
);

// CLIENT accepts/rejects proposal
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware(["CLIENT"]),
  controller.updateStatus
);

export default router;