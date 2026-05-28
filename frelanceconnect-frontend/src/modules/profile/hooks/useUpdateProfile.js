// src/modules/profile/hooks/useUpdateProfile.js

import { useState } from "react";
import client from "../../../core/api/client";

const API_URL = "/profile";

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  const updateFreelancerProfile = async (profileData) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await client.put(
        `${API_URL}/freelancer`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Freelancer profile updated successfully");

      return res.data;
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message ||
          "Failed to update freelancer profile"
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateEmployerProfile = async (profileData) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await client.put(
        `${API_URL}/employer`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Employer profile updated successfully");

      return res.data;
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message ||
          "Failed to update employer profile"
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadProfileImage = async (imageFile) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const formData = new FormData();

      formData.append("image", imageFile);

      const res = await client.post(
        `${API_URL}/upload-avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("Profile image uploaded successfully");

      return res.data;
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message ||
          "Failed to upload image"
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,

    updateFreelancerProfile,
    updateEmployerProfile,
    uploadProfileImage,
  };
};

export default useUpdateProfile;

