import prisma from "../../core/config/db.js";

export const fundMilestoneEscrow = async (milestoneId, clientId) => {
  return await prisma.$transaction(async (tx) => {
    const milestone = await tx.milestone.findUnique({
      where: { id: Number(milestoneId) },
    });

    if (!milestone) throw new Error("Milestone not found");

    if (milestone.status !== "PENDING") {
      throw new Error("Only PENDING milestones can be funded");
    }

    const wallet = await tx.wallet.findUnique({
      where: { userId: clientId },
    });

    if (!wallet) throw new Error("Wallet not found");

    const amount = Number(milestone.amount);

    if (wallet.balance < amount) {
      throw new Error("Insufficient balance");
    }

    // 1. move to escrow
    await tx.wallet.update({
      where: { userId: clientId },
      data: {
        balance: { decrement: amount },
        heldBalance: { increment: amount },
      },
    });

    // 2. update milestone
    const updated = await tx.milestone.update({
      where: { id: milestone.id },
      data: { status: "FUNDED" },
    });

    // 3. ledger
    await tx.transaction.create({
      data: {
        walletId: wallet.id,
        amount,
        type: "HOLD",
        description: `Escrow funded for milestone ${milestone.title}`,
      },
    });

    return updated;
  });
};