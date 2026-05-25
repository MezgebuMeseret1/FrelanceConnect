import prisma from "../../core/config/db.js";
import { prismaTransaction } from "../../core/utils/prismaTransaction.js";

// ======================================================
// HELPERS
// ======================================================
const transitions = {
  PENDING: "FUNDED",
  FUNDED: "IN_PROGRESS",
  IN_PROGRESS: "SUBMITTED",
  SUBMITTED: "APPROVED",
  APPROVED: "RELEASED",
};
const milestoneInclude = {
  contract: {
    include: {
      client: true,
      freelancer: true,
      job: true,
    },
  },
};

const parseId = (id) => Number(id);

// ======================================================
// CREATE MILESTONE
// ======================================================

export const createMilestone = async (milestoneData) => {
  try {
    const data = {
      ...milestoneData,
      amount: Number(milestoneData.amount),
      contractId: parseId(milestoneData.contractId),
      dueDate: milestoneData.dueDate
        ? new Date(milestoneData.dueDate)
        : null,
    };

    return await prisma.milestone.create({
      data,
      include: milestoneInclude,
    });
  } catch (error) {
    console.log("CREATE MILESTONE ERROR:", error);
    throw new Error(error.message || "Failed to create milestone");
  }
};

// ======================================================
// GET CONTRACT MILESTONES
// ======================================================

export const getContractMilestones = async (contractId) => {
  try {
    return await prisma.milestone.findMany({
      where: { contractId: parseId(contractId) },
      orderBy: { createdAt: "desc" },
      include: milestoneInclude,
    });
  } catch (error) {
    console.log("GET CONTRACT MILESTONES ERROR:", error);
    throw new Error(error.message || "Failed to fetch milestones");
  }
};

// ======================================================
// GET SINGLE MILESTONE
// ======================================================

export const getMilestoneById = async (id) => {
  try {
    const milestone = await prisma.milestone.findUnique({
      where: { id: parseId(id) },
      include: milestoneInclude,
    });

    if (!milestone) throw new Error("Milestone not found");

    return milestone;
  } catch (error) {
    console.log("GET MILESTONE ERROR:", error);
    throw new Error(error.message || "Failed to fetch milestone");
  }
};

// ======================================================
// UPDATE MILESTONE
// ======================================================

export const updateMilestone = async (id, updateData) => {
  try {
    const data = { ...updateData };

    if (updateData.amount)
      data.amount = Number(updateData.amount);

    if (updateData.dueDate)
      data.dueDate = new Date(updateData.dueDate);

    return await prisma.milestone.update({
      where: { id: parseId(id) },
      data,
      include: milestoneInclude,
    });
  } catch (error) {
    console.log("UPDATE MILESTONE ERROR:", error);
    throw new Error(error.message || "Failed to update milestone");
  }
};

// ======================================================
// UPDATE STATUS (SAFE FLOW CHECK)
// ======================================================

export const updateMilestoneStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "status is required",
      });
    }

    const result = await service.updateMilestoneStatus(id, status);

    return res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================================
// DELETE MILESTONE
// ======================================================

export const deleteMilestone = async (id) => {
  try {
    return await prisma.milestone.delete({
      where: { id: parseId(id) },
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);
    throw new Error(error.message || "Failed to delete milestone");
  }
};

// ======================================================
// 💰 FUND MILESTONE (ESCROW - ATOMIC)
// ======================================================

export const fundMilestone = async (milestoneId, clientId) => {
  const milestone = await prisma.milestone.findUnique({
    where: { id: Number(milestoneId) },
  });

  if (!milestone) throw new Error("Milestone not found");
  if (milestone.status !== "PENDING") {
    throw new Error("Only pending milestones can be funded");
  }

  const wallet = await prisma.wallet.findUnique({
    where: { userId: clientId },
  });

  if (!wallet) throw new Error("Wallet not found");

  if (wallet.balance < milestone.amount) {
    throw new Error("Insufficient balance");
  }

  return await prisma.$transaction(async (tx) => {
    await tx.wallet.update({
      where: { userId: clientId },
      data: {
        balance: { decrement: milestone.amount },
        heldBalance: { increment: milestone.amount },
      },
    });

    const updated = await tx.milestone.update({
      where: { id: milestone.id },
      data: { status: "FUNDED" },
    });

    await tx.transaction.create({
      data: {
        walletId: wallet.id,
        amount: milestone.amount,
        type: "DEBIT",
        description: "Milestone funding (escrow)",
      },
    });

    return updated;
  });
};

// ======================================================
// 💸 RELEASE MILESTONE (ESCROW PAYOUT)
// ======================================================

export const releaseMilestoneEscrow = async (milestoneId, clientId) => {
  return await prisma.$transaction(async (tx) => {
    const milestone = await tx.milestone.findUnique({
      where: { id: Number(milestoneId) },
      include: { contract: true },
    });

    if (!milestone) throw new Error("Milestone not found");

    if (milestone.status !== "APPROVED") {
      throw new Error("Milestone must be APPROVED before release");
    }

    const amount = Number(milestone.amount);

    const clientWallet = await tx.wallet.findUnique({
      where: { userId: clientId },
    });

    const freelancerWallet = await tx.wallet.findUnique({
      where: { userId: milestone.contract.freelancerId },
    });

    if (!clientWallet || !freelancerWallet) {
      throw new Error("Wallet missing");
    }

    if (clientWallet.heldBalance < amount) {
      throw new Error("Insufficient escrow funds");
    }

    // 1. release escrow
    await tx.wallet.update({
      where: { userId: clientId },
      data: {
        heldBalance: { decrement: amount },
      },
    });

    // 2. pay freelancer
    await tx.wallet.update({
      where: { userId: milestone.contract.freelancerId },
      data: {
        balance: { increment: amount },
      },
    });

    // 3. update milestone
    const updated = await tx.milestone.update({
      where: { id: milestone.id },
      data: { status: "RELEASED" },
    });

    // 4. transaction logs (BOTH SIDES)

    await tx.transaction.create({
      data: {
        walletId: freelancerWallet.id,
        amount,
        type: "CREDIT",
        description: `Milestone payment received`,
      },
    });

    await tx.transaction.create({
      data: {
        walletId: clientWallet.id,
        amount,
        type: "RELEASED",
        description: `Escrow released for milestone`,
      },
    });

    return updated;
  });
};