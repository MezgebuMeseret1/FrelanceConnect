import { Router } from "express";
import {
  getMyProfile,
  updateFreelancerProfile,
  updateEmployerProfile,
  getPublicFreelancerProfile,
  updateAvatar,
} from "./profile.controller.js";

import { authMiddleware } from "../../core/middleware/auth.middleware.js";
import { upload } from "../../core/middleware/upload.middleware.js";

const router = Router();

// GET
router.get("/me", authMiddleware, getMyProfile);

// AVATAR (IMPORTANT)
router.put(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  updateAvatar
);

// FREELANCER PROFILE (FIXED)
router.put(
  "/freelancer",
  authMiddleware,
  upload.single("avatar"), // only if you upload avatar here too
  updateFreelancerProfile
);

// EMPLOYER
router.put(
  "/employer",
  authMiddleware,
  upload.single("avatar"),
  updateEmployerProfile
);

// PUBLIC PROFILE
router.get("/freelancer/:id", getPublicFreelancerProfile);
router.put("/employer", authMiddleware, updateEmployerProfile);
export default router;