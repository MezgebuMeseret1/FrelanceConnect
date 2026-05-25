import * as service from "./payment.service.js";

export const initiatePayment = async (req, res) => {
  try {
    const data = await service.initiatePayment(
      req.user,
      req.body.amount
    );

    res.json({
      success: true,
      data
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};