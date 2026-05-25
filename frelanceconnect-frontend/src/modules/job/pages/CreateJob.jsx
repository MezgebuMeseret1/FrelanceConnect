import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  Briefcase,
  FileText,
  DollarSign,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { createJob } from "../../../core/services/job.service";

const CreateJob = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
  });

  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] =
    useState("");

  const completedFields =
    Object.values(form).filter(Boolean).length;

  const progress = (completedFields / 3) * 100;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.description ||
      !form.budget
    ) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await createJob({
        title: form.title.trim(),
        description: form.description.trim(),
        budget: Number(form.budget),
      });

      alert("Job created successfully!");

      navigate("/dashboard");
    } catch (err) {
      console.log(
        "CREATE JOB ERROR:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
          "Failed to create job"
      );
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (field, color) => `
    flex items-center gap-4
    rounded-3xl
    border
    px-5
    py-4
    bg-slate-50
    transition-all
    duration-300
    ${
      focusedField === field
        ? `${color} bg-white shadow-lg`
        : "border-slate-200 hover:border-slate-300"
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-8">
      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-indigo-100 p-3 rounded-2xl">
                <Sparkles
                  className="text-indigo-600"
                  size={24}
                />
              </div>

              <h1 className="text-4xl font-black text-slate-800">
                Create New Job
              </h1>
            </div>

            <p className="text-slate-500 max-w-2xl leading-relaxed">
              Publish a professional job posting and
              connect with talented freelancers around
              the world.
            </p>
          </div>

          {/* BACK BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/dashboard")}
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
              text-slate-700
              shadow-sm
              hover:shadow-lg
              transition-all
            "
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </motion.button>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            xl:col-span-2
            bg-white
            border
            border-slate-200
            rounded-[32px]
            p-8
            shadow-sm
          "
        >
          {/* FORM TOP */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-800 mb-2">
                Job Information
              </h2>

              <p className="text-slate-500">
                Fill out the details below to create
                your job post.
              </p>
            </div>

            {/* PROGRESS */}
            <div className="hidden md:block min-w-[180px]">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-slate-500">
                  Completion
                </span>

                <span className="text-sm font-bold text-indigo-600">
                  {Math.round(progress)}%
                </span>
              </div>

              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${progress}%`,
                  }}
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-indigo-600
                    to-blue-600
                  "
                />
              </div>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-7"
          >
            {/* TITLE */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                <Briefcase
                  size={18}
                  className="text-indigo-600"
                />
                Job Title
              </label>

              <motion.div
                whileHover={{ y: -1 }}
                className={fieldClass(
                  "title",
                  "border-indigo-500 shadow-indigo-100"
                )}
              >
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. React Developer Needed"
                  value={form.title}
                  onChange={handleChange}
                  onFocus={() =>
                    setFocusedField("title")
                  }
                  onBlur={() =>
                    setFocusedField("")
                  }
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-slate-700
                    placeholder:text-slate-400
                  "
                />

                {form.title && (
                  <CheckCircle2
                    className="text-green-500 shrink-0"
                    size={20}
                  />
                )}
              </motion.div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                <FileText
                  size={18}
                  className="text-purple-600"
                />
                Job Description
              </label>

              <motion.div
                whileHover={{ y: -1 }}
                className={`
                  rounded-3xl
                  border
                  p-5
                  bg-slate-50
                  transition-all
                  duration-300
                  ${
                    focusedField === "description"
                      ? "border-purple-500 bg-white shadow-lg shadow-purple-100"
                      : "border-slate-200 hover:border-slate-300"
                  }
                `}
              >
                <textarea
                  rows="7"
                  name="description"
                  placeholder="Describe the project requirements, skills needed, expectations, deadlines, and deliverables..."
                  value={form.description}
                  onChange={handleChange}
                  onFocus={() =>
                    setFocusedField(
                      "description"
                    )
                  }
                  onBlur={() =>
                    setFocusedField("")
                  }
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    resize-none
                    text-slate-700
                    placeholder:text-slate-400
                  "
                />
              </motion.div>
            </div>

            {/* BUDGET */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                <DollarSign
                  size={18}
                  className="text-green-600"
                />
                Budget
              </label>

              <motion.div
                whileHover={{ y: -1 }}
                className={fieldClass(
                  "budget",
                  "border-green-500 shadow-green-100"
                )}
              >
                <span className="text-slate-400 text-lg">
                  $
                </span>

                <input
                  type="number"
                  name="budget"
                  placeholder="500"
                  value={form.budget}
                  onChange={handleChange}
                  onFocus={() =>
                    setFocusedField("budget")
                  }
                  onBlur={() =>
                    setFocusedField("")
                  }
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-slate-700
                    placeholder:text-slate-400
                  "
                />

                {form.budget && (
                  <CheckCircle2
                    className="text-green-500 shrink-0"
                    size={20}
                  />
                )}
              </motion.div>
            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.98,
              }}
              disabled={loading}
              type="submit"
              className="
                w-full
                rounded-3xl
                bg-gradient-to-r
                from-indigo-600
                to-blue-600
                py-5
                text-lg
                font-bold
                text-white
                shadow-lg
                hover:shadow-2xl
                transition-all
                duration-300
                disabled:opacity-70
              "
            >
              {loading
                ? "Creating Job..."
                : "Publish Job"}
            </motion.button>
          </form>
        </motion.div>

        {/* SIDE PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="
            bg-white
            border
            border-slate-200
            rounded-[32px]
            p-7
            shadow-sm
            h-fit
          "
        >
          <h3 className="text-xl font-black text-slate-800 mb-6">
            Job Preview
          </h3>

          <div className="space-y-5">
            {/* TITLE */}
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-2">
                Title
              </p>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <p className="font-bold text-slate-800">
                  {form.title ||
                    "Your job title will appear here"}
                </p>
              </div>
            </div>

            {/* BUDGET */}
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-2">
                Budget
              </p>

              <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                <p className="font-black text-green-700 text-2xl">
                  $
                  {form.budget
                    ? form.budget
                    : "0"}
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-2">
                Description
              </p>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <p className="text-slate-600 leading-relaxed text-sm">
                  {form.description ||
                    "Job description preview will appear here..."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateJob;