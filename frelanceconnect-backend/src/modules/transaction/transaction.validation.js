export const validateTransactionId = (id) => {
  if (!id || isNaN(id)) {
    throw new Error("Invalid transaction ID");
  }
};