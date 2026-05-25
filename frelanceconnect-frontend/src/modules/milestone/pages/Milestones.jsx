import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import {
  Target,
  AlertCircle,
  Loader2,
  FolderOpen,
  Plus,
  TrendingUp,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import MilestoneCard from "../components/MilestoneCard";

import {
  fetchContractMilestones,
} from "../../../app/store/slices/milestone.slice";

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
  },
};

const Milestones = () => {
  const { contractId } = useParams();

  const dispatch = useDispatch();

  const {
    milestones = [],
    loading = false,
    error = null,
  } = useSelector(
    (state) => state.milestone || {}
  );

  // =====================================================
  // FETCH DATA
  // =====================================================

  useEffect(() => {
    if (contractId) {
      dispatch(
        fetchContractMilestones(contractId)
      );
    }
  }, [dispatch, contractId]);

  // =====================================================
  // STATS
  // =====================================================

  const stats = useMemo(() => {
    const total = milestones.length;

    const completed = milestones.filter(
      (m) => m.status === "RELEASED"
    ).length;

    const inProgress = milestones.filter(
      (m) =>
        m.status === "IN_PROGRESS" ||
        m.status === "SUBMITTED"
    ).length;

    const totalAmount = milestones.reduce(
      (sum, milestone) =>
        sum + Number(milestone.amount || 0),
      0
    );

    return {
      total,
      completed,
      inProgress,
      totalAmount,
    };
  }, [milestones]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6">
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

            <Loader2 className="w-24 h-24 absolute inset-0 text-cyan-400 animate-spin" />
          </div>

          <h2 className="text-2xl font-bold text-white">
            Loading Milestones
          </h2>

          <p className="text-slate-400 mt-2">
            Fetching project progress...
          </p>
        </motion.div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
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
            w-full
            max-w-lg
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

          <p className="text-slate-400 leading-relaxed">
            {error}
          </p>

          <button
            onClick={() =>
              dispatch(
                fetchContractMilestones(
                  contractId
                )
              )
            }
            className="
              mt-8
              px-6
              py-3
              rounded-2xl
              bg-red-500
              hover:bg-red-600
              transition-all
              font-semibold
              text-white
            "
          >
            Retry Request
          </button>
        </motion.div>
      </div>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            flex
            flex-col
            xl:flex-row
            xl:items-center
            xl:justify-between
            gap-8
            mb-12
          "
        >
          {/* LEFT */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="
                  w-16
                  h-16
                  rounded-3xl
                  bg-cyan-500/10
                  border
                  border-cyan-400/20
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  shadow-cyan-500/10
                "
              >
                <Target className="w-8 h-8 text-cyan-400" />
              </div>

              <div>
                <h1 className="text-5xl font-black tracking-tight">
                  Milestones
                </h1>

                <p className="text-slate-400 mt-1">
                  Track deliverables,
                  approvals, and payment
                  progress
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <Link
            to={`/milestones/create/${contractId}`}
            className="
              inline-flex
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              px-6
              py-4
              font-bold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:shadow-cyan-500/20
            "
          >
            <Plus size={20} />
            Create Milestone
          </Link>
        </motion.div>

        {/* ================================================= */}
        {/* STATS */}
        {/* ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-5
            mb-12
          "
        >
          {/* TOTAL */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                <Target className="text-cyan-400" />
              </div>

              <span className="text-xs text-slate-500">
                ALL
              </span>
            </div>

            <h2 className="text-4xl font-black text-white">
              {stats.total}
            </h2>

            <p className="text-slate-400 mt-2">
              Total Milestones
            </p>
          </div>

          {/* COMPLETED */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="text-emerald-400" />
              </div>

              <span className="text-xs text-slate-500">
                DONE
              </span>
            </div>

            <h2 className="text-4xl font-black text-white">
              {stats.completed}
            </h2>

            <p className="text-slate-400 mt-2">
              Released Payments
            </p>
          </div>

          {/* ACTIVE */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                <Clock3 className="text-orange-400" />
              </div>

              <span className="text-xs text-slate-500">
                ACTIVE
              </span>
            </div>

            <h2 className="text-4xl font-black text-white">
              {stats.inProgress}
            </h2>

            <p className="text-slate-400 mt-2">
              In Progress
            </p>
          </div>

          {/* VALUE */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                <TrendingUp className="text-violet-400" />
              </div>

              <span className="text-xs text-slate-500">
                VALUE
              </span>
            </div>

            <h2 className="text-4xl font-black text-white">
              ${stats.totalAmount}
            </h2>

            <p className="text-slate-400 mt-2">
              Total Budget
            </p>
          </div>
        </motion.div>

        {/* ================================================= */}
        {/* EMPTY STATE */}
        {/* ================================================= */}

        {milestones.length === 0 ? (
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
              p-14
              text-center
              shadow-2xl
            "
          >
            <div className="w-28 h-28 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-8">
              <FolderOpen className="w-14 h-14 text-slate-500" />
            </div>

            <h2 className="text-3xl font-black mb-4">
              No Milestones Yet
            </h2>

            <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
              This contract doesn't have any
              milestones yet. Create your
              first milestone to start
              tracking project progress,
              submissions, approvals, and
              payments.
            </p>

            <Link
              to={`/milestones/create/${contractId}`}
              className="
                inline-flex
                items-center
                gap-3
                mt-8
                rounded-2xl
                bg-cyan-500
                px-6
                py-4
                font-bold
                transition-all
                hover:bg-cyan-600
              "
            >
              <Plus size={20} />
              Create First Milestone
            </Link>
          </motion.div>
        ) : (
          // =================================================
          // MILESTONE LIST
          // =================================================
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {milestones.map(
              (milestone) => (
                <motion.div
                  key={milestone.id}
                  variants={itemVariants}
                >
                  <MilestoneCard
                    milestone={milestone}
                  />
                </motion.div>
              )
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Milestones;