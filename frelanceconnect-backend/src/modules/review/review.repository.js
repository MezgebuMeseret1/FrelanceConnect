import prisma from "../../core/config/db.js";

// create review
export const create = (data) => {
  return prisma.review.create({ data });
};

// get reviews for user
export const findByUser = (userId) => {
  return prisma.review.findMany({
    where: { revieweeId: userId },
    include: { reviewer: true },
    orderBy: { createdAt: "desc" }
  });
};

// check existing review
export const findExisting = (contractId, reviewerId) => {
  return prisma.review.findFirst({
    where: { contractId, reviewerId }
  });
};