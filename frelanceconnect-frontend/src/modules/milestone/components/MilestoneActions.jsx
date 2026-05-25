import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import {
  Wallet,
  PlayCircle,
  UploadCloud,
  CheckCircle2,
  BadgeDollarSign,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Lock,
  Sparkles,
  TimerReset,
} from "lucide-react";

import {
  updateMilestoneStatus,
} from "../../../app/store/slices/milestone.slice";

// ======================================================
// WORKFLOW CONFIG
// ======================================================

const workflowSteps = [
  "PENDING",
  "FUNDED",
  "IN_PROGRESS",
  "SUBMITTED",
  "APPROVED",
  "RELEASED",
];

const statusConfig = {
  PENDING: {
    label: "Fund Milestone",
    nextStatus: "FUNDED",
    icon: Wallet,
    gradient:
      "from-yellow-500 via-orange-500 to-amber-500",
    description:
      "Secure funds for this milestone before work begins.",
    allowedRole: "CLIENT",
  },

  FUNDED: {
    label: "Start Work",
    nextStatus: "IN_PROGRESS",
    icon: PlayCircle,
    gradient:
      "from-cyan-500 via-sky-500 to-blue-600",
    description:
      "Work officially begins on this milestone.",
    allowedRole: "FREELANCER",
  },

  IN_PROGRESS: {
    label: "Submit Work",
    nextStatus: "SUBMITTED",
    icon: UploadCloud,
    gradient:
      "from-violet-500 via-purple-500 to-fuchsia-600",
    description:
      "Submit deliverables for client review.",
    allowedRole: "FREELANCER",
  },

  SUBMITTED: {
    label: "Approve Work",
    nextStatus: "APPROVED",
    icon: CheckCircle2,
    gradient:
      "from-emerald-500 via-green-500 to-teal-600",
    description:
      "Client approves completed work.",
    allowedRole: "CLIENT",
  },

  APPROVED: {
    label: "Release Payment",
    nextStatus: "RELEASED",
    icon: BadgeDollarSign,
    gradient:
      "from-pink-500 via-rose-500 to-red-500",
    description:
      "Release escrow payment to freelancer.",
    allowedRole: "CLIENT",
  },
};

// ======================================================
// COMPONENT
// ======================================================

const MilestoneActions = ({
  milestone,
}) => {
  const dispatch = useDispatch();

  const [actionLoading, setActionLoading] =
    useState(false);

  const { loading } = useSelector(
    (state) => state.milestone
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  const currentAction = useMemo(() => {
    return statusConfig[milestone?.status];
  }, [milestone]);

  if (!milestone) return null;

  const currentStepIndex =
    workflowSteps.indexOf(
      milestone.status
    );

  const canPerformAction =
    currentAction &&
    user?.role ===
      currentAction.allowedRole;

  // ======================================================
  // UPDATE STATUS
  // ======================================================

  const handleStatusUpdate = async () => {
    if (!currentAction) return;

    try {
      setActionLoading(true);

      await dispatch(
        updateMilestoneStatus({
          id: milestone.id,
          status:
            currentAction.nextStatus,
        })
      ).unwrap();
    } catch (error) {
  console.error("STATUS UPDATE ERROR FULL:", error);
  console.error("SERVER RESPONSE:", error?.response?.data);
  console.error("STATUS CODE:", error?.response?.status);
} finally {
      setActionLoading(false);
    }
    
  };

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div className="space-y-6">
      {/* ================================================= */}
      {/* MAIN ACTION PANEL */}
      {/* ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          relative overflow-hidden
          rounded-[32px]
          border border-slate-800
          bg-gradient-to-br
          from-slate-900
          via-slate-900
          to-slate-950
          p-7
          shadow-[0_20px_80px_rgba(0,0,0,0.45)]
        "
      >
        {/* BG GLOW */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.15),transparent_30%)]
            pointer-events-none
          "
        />

        {/* TOP */}
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
          {/* LEFT */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="
                  w-14 h-14 rounded-2xl
                  flex items-center justify-center
                  bg-cyan-500/10
                  border border-cyan-400/20
                "
              >
                <Sparkles className="w-7 h-7 text-cyan-400" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-white">
                  Milestone Workflow
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  Manage milestone delivery
                  lifecycle and payments.
                </p>
              </div>
            </div>

            {/* STATUS */}
            <div className="flex flex-wrap items-center gap-3">
              <div
                className="
                  px-4 py-2 rounded-2xl
                  border border-cyan-500/20
                  bg-cyan-500/10
                  text-cyan-400
                  font-bold text-sm
                "
              >
                {milestone.status}
              </div>

              {currentAction && (
                <>
                  <ArrowRight className="w-5 h-5 text-slate-500" />

                  <div
                    className="
                      px-4 py-2 rounded-2xl
                      border border-emerald-500/20
                      bg-emerald-500/10
                      text-emerald-400
                      font-bold text-sm
                    "
                  >
                    {currentAction.nextStatus}
                  </div>
                </>
              )}
            </div>

            {/* DESCRIPTION */}
            {currentAction && (
              <p className="text-slate-300 max-w-2xl leading-relaxed">
                {
                  currentAction.description
                }
              </p>
            )}
          </div>

          {/* RIGHT */}
          <div className="w-full xl:w-auto">
            {currentAction ? (
              canPerformAction ? (
                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={
                    handleStatusUpdate
                  }
                  disabled={
                    loading ||
                    actionLoading
                  }
                  className={`
                    relative overflow-hidden
                    flex items-center justify-center gap-3
                    min-w-[280px]
                    rounded-2xl
                    px-7 py-5
                    text-white
                    font-bold
                    shadow-2xl
                    transition-all duration-300
                    bg-gradient-to-r ${currentAction.gradient}
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                  `}
                >
                  {/* SHINE */}
                  <div
                    className="
                      absolute inset-0
                      bg-white/10
                      translate-x-[-100%]
                      hover:translate-x-[100%]
                      transition-transform duration-1000
                    "
                  />

                  {loading ||
                  actionLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />

                      <span>
                        Updating...
                      </span>
                    </>
                  ) : (
                    <>
                      <currentAction.icon className="w-5 h-5" />

                      <span>
                        {
                          currentAction.label
                        }
                      </span>
                    </>
                  )}
                </motion.button>
              ) : (
                <div
                  className="
                    flex items-start gap-4
                    rounded-2xl
                    border border-amber-500/20
                    bg-amber-500/10
                    p-5
                    max-w-sm
                  "
                >
                  <div
                    className="
                      w-12 h-12 rounded-xl
                      bg-amber-500/20
                      flex items-center justify-center
                      shrink-0
                    "
                  >
                    <Lock className="w-6 h-6 text-amber-400" />
                  </div>

                  <div>
                    <h3 className="font-bold text-white">
                      Action Restricted
                    </h3>

                    <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                      Only{" "}
                      <span className="font-semibold text-amber-400">
                        {currentAction.allowedRole.toLowerCase()}
                      </span>{" "}
                      can perform this
                      workflow action.
                    </p>
                  </div>
                </div>
              )
            ) : (
              <div
                className="
                  flex items-center gap-4
                  rounded-2xl
                  border border-emerald-500/20
                  bg-emerald-500/10
                  px-6 py-5
                "
              >
                <ShieldCheck className="w-6 h-6 text-emerald-400" />

                <div>
                  <h3 className="font-bold text-white">
                    Milestone Completed
                  </h3>

                  <p className="text-sm text-slate-300 mt-1">
                    Payment released
                    successfully.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* ================================================= */}
      {/* WORKFLOW TIMELINE */}
      {/* ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.05,
        }}
        className="
          rounded-[32px]
          border border-slate-800
          bg-slate-900
          p-7
          shadow-xl
        "
      >
        <div className="flex items-center gap-3 mb-8">
          <div
            className="
              w-12 h-12 rounded-2xl
              bg-violet-500/10
              border border-violet-500/20
              flex items-center justify-center
            "
          >
            <TimerReset className="w-6 h-6 text-violet-400" />
          </div>

          <div>
            <h3 className="text-xl font-black text-white">
              Workflow Progress
            </h3>

            <p className="text-sm text-slate-400 mt-1">
              Current delivery pipeline
              progress.
            </p>
          </div>
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
          {workflowSteps.map(
            (step, index) => {
              const isActive =
                milestone.status === step;

              const isCompleted =
                currentStepIndex >
                index;

              return (
                <motion.div
                  key={step}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.05,
                  }}
                  className={`
                    relative overflow-hidden
                    rounded-3xl
                    border
                    p-5
                    transition-all duration-300
                    ${
                      isActive
                        ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                        : isCompleted
                        ? "border-emerald-500/20 bg-emerald-500/10"
                        : "border-slate-800 bg-slate-950"
                    }
                  `}
                >
                  {/* NUMBER */}
                  <div
                    className={`
                      w-10 h-10 rounded-2xl
                      flex items-center justify-center
                      text-sm font-black mb-4
                      ${
                        isActive
                          ? "bg-cyan-500 text-white"
                          : isCompleted
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-800 text-slate-400"
                      }
                    `}
                  >
                    {index + 1}
                  </div>

                  {/* LABEL */}
                  <h4
                    className={`
                      font-bold text-sm
                      ${
                        isActive
                          ? "text-white"
                          : isCompleted
                          ? "text-emerald-300"
                          : "text-slate-500"
                      }
                    `}
                  >
                    {step}
                  </h4>

                  {/* STATUS */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.9,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                        className="
                          mt-3 inline-flex
                          rounded-xl
                          bg-cyan-500/20
                          px-3 py-1
                          text-xs font-bold
                          text-cyan-300
                        "
                      >
                        Current
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            }
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MilestoneActions;