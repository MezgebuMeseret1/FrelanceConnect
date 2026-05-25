import * as repo from "./wallet.repository.js";

// GET USER WALLET
export const getMyWallet = async (userId) => {
  let wallet = await repo.findByUserId(userId);

  // auto-create wallet if not exists
  if (!wallet) {
    wallet = await repo.create(userId);
  }

  return wallet;
};

// DEPOSIT (simulate payment)
export const deposit = async (userId, amount) => {
  const wallet = await repo.findByUserId(userId);

  if (!wallet) throw new Error("Wallet not found");

  await repo.updateBalance(wallet.id, amount);

  await repo.createTransaction({
    walletId: wallet.id,
    amount,
    type: "CREDIT",
    description: "Deposit"
  });

  return { message: "Deposit successful" };
};

// HOLD FUNDS (ESCROW)
export const holdFunds = async (userId, amount) => {
  const wallet = await repo.findByUserId(userId);

  if (wallet.balance < amount) {
    throw new Error("Insufficient balance");
  }

  await repo.updateBalance(wallet.id, -amount);

  await repo.createTransaction({
    walletId: wallet.id,
    amount,
    type: "HOLD",
    description: "Escrow hold"
  });

  return { message: "Funds held in escrow" };
};

// RELEASE FUNDS TO FREELANCER
export const releaseFunds = async (freelancerId, amount) => {
  const wallet = await repo.findByUserId(freelancerId);

  if (!wallet) throw new Error("Freelancer wallet not found");

  await repo.updateBalance(wallet.id, amount);

  await repo.createTransaction({
    walletId: wallet.id,
    amount,
    type: "RELEASED",
    description: "Milestone payment released"
  });

  return { message: "Payment released" };
};