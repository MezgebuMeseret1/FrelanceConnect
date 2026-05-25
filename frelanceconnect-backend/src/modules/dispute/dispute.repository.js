import prisma from "../../core/config/db.js";

export const create = (data) => {
  return prisma.dispute.create({ data });
};

export const findById = (id) => {
  return prisma.dispute.findUnique({ where: { id: Number(id) } });
};

export const findByUser = (userId) => {
  return prisma.dispute.findMany({
    where: {
      OR: [
        { openedById: userId },
        { contract: { clientId: userId } },
        { contract: { freelancerId: userId } }
      ]
    },
    include: { contract: true },
    orderBy: { createdAt: "desc" }
  });
};

export const updateStatus = (id, data) => {
  return prisma.dispute.update({
    where: { id: Number(id) },
    data
  });
};