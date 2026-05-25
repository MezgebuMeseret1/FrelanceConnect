import express from "express";

import {
  createMilestone,
  getContractMilestones,
  getMilestoneById,
  updateMilestone,
  updateMilestoneStatus,
  deleteMilestone,
  fundMilestone,
  releaseMilestone,
} from "./milestone.controller.js";

import { authMiddleware } from "../../core/middleware/auth.middleware.js";
import { roleMiddleware } from "../../core/middleware/role.middleware.js";

const router = express.Router();

/* ======================================================
   CREATE MILESTONE (CLIENT ONLY)
====================================================== */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("CLIENT"),
  createMilestone
);

/* ======================================================
   GET ALL MILESTONES FOR CONTRACT (CLIENT + FREELANCER)
====================================================== */
router.get(
  "/contract/:contractId",
  authMiddleware,
  getContractMilestones
);

/* ======================================================
   GET SINGLE MILESTONE
====================================================== */
router.get(
  "/:id",
  authMiddleware,
  getMilestoneById
);

/* ======================================================
   UPDATE MILESTONE (CLIENT ONLY)
====================================================== */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("CLIENT"),
  updateMilestone
);

/* ======================================================
   STATUS UPDATE (FREELANCER + CLIENT CONTROLLED FLOW)
   (You should restrict this in controller too)
====================================================== */
router.patch(
  "/:id/status",
  authMiddleware,
  updateMilestoneStatus
);

/* ======================================================
   FUND MILESTONE → CLIENT ONLY (ESCROW ENTRY)
====================================================== */
router.patch(
  "/:id/fund",
  authMiddleware,
  roleMiddleware("CLIENT"),
  fundMilestone
);

/* ======================================================
   RELEASE PAYMENT → CLIENT ONLY (ESCROW EXIT)
====================================================== */
router.patch(
  "/:id/release",
  authMiddleware,
  roleMiddleware("CLIENT"),
  releaseMilestone
);

/* ======================================================
   DELETE MILESTONE (CLIENT ONLY)
====================================================== */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("CLIENT"),
  deleteMilestone
);

export default router;