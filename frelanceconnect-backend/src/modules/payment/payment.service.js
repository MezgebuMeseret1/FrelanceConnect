import * as provider from "./payment.provider.js";
import prisma from "../../core/config/db.js";

// INITIATE PAYMENT
export const initiatePayment = async (user, amount) => {
  return provider.initializePayment({
    amount,
    email: user.email
  });
};

// HANDLE SUCCESS (WEBHOOK)
export const handlePaymentSuccess = async (payload) => {
  const userEmail = payload.email;
  const amount = payload.amount;

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: { wallet: true }
  });

  if (!user || !user.wallet) return;

  // CREDIT WALLET
  await prisma.wallet.update({
    where: { id: user.wallet.id },
    data: {
      balance: { increment: amount }
    }
  });

  // LOG TRANSACTION
  await prisma.transaction.create({
    data: {
      walletId: user.wallet.id,
      amount,
      type: "CREDIT",
      description: "Payment via Chapa"
    }
  });
};