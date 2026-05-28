import { useEffect, useState } from "react";
import client from "../../../core/api/client";
import EditSkills from "../components/EditSkills";
import ProfileAvatarUpload from "../components/ProfileAvatarUpload";
import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  FileText,
  DollarSign,
  GraduationCap,
  MapPin,
  Globe,
  Save,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
 const EditFreelancerProfile = () => {
 const navigate = useNavigate();
 const token = localStorage.getItem("token");
 const [avatarFile, setAvatarFile] = useState(null);
 const [form, setForm] = useState({
    name: "",
    profileImage: "",
    title: "",
    bio: "",
    location: "",
    hourlyRate: "",
    experienceYears: "",
    education: "",
    website: "",
    github: "",
    linkedin: "",
    skills: [],
  });
const [loading, setLoading] = useState(false);
const [fetching, setFetching] = useState(true);
const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};
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

    const user = res.data.data;
    const freelancer = user.freelancer;

    setForm({
      name: user.name || "",
      profileImage: user.profileImage || "",
      title: freelancer?.title || "",
      bio: freelancer?.bio || "",
      location: freelancer?.location || "",
      hourlyRate: freelancer?.hourlyRate || "",
      experienceYears: freelancer?.experienceYears || "",
      education: freelancer?.education || "",
      website: freelancer?.website || "",
      github: freelancer?.github || "",
      linkedin: freelancer?.linkedin || "",
      skills: freelancer?.skills || [],
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    setFetching(false);
  }
};

  useEffect(() => {
    fetchProfile();
  }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("title", form.title || "");
    formData.append("bio", form.bio || "");
    formData.append("location", form.location || "");
    formData.append("hourlyRate", Number(form.hourlyRate || 0));
    formData.append("experienceYears", Number(form.experienceYears || 0));
    formData.append("education", form.education || "");
    formData.append("website", form.website || "");
    formData.append("github", form.github || "");
    formData.append("linkedin", form.linkedin || "");

    // ✅ IMPORTANT: skills must be stringified
    formData.append("skills", JSON.stringify(form.skills || []));

    // ✅ avatar file (from ProfileAvatarUpload)
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    await axios.put(
      "http://localhost:5001/api/v1/profiles/freelancer",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Profile updated successfully!");
    navigate("/freelancer-profile");
  } catch (err) {
    console.log(err.response?.data);
    alert(err.response?.data?.message || "Failed to update profile");
  } finally {
    setLoading(false);
  }
};
  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white px-10 py-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-lg">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-800">
              Edit Freelancer Profile
            </h1>

            <p className="text-slate-500 mt-2 text-lg">
              Keep your freelancer profile updated
              to attract more clients.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              navigate("/freelancer-profile")
            }
            className="
              flex
              items-center
              gap-2
              bg-white
              border
              border-slate-200
              px-6
              py-4
              rounded-2xl
              font-semibold
              shadow-sm
            "
          >
            <ArrowLeft size={18} />
            Back to Profile
          </motion.button>
        </div>

        {/* FORM */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="
            bg-white
            rounded-[32px]
            border
            border-slate-200
            shadow-sm
            overflow-hidden
          "
        >
          {/* TOP BANNER */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-2xl">
                <Sparkles size={32} />
              </div>

              <div>
                <h2 className="text-3xl font-black">
                  Professional Profile
                </h2>

                <p className="opacity-90 mt-2">
                  Build trust and attract better
                  freelance opportunities.
                </p>
              </div>
            </div>
          </div>
            <ProfileAvatarUpload
             image={form.profileImage}   // from backend
             name={form.name}
             editable={true}
             onChange={(file) => setAvatarFile(file)}
             />
             
          <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-7">
            {/* NAME */}
            <div>
              <label className="text-sm font-bold text-slate-700 mb-3 block">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-4
                    rounded-2xl
                    border
                    border-slate-200
                    outline-none
                    focus:ring-4
                    focus:ring-blue-100
                    focus:border-blue-500
                    transition-all
                  "
                />
              </div>
            </div>

            {/* TITLE */}
            <div>
              <label className="text-sm font-bold text-slate-700 mb-3 block">
                Professional Title
              </label>

              <div className="relative">
                <Briefcase
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Full Stack Developer"
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-4
                    rounded-2xl
                    border
                    border-slate-200
                    outline-none
                    focus:ring-4
                    focus:ring-blue-100
                    focus:border-blue-500
                    transition-all
                  "
                />
              </div>
            </div>

            {/* LOCATION */}
            <div>
              <label className="text-sm font-bold text-slate-700 mb-3 block">
                Location
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Addis Ababa, Ethiopia"
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-4
                    rounded-2xl
                    border
                    border-slate-200
                    outline-none
                    focus:ring-4
                    focus:ring-blue-100
                    focus:border-blue-500
                    transition-all
                  "
                />
              </div>
            </div>

            {/* HOURLY RATE */}
            <div>
              <label className="text-sm font-bold text-slate-700 mb-3 block">
                Hourly Rate ($)
              </label>

              <div className="relative">
                <DollarSign
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="number"
                  name="hourlyRate"
                  value={form.hourlyRate}
                  onChange={handleChange}
                  placeholder="25"
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-4
                    rounded-2xl
                    border
                    border-slate-200
                    outline-none
                    focus:ring-4
                    focus:ring-blue-100
                    focus:border-blue-500
                    transition-all
                  "
                />
              </div>
            </div>

            {/* EXPERIENCE */}
            <div>
              <label className="text-sm font-bold text-slate-700 mb-3 block">
                Experience (Years)
              </label>

              <input
                type="number"
                name="experienceYears"
                value={form.experienceYears}
                onChange={handleChange}
                placeholder="5"
                className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  border
                  border-slate-200
                  outline-none
                  focus:ring-4
                  focus:ring-blue-100
                  focus:border-blue-500
                  transition-all
                "
              />
            </div>

            {/* EDUCATION */}
            <div>
              <label className="text-sm font-bold text-slate-700 mb-3 block">
                Education
              </label>

              <div className="relative">
                <GraduationCap
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  name="education"
                  value={form.education}
                  onChange={handleChange}
                  placeholder="BSc in Computer Science"
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-4
                    rounded-2xl
                    border
                    border-slate-200
                    outline-none
                    focus:ring-4
                    focus:ring-blue-100
                    focus:border-blue-500
                    transition-all
                  "
                />
              </div>
            </div>

            {/* WEBSITE */}
            <div>
              <label className="text-sm font-bold text-slate-700 mb-3 block">
                Website
              </label>

              <div className="relative">
                <Globe
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-4
                    rounded-2xl
                    border
                    border-slate-200
                    outline-none
                    focus:ring-4
                    focus:ring-blue-100
                    focus:border-blue-500
                    transition-all
                  "
                />
              </div>
            </div>

            {/* GITHUB */}
            <div>
              <label className="text-sm font-bold text-slate-700 mb-3 block">
                GitHub
              </label>

              <div className="relative">
               <GithubIcon className="w-5 h-5 text-slate-700" />
                 

                <input
                  type="text"
                  name="github"
                  value={form.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-4
                    rounded-2xl
                    border
                    border-slate-200
                    outline-none
                    focus:ring-4
                    focus:ring-blue-100
                    focus:border-blue-500
                    transition-all
                  "
                />
              </div>
            </div>
           <div className="lg:col-span-2">
           <EditSkills
              value={form.skills}
              onChange={(skills) =>
            setForm({ ...form, skills })
             }
             />
            </div>
            {/* LINKEDIN */}
            <div className="lg:col-span-2">
              <label className="text-sm font-bold text-slate-700 mb-3 block">
                LinkedIn
              </label>

              <div className="relative">
               <LinkedInIcon className="w-5 h-5 text-blue-700" />

                <input
                  type="text"
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-4
                    rounded-2xl
                    border
                    border-slate-200
                    outline-none
                    focus:ring-4
                    focus:ring-blue-100
                    focus:border-blue-500
                    transition-all
                  "
                />
              </div>
            </div>

            {/* BIO */}
            <div className="lg:col-span-2">
              <label className="text-sm font-bold text-slate-700 mb-3 block">
                Professional Bio
              </label>

              <div className="relative">
                <FileText
                  size={18}
                  className="
                    absolute
                    left-4
                    top-5
                    text-slate-400
                  "
                />

                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Tell clients about your experience, skills, and achievements..."
                  rows={7}
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-4
                    rounded-2xl
                    border
                    border-slate-200
                    outline-none
                    resize-none
                    focus:ring-4
                    focus:ring-blue-100
                    focus:border-blue-500
                    transition-all
                  "
                />
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="border-t border-slate-100 p-8 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="
                flex
                items-center
                gap-3
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                hover:from-blue-700
                hover:to-indigo-700
                text-white
                px-8
                py-4
                rounded-2xl
                font-bold
                shadow-xl
                transition-all
                disabled:opacity-70
              "
            >
              <Save size={20} />

              {loading
                ? "Saving Changes..."
                : "Save Changes"}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default EditFreelancerProfile;