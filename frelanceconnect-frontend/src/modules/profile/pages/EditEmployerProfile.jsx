// src/modules/profile/pages/EditEmployerProfile.jsx

import { useEffect, useState } from "react";
import client from "../../../core/api/client";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Globe,
  Phone,
  FileBadge,
  Image as ImageIcon,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const EditEmployerProfile = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    profileImage: "",
    companyName: "",
    companyWebsite: "",
    taxId: "",
  });

  const fetchProfile = async () => {
    try {
      const res = await client.get(
        "/profiles/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data.data;

      setForm({
        name: data?.user?.name || "",
        phone: data?.user?.phone || "",
        profileImage: data?.user?.profileImage || "",
        companyName: data?.companyName || "",
        companyWebsite: data?.companyWebsite || "",
        taxId: data?.taxId || "",
      });
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Failed to load employer profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      const data = {
  companyName: form.companyName,
  companyWebsite: form.companyWebsite,
  companySize: form.companySize,
  industry: form.industry,
  location: form.location,
  description: form.description,
};

  client.put(
  "/profiles/employer",
  data,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);

      alert("Employer profile updated successfully!");

    } catch (err) {
      console.log(err.response?.data || err.message);

      alert(
        err.response?.data?.message ||
          "Failed to update employer profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white px-8 py-6 rounded-3xl shadow-lg border border-slate-200">
          <h2 className="text-xl font-bold text-slate-700">
            Loading profile...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50 p-6 lg:p-10">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="
              w-12
              h-12
              rounded-2xl
              bg-white
              border
              border-slate-200
              flex
              items-center
              justify-center
              shadow-sm
            "
          >
            <ArrowLeft className="text-slate-700" size={20} />
          </motion.button>

          <div>
            <h1 className="text-4xl font-black text-slate-800">
              Edit Employer Profile
            </h1>

            <p className="text-slate-500 mt-2">
              Update your company information and profile.
            </p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          max-w-5xl
          mx-auto
          bg-white
          rounded-[32px]
          border
          border-slate-200
          shadow-2xl
          overflow-hidden
        "
      >
        {/* TOP */}
        <div className="h-40 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 relative">
          <div
            className="
              absolute
              -bottom-16
              left-10
              w-32
              h-32
              rounded-3xl
              border-[6px]
              border-white
              overflow-hidden
              bg-white
              shadow-2xl
            "
          >
            <img
              src={
                form.profileImage ||
                "https://ui-avatars.com/api/?name=Employer&background=6366f1&color=fff"
              }
              alt="Employer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="pt-24 px-8 pb-10">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* FULL NAME */}
            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 block">
                Full Name
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="
                    w-full
                    bg-slate-50
                    border
                    border-slate-200
                    rounded-2xl
                    py-4
                    pl-14
                    pr-4
                    outline-none
                    focus:ring-4
                    focus:ring-indigo-100
                    focus:border-indigo-500
                    transition-all
                  "
                />

                <Building2
                  className="absolute left-5 top-4 text-slate-400"
                  size={20}
                />
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 block">
                Phone Number
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="
                    w-full
                    bg-slate-50
                    border
                    border-slate-200
                    rounded-2xl
                    py-4
                    pl-14
                    pr-4
                    outline-none
                    focus:ring-4
                    focus:ring-indigo-100
                    focus:border-indigo-500
                    transition-all
                  "
                />

                <Phone
                  className="absolute left-5 top-4 text-slate-400"
                  size={20}
                />
              </div>
            </div>

            {/* PROFILE IMAGE */}
            <div className="lg:col-span-2">
              <label className="text-sm font-bold text-slate-700 mb-2 block">
                Profile Image URL
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="profileImage"
                  value={form.profileImage}
                  onChange={handleChange}
                  placeholder="https://example.com/profile.jpg"
                  className="
                    w-full
                    bg-slate-50
                    border
                    border-slate-200
                    rounded-2xl
                    py-4
                    pl-14
                    pr-4
                    outline-none
                    focus:ring-4
                    focus:ring-indigo-100
                    focus:border-indigo-500
                    transition-all
                  "
                />

                <ImageIcon
                  className="absolute left-5 top-4 text-slate-400"
                  size={20}
                />
              </div>
            </div>

            {/* COMPANY NAME */}
            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 block">
                Company Name
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  className="
                    w-full
                    bg-slate-50
                    border
                    border-slate-200
                    rounded-2xl
                    py-4
                    pl-14
                    pr-4
                    outline-none
                    focus:ring-4
                    focus:ring-indigo-100
                    focus:border-indigo-500
                    transition-all
                  "
                />

                <Building2
                  className="absolute left-5 top-4 text-slate-400"
                  size={20}
                />
              </div>
            </div>

            {/* WEBSITE */}
            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 block">
                Company Website
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="companyWebsite"
                  value={form.companyWebsite}
                  onChange={handleChange}
                  placeholder="https://company.com"
                  className="
                    w-full
                    bg-slate-50
                    border
                    border-slate-200
                    rounded-2xl
                    py-4
                    pl-14
                    pr-4
                    outline-none
                    focus:ring-4
                    focus:ring-indigo-100
                    focus:border-indigo-500
                    transition-all
                  "
                />

                <Globe
                  className="absolute left-5 top-4 text-slate-400"
                  size={20}
                />
              </div>
            </div>

            {/* TAX ID */}
            <div className="lg:col-span-2">
              <label className="text-sm font-bold text-slate-700 mb-2 block">
                Tax ID
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="taxId"
                  value={form.taxId}
                  onChange={handleChange}
                  placeholder="Enter tax identification number"
                  className="
                    w-full
                    bg-slate-50
                    border
                    border-slate-200
                    rounded-2xl
                    py-4
                    pl-14
                    pr-4
                    outline-none
                    focus:ring-4
                    focus:ring-indigo-100
                    focus:border-indigo-500
                    transition-all
                  "
                />

                <FileBadge
                  className="absolute left-5 top-4 text-slate-400"
                  size={20}
                />
              </div>
            </div>

            {/* SAVE BUTTON */}
            <div className="lg:col-span-2 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={saving}
                className="
                  w-full
                  bg-gradient-to-r
                  from-indigo-600
                  to-blue-600
                  hover:from-indigo-700
                  hover:to-blue-700
                  text-white
                  py-5
                  rounded-2xl
                  font-bold
                  text-lg
                  shadow-xl
                  transition-all
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >
                <Save size={20} />

                {saving
                  ? "Saving Changes..."
                  : "Save Profile Changes"}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EditEmployerProfile;

