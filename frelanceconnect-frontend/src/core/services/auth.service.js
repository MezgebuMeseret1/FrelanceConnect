import client from "../api/client";

// LOGIN
export const login = async (data) => {
  const res = await client.post("/auth/login", data);

  const { token, user } = res.data.data;

  if (token) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  return res.data;
};

// REGISTER
export const register = async (data) => {
  const res = await client.post("/auth/register", data);
  return res.data;
};

// GET CURRENT USER
export const getMe = async () => {
  const token = localStorage.getItem("token");

  const res = await client.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};