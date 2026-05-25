// Example using CHAPA (Ethiopia-friendly)

import axios from "axios";

const CHAPA_URL = "https://api.chapa.co/v1/transaction/initialize";

export const initializePayment = async ({ amount, email }) => {
  const response = await axios.post(
    CHAPA_URL,
    {
      amount,
      currency: "ETB",
      email,
      first_name: "User",
      last_name: "Name",
      tx_ref: "tx-" + Date.now(),
      callback_url: "http://localhost:5001/api/v1/payment/webhook",
      return_url: "http://localhost:3000/success"
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
      }
    }
  );

  return response.data;
};