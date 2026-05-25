// src/core/services/job.service.js
import client from "../api/client"; // or your axios client path
// 🔵 CREATE JOB (CLIENT only)
export const createJob = async (data) => {
  const token = localStorage.getItem("token");

  const response = await client.post("/jobs", data, {
    headers: {
      Authorization: `Bearer ${token}`, // 🔐 required for backend auth middleware
    },
  });

  return response.data;
};

// 🔵 GET ALL JOBS
export const getJobs = async () => {
  const token = localStorage.getItem("token");

  const response = await client.get("/jobs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};