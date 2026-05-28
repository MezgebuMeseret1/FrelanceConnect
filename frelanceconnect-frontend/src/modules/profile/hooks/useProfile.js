// src/core/hooks/useProfile.js

import { useEffect, useState, useCallback } from "react";
import client from "../../../core/api/client";

const API_URL = "http://localhost:5001/api/v1";

const useProfile = () => {
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // ==============================
  // AXIOS CONFIG
  // ==============================
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // ==============================
  // FETCH PROFILE
  // ==============================
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/profile/me`,
        config
      );

      setProfile(res.data.data);

      setError(null);
    } catch (err) {
      console.log("PROFILE FETCH ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  // ==============================
  // UPDATE PROFILE
  // ==============================
  const updateProfile = async (payload) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${API_URL}/profile/me`,
        payload,
        config
      );

      setProfile(res.data.data);

      return {
        success: true,
        data: res.data.data,
      };
    } catch (err) {
      console.log("PROFILE UPDATE ERROR:", err);

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Failed to update profile",
      };
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // UPLOAD PROFILE IMAGE
  // ==============================
  const uploadProfileImage = async (file) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("image", file);

      const res = await axios.post(
        `${API_URL}/profile/upload-avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setProfile((prev) => ({
        ...prev,
        profileImage: res.data.data.url,
      }));

      return {
        success: true,
        url: res.data.data.url,
      };
    } catch (err) {
      console.log("UPLOAD ERROR:", err);

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Failed to upload image",
      };
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // UPDATE FREELANCER SKILLS
  // ==============================
  const updateSkills = async (skills) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${API_URL}/profile/skills`,
        { skills },
        config
      );

      setProfile(res.data.data);

      return {
        success: true,
        data: res.data.data,
      };
    } catch (err) {
      console.log("SKILL UPDATE ERROR:", err);

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Failed to update skills",
      };
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // ADD EXPERIENCE
  // ==============================
  const addExperience = async (experience) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/profile/experience`,
        experience,
        config
      );

      setProfile(res.data.data);

      return {
        success: true,
        data: res.data.data,
      };
    } catch (err) {
      console.log("ADD EXPERIENCE ERROR:", err);

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Failed to add experience",
      };
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // DELETE EXPERIENCE
  // ==============================
  const deleteExperience = async (
    experienceId
  ) => {
    try {
      setLoading(true);

      const res = await axios.delete(
        `${API_URL}/profile/experience/${experienceId}`,
        config
      );

      setProfile(res.data.data);

      return {
        success: true,
      };
    } catch (err) {
      console.log("DELETE EXPERIENCE ERROR:", err);

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Failed to delete experience",
      };
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // UPDATE PORTFOLIO LINKS
  // ==============================
  const updatePortfolioLinks = async (
    links
  ) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${API_URL}/profile/portfolio-links`,
        { links },
        config
      );

      setProfile(res.data.data);

      return {
        success: true,
        data: res.data.data,
      };
    } catch (err) {
      console.log(
        "PORTFOLIO UPDATE ERROR:",
        err
      );

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Failed to update portfolio",
      };
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // REFRESH PROFILE
  // ==============================
  const refreshProfile = async () => {
    await fetchProfile();
  };

  // ==============================
  // INITIAL LOAD
  // ==============================
  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [fetchProfile, token]);

  return {
    profile,
    loading,
    error,

    fetchProfile,
    refreshProfile,

    updateProfile,
    uploadProfileImage,

    updateSkills,

    addExperience,
    deleteExperience,

    updatePortfolioLinks,

    setProfile,
  };
};

export default useProfile;