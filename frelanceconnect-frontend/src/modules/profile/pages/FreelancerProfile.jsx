import { useEffect, useState } from "react";
import client from "../../../core/api/client";
import { motion } from "framer-motion";
import {
  MapPin,
  DollarSign,
  Briefcase,
  Star,
  GraduationCap,
  Globe,
  Mail,
  Phone,
  Pencil,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
  
  const FreelancerProfile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = profile ?? {};
  const freelancer = user?.freelancer ?? {};
  const LinkedInIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 
    2.761 2.239 5 5 5h14c2.761 0 5-2.239 
    5-5v-14c0-2.761-2.239-5-5-5zm-11 
    19h-3v-10h3v10zm-1.5-11.268c-.966 
    0-1.75-.79-1.75-1.764s.784-1.764 
    1.75-1.764 1.75.79 1.75 1.764-.784 
    1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-3.368-4-3.113-4 
    0v5.604h-3v-10h3v1.765c1.396-2.586 
    7-2.777 7 2.476v5.759z"/>
  </svg>
);

const GithubIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 .5C5.73.5.75 5.62.75 12c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.26.79-.58v-2.03c-3.2.71-3.87-1.58-3.87-1.58-.53-1.38-1.3-1.75-1.3-1.75-1.06-.74.08-.73.08-.73 1.17.08 1.79 1.23 1.79 1.23 1.04 1.83 2.73 1.3 3.4.99.1-.78.41-1.3.74-1.6-2.55-.3-5.23-1.32-5.23-5.88 0-1.3.45-2.36 1.2-3.19-.12-.3-.52-1.52.11-3.16 0 0 .98-.32 3.22 1.22.94-.27 1.94-.4 2.94-.4s2 .13 2.94.4c2.24-1.54 3.22-1.22 3.22-1.22.63 1.64.23 2.86.11 3.16.75.83 1.2 1.89 1.2 3.19 0 4.57-2.69 5.58-5.26 5.88.42.37.8 1.1.8 2.22v3.29c0 .32.21.7.8.58A10.54 10.54 0 0 0 23.25 12C23.25 5.62 18.27.5 12 .5z"/>
  </svg>
);


  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/v1/profiles/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(res.data.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white px-10 py-6 rounded-3xl shadow-sm border border-slate-200">
          <p className="text-slate-500 text-lg">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6 lg:p-10">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          bg-white
          border
          border-slate-200
          rounded-[32px]
          overflow-hidden
          shadow-sm
          mb-8
        "
      >
        {/* COVER */}
        <div className="h-44 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

        {/* PROFILE CONTENT */}
        <div className="px-8 pb-8 relative">
          {/* AVATAR */}
          <div
            className="
              absolute
              -top-16
              w-32
              h-32
              rounded-3xl
              border-[6px]
              border-white
              bg-slate-200
              overflow-hidden
              shadow-xl
            "
          >
           <img
           src={
           user?.profileImage
          ? `http://localhost:5001${user.profileImage}`
          : "https://ui-avatars.com/api/?name=Freelancer"
           }
          />
          </div>

          {/* EDIT BUTTON */}
          <div className="flex justify-end pt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                navigate("/edit-freelancer-profile")
              }
              className="
                flex
                items-center
                gap-2
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                text-white
                px-5
                py-3
                rounded-2xl
                font-semibold
                shadow-lg
              "
            >
              <Pencil size={18} />
              Edit Profile
            </motion.button>
          </div>

          {/* INFO */}
          <div className="pt-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <h1 className="text-4xl font-black text-slate-800">
                  {profile?.name}
                </h1>

                <p className="text-blue-600 text-xl font-semibold mt-2">
                  {freelancer?.title ||
                    "Professional Freelancer"}
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-5 text-slate-500">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    {freelancer?.location || "Remote"}
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail size={18} />
                    {profile?.email}
                  </div>

                  {profile?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={18} />
                      {profile?.phone}
                    </div>
                  )}
                </div>
              </div>

              {/* RATE */}
              <div
                className="
                  bg-gradient-to-r
                  from-green-500
                  to-emerald-500
                  text-white
                  rounded-3xl
                  px-8
                  py-6
                  shadow-xl
                  min-w-[220px]
                "
              >
                <p className="opacity-90">
                  Hourly Rate
                </p>

                <h2 className="text-5xl font-black mt-2">
                  ${freelancer?.hourlyRate || 0}
                </h2>

                <p className="mt-2 opacity-80">
                  Per Hour
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* EXPERIENCE */}
        <motion.div
          whileHover={{ y: -4 }}
          className="
            bg-white
            rounded-3xl
            p-7
            border
            border-slate-200
            shadow-sm
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">
                Experience
              </p>

              <h2 className="text-4xl font-black mt-2 text-slate-800">
                {freelancer?.experienceYears || 0}
              </h2>

              <p className="text-slate-500 mt-1">
                Years
              </p>
            </div>

            <div className="bg-blue-100 p-4 rounded-2xl">
              <Briefcase
                className="text-blue-600"
                size={28}
              />
            </div>
          </div>
        </motion.div>

        {/* EARNINGS */}
        <motion.div
          whileHover={{ y: -4 }}
          className="
            bg-white
            rounded-3xl
            p-7
            border
            border-slate-200
            shadow-sm
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">
                Total Earnings
              </p>

              <h2 className="text-4xl font-black mt-2 text-green-600">
                $
                {freelancer?.totalEarnings || 0}
              </h2>

              <p className="text-slate-500 mt-1">
                Earned
              </p>
            </div>

            <div className="bg-green-100 p-4 rounded-2xl">
              <DollarSign
                className="text-green-600"
                size={28}
              />
            </div>
          </div>
        </motion.div>

        {/* RATING */}
        <motion.div
          whileHover={{ y: -4 }}
          className="
            bg-white
            rounded-3xl
            p-7
            border
            border-slate-200
            shadow-sm
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">
                Average Rating
              </p>

              <h2 className="text-4xl font-black mt-2 text-orange-500">
                {freelancer?.averageRating || 0}
              </h2>

              <p className="text-slate-500 mt-1">
                Reviews
              </p>
            </div>

            <div className="bg-orange-100 p-4 rounded-2xl">
              <Star
                className="text-orange-500"
                size={28}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* ABOUT */}
          <motion.div
            whileHover={{ y: -3 }}
            className="
              bg-white
              rounded-3xl
              p-8
              border
              border-slate-200
              shadow-sm
            "
          >
            <h2 className="text-2xl font-black text-slate-800 mb-5">
              About Me
            </h2>

            <p className="text-slate-600 leading-relaxed text-[17px]">
              {freelancer?.bio ||
                "No bio added yet."}
            </p>
          </motion.div>

          {/* SKILLS */}
          <motion.div
            whileHover={{ y: -3 }}
            className="
              bg-white
              rounded-3xl
              p-8
              border
              border-slate-200
              shadow-sm
            "
          >
            <h2 className="text-2xl font-black text-slate-800 mb-6">
              Skills
            </h2>

            <div className="flex flex-wrap gap-4">
              {freelancer?.skills?.length > 0 ? (
                freelancer.skills.map((item) => (
                  <div
                    key={item.id}
                    className="
                      px-5
                      py-3
                      rounded-2xl
                      bg-gradient-to-r
                      from-blue-50
                      to-indigo-50
                      text-blue-700
                      font-semibold
                      border
                      border-blue-100
                    "
                  >
                    {item.skill.name}
                  </div>
                ))
              ) : (
                <p className="text-slate-500">
                  No skills added yet.
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* EDUCATION */}
          <motion.div
            whileHover={{ y: -3 }}
            className="
              bg-white
              rounded-3xl
              p-7
              border
              border-slate-200
              shadow-sm
            "
          >
            <div className="flex items-center gap-3 mb-5">
              <GraduationCap
                className="text-indigo-600"
                size={24}
              />

              <h2 className="text-xl font-black text-slate-800">
                Education
              </h2>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {freelancer?.education ||
                "No education added."}
            </p>
          </motion.div>

          {/* LINKS */}
          <motion.div
            whileHover={{ y: -3 }}
            className="
              bg-white
              rounded-3xl
              p-7
              border
              border-slate-200
              shadow-sm
            "
          >
            <h2 className="text-xl font-black text-slate-800 mb-6">
              Portfolio Links
            </h2>

            <div className="space-y-4">
              {freelancer?.website && (
                <a
                  href={freelancer.website}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex
                    items-center
                    gap-3
                    text-blue-600
                    font-semibold
                  "
                >
                  <Globe size={20} />
                  Website
                </a>
              )}

              {freelancer?.github && (
                <a
                  href={freelancer.github}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex
                    items-center
                    gap-3
                    text-slate-700
                    font-semibold
                  "
                >
                 <GithubIcon className="w-5 h-5 text-slate-700" />
                  GitHub
                </a>
              )}

              {freelancer?.linkedin && (
                <a
                  href={freelancer.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex
                    items-center
                    gap-3
                    text-blue-700
                    font-semibold
                  "
                >
                  <LinkedInIcon className="w-5 h-5 text-blue-700" />
            
                </a>
              )}

              {!freelancer?.website &&
                !freelancer?.github &&
                !freelancer?.linkedin && (
                  <p className="text-slate-500">
                    No portfolio links added.
                  </p>
                )}
            </div>
          </motion.div>

          {/* STATUS */}
          <motion.div
            whileHover={{ y: -3 }}
            className="
              bg-gradient-to-r
              from-emerald-500
              to-green-500
              rounded-3xl
              p-7
              text-white
              shadow-xl
            "
          >
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 size={24} />

              <h2 className="text-xl font-black">
                Availability
              </h2>
            </div>

            <p className="opacity-90 text-lg">
              {freelancer?.availability
                ? "Available for work"
                : "Currently unavailable"}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;