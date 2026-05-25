import express from "express";
import * as jobController from "./job.controller.js";
import { authMiddleware } from "../../core/middleware/auth.middleware.js";
import { roleMiddleware } from "../../core/middleware/role.middleware.js";

const router = express.Router();

// PUBLIC
router.get("/", jobController.getJobs);
router.get("/:id", jobController.getJob);

// PROTECTED (CLIENT ONLY)
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["CLIENT"]),
  jobController.createJob
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["CLIENT"]),
  jobController.updateJob
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["CLIENT"]),
  jobController.deleteJob
);

export default router;