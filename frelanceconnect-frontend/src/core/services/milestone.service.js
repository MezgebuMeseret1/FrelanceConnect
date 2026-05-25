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