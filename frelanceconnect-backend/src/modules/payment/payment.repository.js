import prisma from "../../core/config/db.js";

export const createPayment = (data) => {
  return prisma.transaction.create({ data });
};