import * as service from "./wallet.service.js";

export const getWallet = async (req, res) => {
  const wallet = await service.getMyWallet(req.user.id);

  res.json({
    success: true,
    data: wallet
  });
};

export const deposit = async (req, res) => {
  try {
    const result = await service.deposit(
      req.user.id,
      req.body.amount
    );

    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const holdFunds = async (req, res) => {
  try {
    const result = await service.holdFunds(
      req.user.id,
      req.body.amount
    );

    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const releaseFunds = async (req, res) => {
  try {
    const result = await service.releaseFunds(
      req.body.freelancerId,
      req.body.amount
    );

    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};