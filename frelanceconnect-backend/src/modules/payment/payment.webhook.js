import * as service from "./payment.service.js";

export const chapaWebhook = async (req, res) => {
  try {
    const payload = req.body;

    // verify payment success
    if (payload.status === "success") {
      await service.handlePaymentSuccess(payload);
    }

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};