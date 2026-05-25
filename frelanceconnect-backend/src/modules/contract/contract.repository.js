import prisma from "../../core/config/db.js";

export const create = (data) => {
  return prisma.contract.create({ data });
};

export const findById = (id) => {
  return prisma.contract.findUnique({
    where: { id: Number(id) },
    include: {
      milestones: true,
      job: true,
      proposal: true
    }
  });
};

export const findByClient = (clientId) => {
  return prisma.contract.findMany({
    where: { clientId }
  });
};