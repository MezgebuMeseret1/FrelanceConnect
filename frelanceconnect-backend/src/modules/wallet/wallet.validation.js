export const validateAmount = (amount) => {
  if (!amount || amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }
};