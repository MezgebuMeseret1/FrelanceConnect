import { useEffect, useState } from "react";
import client from "../../../core/api/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  Briefcase,
  DollarSign,
  FileText,
  CheckCircle2,
  XCircle,
  Clock3,
  ArrowRight,
  Search,
} from "lucide-react";

const MyProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  /* SEARCH */
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyProposals();
  }, []);

  const fetchMyProposals = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/v1/proposals/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProposals(res.data.data || []);
    } catch (err) {
      console.log("ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  /* FILTER */
  const filteredProposals = proposals.filter((p) =>
    p.job?.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const getStatusStyles = (status) => {
    switch (status) {
      case "ACCEPTED":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          icon: CheckCircle2,
        };

      case "REJECTED":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          icon: XCircle,
        };

      default:
        return {
          bg: "bg-orange-100",
          text: "text-orange-700",
          icon: Clock3,
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-8">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-indigo-100 p-3 rounded-2xl">
              <FileText
                className="text-indigo-600"
                size={26}
              />
            </div>

            <h1 className="text-4xl font-black text-slate-800">
              My Proposals
            </h1>
          </div>

          <p className="text-slate-500">
            Track submitted proposals, bids, and hiring
            status.
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

      {/* SEARCH */}
      <div className="mb-8">
        <div
          className="
            flex
            items-center
            gap-3
            bg-white
            border
            border-slate-200
            rounded-3xl
            px-5
            py-4
            shadow-sm
            focus-within:ring-4
            focus-within:ring-indigo-100
            transition-all
          "
        >
          <Search
            className="text-slate-400"
            size={22}
          />

          <input
            type="text"
            placeholder="Search proposals by job title..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              outline-none
              bg-transparent
              text-slate-700
              placeholder:text-slate-400
            "
          />
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm">
          <p className="text-slate-500 text-lg">
            Loading proposals...
          </p>
        </div>
      ) : filteredProposals.length === 0 ? (
        /* EMPTY STATE */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            bg-white
            border
            border-slate-200
            rounded-3xl
            p-14
            text-center
            shadow-sm
          "
        >
          <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase
              className="text-indigo-600"
              size={36}
            />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            No Matching Proposals
          </h2>

          <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
            Try searching with another keyword or apply
            to more jobs.
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/jobs")}
            className="
              mt-8
              bg-gradient-to-r
              from-indigo-600
              to-blue-600
              text-white
              px-8
              py-4
              rounded-2xl
              font-bold
              shadow-lg
              hover:shadow-2xl
              transition-all
            "
          >
            Browse Jobs
          </motion.button>
        </motion.div>
      ) : (
        /* PROPOSAL GRID */
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
          {filteredProposals.map((p) => {
            const statusStyle = getStatusStyles(p.status);
            const StatusIcon = statusStyle.icon;

            return (
              <motion.div
                key={p.id}
                whileHover={{
                  y: -5,
                }}
                onClick={() =>
                  navigate(`/jobs/${p.jobId}`)
                }
                className="
                  relative
                  overflow-hidden
                  bg-white
                  border
                  border-slate-200
                  rounded-[30px]
                  p-7
                  shadow-sm
                  hover:shadow-2xl
                  transition-all
                  duration-300
                  cursor-pointer
                "
              >
                {/* STATUS */}
                <div
                  className={`
                    absolute
                    top-5
                    right-5
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-bold
                    ${statusStyle.bg}
                    ${statusStyle.text}
                  `}
                >
                  <StatusIcon size={16} />
                  {p.status}
                </div>

                {/* JOB */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 p-3 rounded-2xl">
                      <Briefcase
                        className="text-blue-600"
                        size={20}
                      />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Applied Job
                      </p>

                      <h2 className="text-2xl font-black text-slate-800">
                        {p.job?.title}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* BID */}
                <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <DollarSign
                        className="text-green-600"
                        size={20}
                      />
                    </div>

                    <div>
                      <p className="text-sm text-green-700">
                        Your Bid
                      </p>

                      <h3 className="text-2xl font-black text-green-700">
                        ${p.bidAmount}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* COVER LETTER */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText
                      className="text-slate-500"
                      size={18}
                    />

                    <h3 className="font-bold text-slate-700">
                      Cover Letter
                    </h3>
                  </div>

                  <div
                    className="
                      bg-slate-50
                      border
                      border-slate-100
                      rounded-2xl
                      p-5
                    "
                  >
                    <p className="text-slate-600 leading-relaxed line-clamp-4">
                      {p.coverLetter}
                    </p>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="text-sm text-slate-400">
                    Click card to view job
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/jobs/${p.jobId}`);
                    }}
                    className="
                      flex
                      items-center
                      gap-2
                      bg-gradient-to-r
                      from-indigo-600
                      to-blue-600
                      text-white
                      px-5
                      py-3
                      rounded-2xl
                      font-bold
                      shadow-lg
                      hover:shadow-2xl
                      transition-all
                    "
                  >
                    View Job
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyProposals;