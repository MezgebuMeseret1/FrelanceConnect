import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Target,
  FileText,
  DollarSign,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

import { createMilestone } from "../../../app/store/slices/milestone.slice";

const MilestoneForm = ({ isEdit = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { contractId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    dueDate: "",
  });

  const [focusedField, setFocusedField] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const completedFields =
    Object.values(formData).filter(Boolean).length;

  const progress = (completedFields / 4) * 100;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setSubmitting(true);

    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
      contractId: parseInt(contractId),
      dueDate: new Date(
        formData.dueDate
      ).toISOString(),
    };

    console.log("SUBMITTING:", payload);

    await dispatch(createMilestone(payload)).unwrap();

    navigate(`/contracts/${contractId}/milestones`);
  } catch (error) {
    console.log("CREATE ERROR:", error);
  } finally {
    setSubmitting(false);
  }
};

  const fieldClass = (field, color) => `
    flex items-center gap-4
    rounded-2xl
    border
    px-5
    py-4
    bg-gray-50
    transition-all
    duration-300
    ${
      focusedField === field
        ? `${color} bg-white shadow-lg`
        : "border-gray-200 hover:border-gray-300"
    }
  `;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* TOP SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-800 mb-3">
            Milestone Details
          </h2>

          <p className="text-gray-500 max-w-2xl leading-relaxed">
            Fill in the information below to create a professional
            project milestone with deadlines and payment tracking.
          </p>
        </div>

        {/* PROGRESS */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5 min-w-[220px]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-600">
              Form Completion
            </span>

            <span className="text-sm font-bold text-blue-600">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* FORM */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-7"
      >
        {/* TITLE */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
            <Target size={18} className="text-blue-600" />
            Milestone Title
          </label>

          <motion.div
            whileHover={{ y: -1 }}
            className={fieldClass(
              "title",
              "border-blue-500 shadow-blue-100"
            )}
          >
            <input
              type="text"
              name="title"
              placeholder="Example: Frontend Dashboard Completion"
              value={formData.title}
              onChange={handleChange}
              onFocus={() => setFocusedField("title")}
              onBlur={() => setFocusedField("")}
              className="
                w-full
                bg-transparent
                outline-none
                text-gray-700
                placeholder:text-gray-400
              "
            />

            {formData.title && (
              <CheckCircle2
                className="text-green-500 shrink-0"
                size={20}
              />
            )}
          </motion.div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AMOUNT */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
              <DollarSign size={18} className="text-green-600" />
              Payment Amount
            </label>

            <motion.div
              whileHover={{ y: -1 }}
              className={fieldClass(
                "amount",
                "border-green-500 shadow-green-100"
              )}
            >
              <span className="text-gray-400 text-lg">$</span>

              <input
                type="number"
                name="amount"
                placeholder="1500"
                value={formData.amount}
                onChange={handleChange}
                onFocus={() => setFocusedField("amount")}
                onBlur={() => setFocusedField("")}
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-gray-700
                  placeholder:text-gray-400
                "
              />

              {formData.amount && (
                <CheckCircle2
                  className="text-green-500 shrink-0"
                  size={20}
                />
              )}
            </motion.div>
          </div>

          {/* DATE */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
              <CalendarDays
                size={18}
                className="text-orange-600"
              />
              Due Date
            </label>

            <motion.div
              whileHover={{ y: -1 }}
              className={fieldClass(
                "dueDate",
                "border-orange-500 shadow-orange-100"
              )}
            >
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                onFocus={() => setFocusedField("dueDate")}
                onBlur={() => setFocusedField("")}
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-gray-700
                "
              />

              {formData.dueDate && (
                <CheckCircle2
                  className="text-green-500 shrink-0"
                  size={20}
                />
              )}
            </motion.div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
            <FileText size={18} className="text-purple-600" />
            Description
          </label>

          <motion.div
            whileHover={{ y: -1 }}
            className={`
              rounded-2xl
              border
              p-5
              bg-gray-50
              transition-all
              duration-300
              ${
                focusedField === "description"
                  ? "border-purple-500 bg-white shadow-lg shadow-purple-100"
                  : "border-gray-200 hover:border-gray-300"
              }
            `}
          >
            <textarea
              rows="6"
              name="description"
              placeholder="Describe the deliverables, expectations, revisions, and completion requirements..."
              value={formData.description}
              onChange={handleChange}
              onFocus={() =>
                setFocusedField("description")
              }
              onBlur={() => setFocusedField("")}
              className="
                w-full
                bg-transparent
                outline-none
                resize-none
                text-gray-700
                placeholder:text-gray-400
              "
            />
          </motion.div>
        </div>

        {/* SUMMARY */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="
            rounded-3xl
            border
            border-gray-200
            bg-gradient-to-br
            from-gray-50
            to-blue-50
            p-6
          "
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Milestone Summary
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">
                Title
              </span>

              <span className="text-gray-800">
                {formData.title || "Not specified"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">
                Amount
              </span>

              <span className="text-gray-800">
                ${formData.amount || "0"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">
                Due Date
              </span>

              <span className="text-gray-800">
                {formData.dueDate || "Not selected"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* BUTTON */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          disabled={submitting}
          type="submit"
          className="
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            py-4
            text-lg
            font-bold
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:shadow-2xl
            disabled:opacity-70
          "
        >
          {submitting
            ? "Processing..."
            : isEdit
            ? "Update Milestone"
            : "Create Milestone"}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default MilestoneForm;