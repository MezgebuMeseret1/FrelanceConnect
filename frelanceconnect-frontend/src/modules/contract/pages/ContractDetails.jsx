import { useEffect, useState } from "react";
import client from "../../../core/api/client";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  Briefcase,
  User,
  CalendarDays,
  FileText,
  CheckCircle2,
  Clock3,
  XCircle,
  Target,
  ArrowRight,
} from "lucide-react";

const ContractDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchContract();
  }, []);

  const fetchContract = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/v1/contracts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContract(res.data.data);
    } catch (err) {
      console.log("ERROR loading contract:", err);
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

  /* LOADING */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white border border-slate-200 rounded-3xl px-10 py-8 shadow-sm">
          <p className="text-slate-500 text-lg">
            Loading contract...
          </p>
        </div>
      </div>
    );
  }

  /* NOT FOUND */
  if (!contract) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white border border-slate-200 rounded-3xl px-10 py-8 shadow-sm">
          <p className="text-red-500 text-lg">
            Contract not found.
          </p>
        </div>
      </div>
    );
  }

  const statusStyle = getStatusStyles(contract.status);
  const StatusIcon = statusStyle.icon;

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
              Contract Details
            </h1>
          </div>

          <p className="text-slate-500">
            Review contract information, milestones,
            and project details.
          </p>
        </div>

        {/* BACK BUTTON */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/contracts")}
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
          Back to Contracts
        </motion.button>
      </div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          bg-white
          border
          border-slate-200
          rounded-[32px]
          p-8
          shadow-sm
        "
      >
        {/* TOP */}
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-indigo-100 p-3 rounded-2xl">
                <Briefcase
                  className="text-indigo-600"
                  size={22}
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Project
                </p>

                <h2 className="text-3xl font-black text-slate-800">
                  {contract.job?.title}
                </h2>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed max-w-3xl">
              This contract manages collaboration,
              milestones, and payment workflow between
              the client and freelancer.
            </p>
          </div>

          {/* STATUS */}
          <div
            className={`
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-2xl
              font-bold
              text-sm
              ${statusStyle.bg}
              ${statusStyle.text}
            `}
          >
            <StatusIcon size={18} />
            {contract.status}
          </div>
        </div>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* CLIENT */}
          <motion.div
            whileHover={{ y: -3 }}
            className="
              bg-slate-50
              rounded-3xl
              p-6
              border
              border-slate-100
            "
          >
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 p-4 rounded-2xl">
                <User
                  className="text-indigo-600"
                  size={22}
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Client
                </p>

                <h3 className="text-xl font-bold text-slate-800">
                  {contract.client?.name}
                </h3>
              </div>
            </div>
          </motion.div>

          {/* FREELANCER */}
          <motion.div
            whileHover={{ y: -3 }}
            className="
              bg-slate-50
              rounded-3xl
              p-6
              border
              border-slate-100
            "
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-2xl">
                <User
                  className="text-blue-600"
                  size={22}
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Freelancer
                </p>

                <h3 className="text-xl font-bold text-slate-800">
                  {contract.freelancer?.name}
                </h3>
              </div>
            </div>
          </motion.div>

          {/* DATE */}
          <motion.div
            whileHover={{ y: -3 }}
            className="
              bg-slate-50
              rounded-3xl
              p-6
              border
              border-slate-100
            "
          >
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-2xl">
                <CalendarDays
                  className="text-orange-600"
                  size={22}
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Created At
                </p>

                <h3 className="text-xl font-bold text-slate-800">
                  {new Date(
                    contract.createdAt
                  ).toLocaleDateString()}
                </h3>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* VIEW MILESTONES */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              navigate(
                `/contracts/${contract.id}/milestones`
              )
            }
            className="
              flex
              items-center
              justify-center
              gap-3
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              text-white
              py-5
              rounded-3xl
              font-bold
              shadow-lg
              hover:shadow-2xl
              transition-all
            "
          >
            <Target size={20} />
            View Milestones
          </motion.button>

          {/* CREATE MILESTONE */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              navigate(
                `/milestones/create/${contract.id}`
              )
            }
            className="
              flex
              items-center
              justify-center
              gap-3
              bg-slate-900
              hover:bg-slate-800
              text-white
              py-5
              rounded-3xl
              font-bold
              transition-all
            "
          >
            <CheckCircle2 size={20} />
            Create Milestone
          </motion.button>

          {/* VIEW JOB */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              navigate(`/jobs/${contract.jobId}`)
            }
            className="
              flex
              items-center
              justify-center
              gap-3
              bg-slate-100
              hover:bg-slate-200
              text-slate-700
              py-5
              rounded-3xl
              font-bold
              transition-all
            "
          >
            View Job
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ContractDetails;