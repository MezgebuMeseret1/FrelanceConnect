import apiClient from "../api/client";

const BASE_URL = "/milestones";

export const getContractMilestones = async (contractId) => {
  const response = await apiClient.get(
    `${BASE_URL}/contract/${contractId}`
  );

  return response.data;
};

export const getMilestoneById = async (id) => {
  const response = await apiClient.get(`${BASE_URL}/${id}`);

  return response.data;
};

export const createMilestone = async (data) => {
  const response = await apiClient.post(BASE_URL, data);

  return response.data;
};
export const updateMilestone = async (id, data) => {
  const response = await apiClient.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

export const updateMilestoneStatus = async (id, status) => {
  const response = await apiClient.patch(`${BASE_URL}/${id}/status`, { status });
  return response.data;
};

export const submitMilestone = async (id, submissionData) => {
  const response = await apiClient.post(`${BASE_URL}/${id}/submit`, submissionData);
  return response.data;
};

export const approveMilestone = async (id) => {
  const response = await apiClient.post(`${BASE_URL}/${id}/approve`);
  return response.data;
};

export const releaseMilestonePayment = async (id) => {
  const response = await apiClient.post(`${BASE_URL}/${id}/release-payment`);
  return response.data;
};