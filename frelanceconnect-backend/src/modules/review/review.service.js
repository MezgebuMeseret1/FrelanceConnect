import * as repo from "./review.repository.js";
import prisma from "../../core/config/db.js";

// CREATE REVIEW
export const createReview = async ({
  contractId,
  reviewerId,
  revieweeId,
  rating,
  comment
}) => {
  // 1. validate contract
  const contract = await prisma.contract.findUnique({
    where: { id: contractId }
  });

  if (!contract) throw new Error("Contract not found");

  if (contract.status !== "COMPLETED") {
    throw new Error("Contract must be completed");
  }

  // 2. prevent duplicate review
  const existing = await repo.findExisting(contractId, reviewerId);
  if (existing) throw new Error("Review already submitted");

  // 3. create review
  return repo.create({
    contractId,
    reviewerId,
    revieweeId,
    rating,
    comment
  });
};

// GET USER REVIEWS
export const getUserReviews = (userId) => {
  return repo.findByUser(userId);
};