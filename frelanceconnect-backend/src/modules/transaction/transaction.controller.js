import * as service from "./transaction.service.js";

export const getMyTransactions = async (req, res) => {
  const data = await service.getMyTransactions(req.user.id);

  res.json({
    success: true,
    data
  });
};

export const getTransaction = async (req, res) => {
  try {
    const data = await service.getTransaction(req.params.id);

    res.json({
      success: true,
      data
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message
    });
  }
};

// Admin only
export const getAllTransactions = async (req, res) => {
  const data = await service.getAllTransactions();

  res.json({
    success: true,
    data
  });
};