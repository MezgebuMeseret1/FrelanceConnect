import prisma from "../../core/config/db.js";

// Get wallet by user
export const findByUserId = (userId) => {
  return prisma.wallet.findUnique({
    where: { userId },
    include: { transactions: true }
  });
};

// Create wallet (used on user registration)
export const create = (userId) => {
  return prisma.wallet.create({
    data: { userId }
  });
};

// Update balance
export const updateBalance = (walletId, amount) => {
  return prisma.wallet.update({
    where: { id: walletId },
    data: {
      balance: { increment: amount }
    }
  });
};

// Create transaction
export const createTransaction = (data) => {
  return prisma.transaction.create({
    data
  });
};