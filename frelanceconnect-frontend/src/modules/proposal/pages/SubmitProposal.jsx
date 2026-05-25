import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Send, DollarSign, Clock, FileText, ArrowLeft } from "lucide-react";

const SubmitProposal = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const [form, setForm] = useState({
    coverLetter: "",
    bidAmount: "",
    estimatedDays: "",
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.coverLetter || !form.bidAmount || !form.estimatedDays) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5001/api/v1/proposals",
        {
          jobId: Number(jobId),
          coverLetter: form.coverLetter,
          bidAmount: Number(form.bidAmount),
          estimatedDays: Number(form.estimatedDays),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Proposal submitted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.log("PROPOSAL ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Failed to submit proposal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-10 relative overflow-hidden">

      {/* GLOW BACKGROUND */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-blue-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-indigo-500/20 blur-3xl rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* CARD */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[28px] shadow-2xl p-8 text-white">

          {/* BACK */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-300 hover:text-white mb-6"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-4xl font-black">
              Submit Proposal
            </h1>

            <p className="text-slate-300 mt-2">
              Write a professional proposal to win this job.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* COVER LETTER */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-slate-200 font-semibold">
                <FileText size={18} />
                Cover Letter
              </label>

              <textarea
                name="coverLetter"
                placeholder="Explain why you're the best fit..."
                value={form.coverLetter}
                onChange={handleChange}
                className="w-full h-44 p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-blue-500 resize-none text-white placeholder:text-slate-400"
              />
            </div>

            {/* GRID INPUTS */}
            <div className="grid md:grid-cols-2 gap-5">

              {/* BID */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-slate-200 font-semibold">
                  <DollarSign size={18} />
                  Your Bid
                </label>

                <input
                  type="number"
                  name="bidAmount"
                  placeholder="e.g. 500"
                  value={form.bidAmount}
                  onChange={handleChange}
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-blue-500 text-white placeholder:text-slate-400"
                />
              </div>

              {/* DAYS */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-slate-200 font-semibold">
                  <Clock size={18} />
                  Delivery Days
                </label>

                <input
                  type="number"
                  name="estimatedDays"
                  placeholder="e.g. 7"
                  value={form.estimatedDays}
                  onChange={handleChange}
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-blue-500 text-white placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl hover:shadow-2xl transition-all"
            >
              {loading ? "Submitting..." : "Submit Proposal"}
              <Send size={18} />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SubmitProposal;