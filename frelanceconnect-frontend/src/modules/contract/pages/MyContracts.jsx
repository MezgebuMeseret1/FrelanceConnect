import { useEffect, useState } from "react";
import client from "../../../core/api/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FileText,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  User,
  Briefcase,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

const MyContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/v1/contracts/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContracts(res.data.data || []);
    } catch (err) {
      console.log("ERROR loading contracts:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "ACTIVE":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          icon: CheckCircle2,
        };

      case "COMPLETED":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          icon: CheckCircle2,
        };

      case "CANCELLED":
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-8">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 p-3 rounded-2xl">
              <FileText
                className="text-blue-600"
                size={26}
              />
            </div>

            <h1 className="text-4xl font-black text-slate-800">
              My Contracts
            </h1>
          </div>

          <p className="text-slate-500">
            Manage active projects, agreements, and work progress.
          </p>
        </div>

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
            shadow-sm
            px-6
            py-4
            rounded-2xl
            font-semibold
            text-slate-700
            hover:shadow-lg
            transition-all
          "
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </motion.button>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm">
          <p className="text-slate-500 text-lg">
            Loading contracts...
          </p>
        </div>
      ) : contracts.length === 0 ? (
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
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase
              className="text-blue-600"
              size={36}
            />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            No Contracts Yet
          </h2>

          <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
            Once a proposal is accepted, your contracts will
            appear here for tracking and management.
          </p>
        </motion.div>
      ) : (
        /* CONTRACT GRID */
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
          {contracts.map((c) => {
            const statusStyle = getStatusStyles(c.status);
            const StatusIcon = statusStyle.icon;

            return (
              <motion.div
                key={c.id}
                whileHover={{ y: -5 }}
                className="
                  relative
                  overflow-hidden
                  bg-white
                  border
                  border-slate-200
                  rounded-3xl
                  p-7
                  shadow-sm
                  hover:shadow-2xl
                  transition-all
                  duration-300
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
                  {c.status}
                </div>

                {/* TITLE */}
                <div className="mb-7">
                  <h3 className="text-2xl font-black text-slate-800 mb-3">
                    {c.job?.title}
                  </h3>

                  <p className="text-slate-500 leading-relaxed">
                    Professional contract agreement between
                    client and freelancer.
                  </p>
                </div>

                {/* INFO */}
                <div className="space-y-4 mb-8">
                  {/* CLIENT */}
                  <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4">
                    <div className="bg-indigo-100 p-3 rounded-xl">
                      <User
                        className="text-indigo-600"
                        size={18}
                      />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Client
                      </p>

                      <h4 className="font-bold text-slate-800">
                        {c.client?.name}
                      </h4>
                    </div>
                  </div>

                  {/* FREELANCER */}
                  <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <User
                        className="text-blue-600"
                        size={18}
                      />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Freelancer
                      </p>

                      <h4 className="font-bold text-slate-800">
                        {c.freelancer?.name}
                      </h4>
                    </div>
                  </div>

                  {/* DATE */}
                  <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4">
                    <div className="bg-orange-100 p-3 rounded-xl">
                      <CalendarDays
                        className="text-orange-600"
                        size={18}
                      />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Created At
                      </p>

                      <h4 className="font-bold text-slate-800">
                        {new Date(
                          c.createdAt
                        ).toLocaleDateString()}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      navigate(`/contracts/${c.id}`)
                    }
                    className="
                      flex-1
                      bg-gradient-to-r
                      from-blue-600
                      to-indigo-600
                      text-white
                      py-4
                      rounded-2xl
                      font-bold
                      shadow-lg
                      hover:shadow-2xl
                      transition-all
                    "
                  >
                    View Contract
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      navigate(`/jobs/${c.jobId}`)
                    }
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      flex-1
                      bg-slate-100
                      hover:bg-slate-200
                      text-slate-700
                      py-4
                      rounded-2xl
                      font-bold
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

export default MyContracts;