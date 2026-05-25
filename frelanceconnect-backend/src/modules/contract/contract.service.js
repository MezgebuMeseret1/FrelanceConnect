// src/modules/contract/contract.service.js
import prisma from "../../core/config/db.js";

// CREATE CONTRACT (auto from proposal ACCEPT)
export const createContract = async ({
  proposalId,
  jobId,
  clientId,
  freelancerId,
}) => {
  return await prisma.contract.create({
    data: {
      proposalId,
      jobId,
      clientId,
      freelancerId,
      status: "ACTIVE",
    },
    include: {
      job: true,
      proposal: true,
      freelancer: true,
      client: true,
    },
  });
};

// GET SINGLE CONTRACT
export const getContractById = async (id) => {
  return await prisma.contract.findUnique({
    where: { id: Number(id) },
    include: {
      job: true,
      proposal: true,
      milestones: true,
      freelancer: true,
      client: true,
    },
  });
};

// GET MY CONTRACTS (CLIENT OR FREELANCER)
export const getMyContracts = async (userId, role) => {
  return await prisma.contract.findMany({
    where:
      role === "FREELANCER"
        ? { freelancerId: userId }
        : { clientId: userId },

    include: {
      job: true,
      proposal: true,
      milestones: true,
    },
    orderBy: { createdAt: "desc" },
  });
};