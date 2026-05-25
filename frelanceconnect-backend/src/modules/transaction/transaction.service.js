import * as repo from "./transaction.repository.js";
import prisma from "../../core/config/db.js";

// Get my transactions
export const getMyTransactions = async (userId) => {
  return repo.findByUser(userId);
};

// Get transaction details
export const getTransaction = async (id) => {
  const txn = await repo.findById(id);

  if (!txn) throw new Error("Transaction not found");

  return txn;
};

// (Optional) Admin: get all transactions
export const getAllTransactions = async () => {
  return prisma.transaction.findMany({
    orderBy: { createdAt: "desc" }
  });
};