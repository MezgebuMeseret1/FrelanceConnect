import * as repo from "./dispute.repository.js";
import prisma from "../../core/config/db.js";

// CREATE DISPUTE
export const createDispute = async ({
  contractId,
  openedById,
  reason,
  description
}) => {
  const contract = await prisma.contract.findUnique({
    where: { id: contractId }
  });

  if (!contract) throw new Error("Contract not found");

  // Only client or freelancer can open dispute
  if (
    contract.clientId !== openedById &&
    contract.freelancerId !== openedById
  ) {
    throw new Error("Not allowed");
  }

  return repo.create({
    contractId,
    openedById,
    reason,
    description
  });
};

// GET USER DISPUTES
export const getMyDisputes = (userId) => {
  return repo.findByUser(userId);
};

// ADMIN RESOLVE
export const resolveDispute = async ({
  disputeId,
  adminId,
  resolution,
  status
}) => {
  const dispute = await repo.findById(disputeId);

  if (!dispute) throw new Error("Dispute not found");

  return repo.updateStatus(disputeId, {
    status,
    resolution,
    resolvedBy: adminId
  });
};