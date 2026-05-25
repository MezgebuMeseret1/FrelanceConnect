import prisma from "../config/db.js";

export const prismaTransaction = async (callback) => {
  return await prisma.$transaction(async (tx) => {
    return await callback(tx);
  });
};