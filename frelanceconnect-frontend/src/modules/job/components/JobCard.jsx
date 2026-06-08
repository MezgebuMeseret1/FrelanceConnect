import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Briefcase, DollarSign, Pencil, Trash2, FileText, ArrowRight } from "lucide-react";
import { deleteJob } from "../../../core/services/job.service";

const JobCard = ({ job, onDeleted }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const isOwner = user && job.clientId === user.id;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await deleteJob(job.id);
      if (onDeleted) onDeleted(job.id);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white border border-slate-200 rounded-[28px] p-7 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* TOP */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="bg-indigo-100 p-3 rounded-2xl shrink-0">
          <Briefcase className="text-indigo-600" size={22} />
        </div>

        {/* OWNER ACTIONS */}
        {isOwner && (
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/jobs/${job.id}/edit`)}
              className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-semibold text-sm px-4 py-2 rounded-2xl transition-all"
            >
              <Pencil size={14} />
              Edit
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDelete}
              className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-500 font-semibold text-sm px-4 py-2 rounded-2xl transition-all"
            >
              <Trash2 size={14} />
              Delete
            </motion.button>
          </div>
        )}
      </div>

      {/* TITLE */}
      <h3 className="text-xl font-black text-slate-800 mb-3 leading-snug">
        {job.title}
      </h3>

      {/* DESCRIPTION */}
      <div className="flex items-start gap-2 mb-5">
        <FileText className="text-slate-400 mt-0.5 shrink-0" size={16} />
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
          {job.description}
        </p>
      </div>

      {/* BUDGET */}
      <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-2xl px-4 py-3 mb-6 w-fit">
        <DollarSign className="text-green-600" size={18} />
        <span className="text-green-700 font-black text-lg">
          {Number(job.budget).toLocaleString()}
        </span>
        <span className="text-green-600 text-sm font-medium">budget</span>
      </div>

      {/* BOTTOM ACTIONS */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/jobs/${job.id}`)}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-5 py-3 rounded-2xl transition-all text-sm"
        >
          View Details
        </motion.button>

        {/* Hide Apply button if owner */}
        {!isOwner && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/jobs/${job.id}/apply`)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold px-5 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all text-sm"
          >
            Apply Now
            <ArrowRight size={15} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default JobCard;