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

// 🔵 GET SINGLE JOB
export const getJobById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await client.get(`/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 🔵 UPDATE JOB (CLIENT only)
export const updateJob = async (id, data) => {
  const token = localStorage.getItem("token");
  const response = await client.put(`/jobs/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 🔵 DELETE JOB (CLIENT only)
export const deleteJob = async (id) => {
  const token = localStorage.getItem("token");
  const response = await client.delete(`/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};