import prisma from "../../core/config/db.js";

// Get all transactions for a wallet
export const findByWallet = (walletId) => {
  return prisma.transaction.findMany({
    where: { walletId },
    orderBy: { createdAt: "desc" }
  });
};

// Get transactions by user (via wallet)
export const findByUser = (userId) => {
  return prisma.transaction.findMany({
    where: {
      wallet: {
        userId
      }
    },
    orderBy: { createdAt: "desc" }
  });
};

// Get single transaction
export const findById = (id) => {
  return prisma.transaction.findUnique({
    where: { id: Number(id) }
  });
};

// Create transaction (used internally mostly)
export const create = (data) => {
  return prisma.transaction.create({ data });
};