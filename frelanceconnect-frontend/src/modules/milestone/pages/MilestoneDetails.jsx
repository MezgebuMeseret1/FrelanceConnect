import { useEffect } from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { motion } from "framer-motion";

import {
  fetchMilestoneById,
} from "../../../app/store/slices/milestone.slice";

import MilestoneTimeline from "../components/MilestoneTimeline";

import {
  Target,
  CalendarDays,
  DollarSign,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Clock3,
  ArrowLeft,
  Briefcase,
  User2,
  FileText,
  Sparkles,
} from "lucide-react";

// ======================================================
// STATUS COLORS
// ======================================================

const statusStyles = {
  PENDING:
    "bg-slate-500/10 text-slate-300 border-slate-500/20",

  FUNDED:
    "bg-blue-500/10 text-blue-300 border-blue-500/20",

  IN_PROGRESS:
    "bg-orange-500/10 text-orange-300 border-orange-500/20",

  SUBMITTED:
    "bg-purple-500/10 text-purple-300 border-purple-500/20",

  APPROVED:
    "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",

  RELEASED:
    "bg-green-500/10 text-green-300 border-green-500/20",
};

// ======================================================
// COMPONENT
// ======================================================

const MilestoneDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    currentMilestone,
    loading,
    error,
  } = useSelector(
    (state) => state.milestone || {}
  );

  // ======================================================
  // FETCH
  // ======================================================

  useEffect(() => {
    if (id) {
      dispatch(fetchMilestoneById(id));
    }
  }, [dispatch, id]);

  // ======================================================
  // LOADING
  // ======================================================

  if (loading || !currentMilestone) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-full border-4 border-cyan-500/10" />

            <Loader2 className="w-24 h-24 absolute inset-0 animate-spin text-cyan-400" />
          </div>

          <h2 className="text-2xl font-bold text-white">
            Loading Milestone
          </h2>

          <p className="text-slate-400 mt-2">
            Fetching milestone details...
          </p>
        </motion.div>
      </div>
    );
  }

  // ======================================================
  // ERROR
  // ======================================================

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            max-w-lg
            w-full
            rounded-3xl
            border
            border-red-500/20
            bg-slate-900/80
            backdrop-blur-xl
            p-10
            text-center
            shadow-2xl
          "
        >
          <div className="w-24 h-24 rounded-3xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-12 h-12 text-red-400" />
          </div>

          <h2 className="text-3xl font-black text-white mb-3">
            Failed to Load
          </h2>

          <p className="text-slate-400">
            {error}
          </p>
        </motion.div>
      </div>
    );
  }

  // ======================================================
  // DATA
  // ======================================================

  const status =
    currentMilestone.status || "PENDING";

  const dueDate =
    currentMilestone.dueDate
      ? new Date(
          currentMilestone.dueDate
        ).toLocaleDateString()
      : "No due date";

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* ================================================= */}
        {/* TOP BAR */}
        {/* ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
            mb-10
          "
        >
          {/* LEFT */}
          <div className="flex items-start gap-5">
            <Link
              to={-1}
              className="
                w-14
                h-14
                rounded-2xl
                border
                border-slate-800
                bg-slate-900/70
                flex
                items-center
                justify-center
                hover:border-cyan-500/30
                transition-all
              "
            >
              <ArrowLeft className="w-6 h-6 text-slate-300" />
            </Link>

            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                  <Target className="w-8 h-8 text-cyan-400" />
                </div>

                <div>
                  <h1 className="text-5xl font-black leading-tight">
                    {currentMilestone.title}
                  </h1>

                  <p className="text-slate-400 mt-1">
                    Detailed milestone
                    overview and progress
                    tracking
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* STATUS */}
          <div
            className={`
              inline-flex
              items-center
              gap-3
              px-5
              py-3
              rounded-2xl
              border
              font-bold
              text-sm
              ${statusStyles[status]}
            `}
          >
            {status === "RELEASED" ? (
              <CheckCircle2 size={18} />
            ) : (
              <Clock3 size={18} />
            )}

            {status.replace("_", " ")}
          </div>
        </motion.div>

        {/* ================================================= */}
        {/* GRID */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* ================================================= */}
          {/* LEFT CONTENT */}
          {/* ================================================= */}

          <div className="xl:col-span-2 space-y-8">
            {/* DESCRIPTION */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                rounded-[32px]
                border
                border-slate-800
                bg-slate-900/70
                backdrop-blur-xl
                p-8
                shadow-2xl
              "
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                  <FileText className="text-purple-400" />
                </div>

                <div>
                  <h2 className="text-2xl font-black">
                    Description
                  </h2>

                  <p className="text-slate-400 text-sm">
                    Deliverables and scope
                  </p>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed text-[15px]">
                {currentMilestone.description}
              </p>
            </motion.div>

            {/* TIMELINE */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1,
              }}
              className="
                rounded-[32px]
                border
                border-slate-800
                bg-slate-900/70
                backdrop-blur-xl
                p-8
                shadow-2xl
              "
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                  <Sparkles className="text-cyan-400" />
                </div>

                <div>
                  <h2 className="text-2xl font-black">
                    Milestone Progress
                  </h2>

                  <p className="text-slate-400 text-sm">
                    Current workflow stage
                  </p>
                </div>
              </div>

              <MilestoneTimeline
                status={status}
              />
            </motion.div>
          </div>

          {/* ================================================= */}
          {/* SIDEBAR */}
          {/* ================================================= */}

          <div className="space-y-6">
            {/* SUMMARY */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                rounded-[32px]
                border
                border-slate-800
                bg-slate-900/70
                backdrop-blur-xl
                p-8
                shadow-2xl
              "
            >
              <h2 className="text-2xl font-black mb-8">
                Milestone Summary
              </h2>

              <div className="space-y-6">
                {/* AMOUNT */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-emerald-400" />
                    </div>

                    <div>
                      <p className="text-sm text-slate-400">
                        Budget
                      </p>

                      <h3 className="font-semibold">
                        Total Payment
                      </h3>
                    </div>
                  </div>

                  <h2 className="text-2xl font-black text-emerald-400">
                    $
                    {
                      currentMilestone.amount
                    }
                  </h2>
                </div>

                {/* DATE */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                      <CalendarDays className="w-5 h-5 text-orange-400" />
                    </div>

                    <div>
                      <p className="text-sm text-slate-400">
                        Due Date
                      </p>

                      <h3 className="font-semibold">
                        Deadline
                      </h3>
                    </div>
                  </div>

                  <span className="font-semibold text-slate-200">
                    {dueDate}
                  </span>
                </div>

                {/* CLIENT */}
                {currentMilestone.contract
                  ?.client && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                        <User2 className="w-5 h-5 text-cyan-400" />
                      </div>

                      <div>
                        <p className="text-sm text-slate-400">
                          Client
                        </p>

                        <h3 className="font-semibold">
                          Project Owner
                        </h3>
                      </div>
                    </div>

                    <span className="font-semibold text-slate-200">
                      {
                        currentMilestone
                          .contract.client
                          .name
                      }
                    </span>
                  </div>
                )}

                {/* JOB */}
                {currentMilestone.contract
                  ?.job && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-violet-400" />
                      </div>

                      <div>
                        <p className="text-sm text-slate-400">
                          Project
                        </p>

                        <h3 className="font-semibold">
                          Related Job
                        </h3>
                      </div>
                    </div>

                    <span className="font-semibold text-slate-200 max-w-[180px] truncate">
                      {
                        currentMilestone
                          .contract.job
                          .title
                      }
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* QUICK STATUS */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
              }}
              className="
                rounded-[32px]
                border
                border-cyan-500/20
                bg-gradient-to-br
                from-cyan-500/10
                to-blue-500/10
                p-8
                shadow-xl
              "
            >
              <h2 className="text-2xl font-black mb-4">
                Current Status
              </h2>

              <p className="text-slate-300 leading-relaxed mb-6">
                This milestone is currently in{" "}
                <span className="font-bold text-cyan-300">
                  {status.replace(
                    "_",
                    " "
                  )}
                </span>{" "}
                stage.
              </p>

              <div
                className={`
                  inline-flex
                  items-center
                  gap-3
                  rounded-2xl
                  px-5
                  py-3
                  border
                  font-bold
                  ${statusStyles[status]}
                `}
              >
                {status}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneDetails;