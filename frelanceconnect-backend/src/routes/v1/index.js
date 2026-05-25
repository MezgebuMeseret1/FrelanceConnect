import express from "express";
import authRoutes from "../../modules/auth/auth.routes.js";
import jobRoutes from "../../modules/job/job.routes.js";
import proposalRoutes from "../../modules/proposal/proposal.routes.js";
import contractRoutes from "../../modules/contract/contract.routes.js";
import milestoneRoutes from "../../modules/milestone/milestone.routes.js";
import walletRoutes from "../../modules/wallet/wallet.routes.js";
import transactionRoutes from "../../modules/transaction/transaction.routes.js";
import messageRoutes from "../../modules/message/message.routes.js";
import notificationRoutes from "../../modules/notification/notification.routes.js";
import reviewRoutes from "../../modules/review/review.routes.js";
import disputeRoutes from "../../modules/dispute/dispute.routes.js";
import profileRoutes from "../../modules/profile/profile.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/jobs", jobRoutes);
router.use("/proposals", proposalRoutes);
router.use("/contracts", contractRoutes);
router.use("/milestones", milestoneRoutes);
router.use("/wallet", walletRoutes);
router.use("/transactions", transactionRoutes);
router.use("/messages", messageRoutes);
router.use("/notifications", notificationRoutes);
router.use("/reviews", reviewRoutes);
router.use("/disputes", disputeRoutes);
router.use("/profiles", profileRoutes);

export default router;