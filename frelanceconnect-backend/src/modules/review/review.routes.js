import express from "express";
import * as controller from "./review.controller.js";
import { authMiddleware } from "../../core/middleware/auth.middleware.js";

const router = express.Router();

// create review
router.post("/", authMiddleware, controller.createReview);

// get reviews for user
router.get("/user/:userId", controller.getUserReviews);

export default router;