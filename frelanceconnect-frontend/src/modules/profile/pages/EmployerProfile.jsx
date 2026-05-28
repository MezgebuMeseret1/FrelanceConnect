// src/modules/profile/pages/EmployerProfile.jsx
import { useEffect, useState } from "react";
import client from "../../../core/api/client";
import { motion } from "framer-motion";
import {
  Building2,
  Globe,
  Mail,
  Phone,
  Briefcase,
  BadgeCheck,
  CalendarDays,
  Pencil,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployerProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

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

      setProfile(res.data.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white px-8 py-6 rounded-3xl shadow-lg border border-slate-200">
          <h2 className="text-xl font-bold text-red-500">
            Failed to load profile
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50 p-6 lg:p-10">
      {/* TOP BAR */}
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
              Employer Profile
            </h1>

            <p className="text-slate-500 mt-2">
              Manage your company profile and hiring identity.
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/profile/employer/edit")}
          className="
            flex
            items-center
            gap-2
            bg-gradient-to-r
            from-indigo-600
            to-blue-600
            text-white
            px-6
            py-4
            rounded-2xl
            font-bold
            shadow-lg
            hover:shadow-2xl
            transition-all
          "
        >
          <Pencil size={18} />
          Edit Profile
        </motion.button>
      </div>

      {/* PROFILE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          bg-white
          rounded-[32px]
          border
          border-slate-200
          shadow-xl
          overflow-hidden
        "
      >
        {/* HEADER */}
        <div className="relative h-52 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500">
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
              bg-white
              shadow-2xl
              overflow-hidden
            "
          >
            <img
              src={
                profile?.user?.profileImage ||
                "https://ui-avatars.com/api/?name=Employer&background=6366f1&color=fff"
              }
              alt="Employer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* BODY */}
        <div className="pt-24 px-8 pb-10">
          <div className="flex flex-col xl:flex-row gap-10">
            {/* LEFT */}
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-4xl font-black text-slate-800">
                  {profile?.user?.name}
                </h2>

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    bg-blue-100
                    text-blue-700
                    px-4
                    py-2
                    rounded-2xl
                    font-semibold
                  "
                >
                  <BadgeCheck size={18} />
                  Employer
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* COMPANY */}
                <div
                  className="
                    bg-slate-50
                    border
                    border-slate-200
                    rounded-3xl
                    p-5
                  "
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-indigo-100 p-3 rounded-2xl">
                      <Building2
                        className="text-indigo-600"
                        size={22}
                      />
                    </div>

                    <h3 className="font-bold text-slate-800 text-lg">
                      Company
                    </h3>
                  </div>

                  <p className="text-slate-600 text-lg font-medium">
                    {profile?.companyName || "Not provided"}
                  </p>
                </div>

                {/* WEBSITE */}
                <div
                  className="
                    bg-slate-50
                    border
                    border-slate-200
                    rounded-3xl
                    p-5
                  "
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-100 p-3 rounded-2xl">
                      <Globe
                        className="text-blue-600"
                        size={22}
                      />
                    </div>

                    <h3 className="font-bold text-slate-800 text-lg">
                      Website
                    </h3>
                  </div>

                  <p className="text-slate-600 break-all">
                    {profile?.companyWebsite ||
                      "No website added"}
                  </p>
                </div>

                {/* EMAIL */}
                <div
                  className="
                    bg-slate-50
                    border
                    border-slate-200
                    rounded-3xl
                    p-5
                  "
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-cyan-100 p-3 rounded-2xl">
                      <Mail
                        className="text-cyan-600"
                        size={22}
                      />
                    </div>

                    <h3 className="font-bold text-slate-800 text-lg">
                      Email
                    </h3>
                  </div>

                  <p className="text-slate-600 break-all">
                    {profile?.user?.email}
                  </p>
                </div>

                {/* PHONE */}
                <div
                  className="
                    bg-slate-50
                    border
                    border-slate-200
                    rounded-3xl
                    p-5
                  "
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-emerald-100 p-3 rounded-2xl">
                      <Phone
                        className="text-emerald-600"
                        size={22}
                      />
                    </div>

                    <h3 className="font-bold text-slate-800 text-lg">
                      Phone
                    </h3>
                  </div>

                  <p className="text-slate-600">
                    {profile?.user?.phone ||
                      "Phone not added"}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE STATS */}
            <div className="w-full xl:w-[360px]">
              <div
                className="
                  bg-gradient-to-br
                  from-slate-900
                  via-slate-800
                  to-slate-900
                  text-white
                  rounded-[30px]
                  p-7
                  shadow-2xl
                "
              >
                <h3 className="text-2xl font-black mb-6">
                  Company Stats
                </h3>

                <div className="space-y-5">
                  {/* JOBS */}
                  <div
                    className="
                      bg-white/10
                      border
                      border-white/10
                      rounded-2xl
                      p-5
                    "
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-300 text-sm">
                          Jobs Posted
                        </p>

                        <h2 className="text-3xl font-black mt-2">
                          {profile?.jobsPosted || 0}
                        </h2>
                      </div>

                      <div className="bg-blue-500/20 p-4 rounded-2xl">
                        <Briefcase
                          className="text-blue-300"
                          size={28}
                        />
                      </div>
                    </div>
                  </div>

                  {/* TAX ID */}
                  <div
                    className="
                      bg-white/10
                      border
                      border-white/10
                      rounded-2xl
                      p-5
                    "
                  >
                    <p className="text-slate-300 text-sm mb-2">
                      Tax ID
                    </p>

                    <h3 className="text-lg font-bold break-all">
                      {profile?.taxId || "Not provided"}
                    </h3>
                  </div>

                  {/* JOIN DATE */}
                  <div
                    className="
                      bg-white/10
                      border
                      border-white/10
                      rounded-2xl
                      p-5
                    "
                  >
                    <div className="flex items-center gap-3">
                      <CalendarDays
                        className="text-indigo-300"
                        size={22}
                      />

                      <div>
                        <p className="text-slate-300 text-sm">
                          Joined
                        </p>

                        <h3 className="font-bold mt-1">
                          {new Date(
                            profile?.user?.createdAt
                          ).toLocaleDateString()}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* VERIFIED */}
                  <div
                    className="
                      bg-emerald-500/20
                      border
                      border-emerald-500/20
                      rounded-2xl
                      p-5
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div>
                      <p className="text-emerald-200 text-sm">
                        Verification
                      </p>

                      <h3 className="text-xl font-black mt-1">
                        {profile?.user?.isVerified
                          ? "Verified"
                          : "Pending"}
                      </h3>
                    </div>

                    <BadgeCheck
                      className="text-emerald-300"
                      size={30}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployerProfile;

