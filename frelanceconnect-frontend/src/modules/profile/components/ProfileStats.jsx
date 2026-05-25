// src/modules/profile/components/ProfileStats.jsx

import { motion } from "framer-motion";
import {
  Briefcase,
  Star,
  DollarSign,
  Clock3,
  CheckCircle2,
  Users,
  FolderKanban,
  TrendingUp,
} from "lucide-react";

const ProfileStats = ({
  role = "FREELANCER",

  stats = {
    totalProjects: 0,
    completedProjects: 0,
    activeProjects: 0,
    totalEarnings: 0,
    averageRating: 0,
    totalReviews: 0,
    successRate: 0,
    totalClients: 0,
  },
}) => {
  const freelancerStats = [
    {
      label: "Completed Projects",
      value: stats.completedProjects || 0,
      icon: CheckCircle2,
      gradient: "from-emerald-500 to-green-600",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },

    {
      label: "Active Contracts",
      value: stats.activeProjects || 0,
      icon: FolderKanban,
      gradient: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },

    {
      label: "Total Earnings",
      value: `$${stats.totalEarnings || 0}`,
      icon: DollarSign,
      gradient: "from-yellow-500 to-orange-500",
      bg: "bg-yellow-50",
      text: "text-yellow-600",
    },

    {
      label: "Average Rating",
      value: stats.averageRating || 0,
      icon: Star,
      gradient: "from-pink-500 to-rose-500",
      bg: "bg-pink-50",
      text: "text-pink-600",
    },

    {
      label: "Client Reviews",
      value: stats.totalReviews || 0,
      icon: Users,
      gradient: "from-purple-500 to-violet-600",
      bg: "bg-purple-50",
      text: "text-purple-600",
    },

    {
      label: "Success Rate",
      value: `${stats.successRate || 0}%`,
      icon: TrendingUp,
      gradient: "from-cyan-500 to-sky-600",
      bg: "bg-cyan-50",
      text: "text-cyan-600",
    },
  ];

  const employerStats = [
    {
      label: "Jobs Posted",
      value: stats.totalProjects || 0,
      icon: Briefcase,
      gradient: "from-indigo-500 to-blue-600",
      bg: "bg-indigo-50",
      text: "text-indigo-600",
    },

    {
      label: "Completed Projects",
      value: stats.completedProjects || 0,
      icon: CheckCircle2,
      gradient: "from-emerald-500 to-green-600",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },

    {
      label: "Active Contracts",
      value: stats.activeProjects || 0,
      icon: FolderKanban,
      gradient: "from-orange-500 to-amber-600",
      bg: "bg-orange-50",
      text: "text-orange-600",
    },

    {
      label: "Freelancers Hired",
      value: stats.totalClients || 0,
      icon: Users,
      gradient: "from-pink-500 to-rose-600",
      bg: "bg-pink-50",
      text: "text-pink-600",
    },

    {
      label: "Average Rating",
      value: stats.averageRating || 0,
      icon: Star,
      gradient: "from-yellow-500 to-orange-500",
      bg: "bg-yellow-50",
      text: "text-yellow-600",
    },

    {
      label: "Years Active",
      value: stats.yearsActive || 1,
      icon: Clock3,
      gradient: "from-cyan-500 to-blue-600",
      bg: "bg-cyan-50",
      text: "text-cyan-600",
    },
  ];

  const cards =
    role === "CLIENT"
      ? employerStats
      : freelancerStats;

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800">
          Profile Statistics
        </h2>

        <p className="text-slate-500 mt-2">
          Track your performance, projects, and growth
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                y: -6,
                scale: 1.01,
              }}
              className="
                relative
                overflow-hidden
                bg-white
                rounded-3xl
                border
                border-slate-200
                p-6
                shadow-sm
                hover:shadow-2xl
                transition-all
                duration-300
              "
            >
              {/* TOP GRADIENT */}
              <div
                className={`
                  absolute
                  top-0
                  left-0
                  w-full
                  h-1
                  bg-gradient-to-r
                  ${item.gradient}
                `}
              />

              {/* CONTENT */}
              <div className="flex items-center justify-between">
                {/* LEFT */}
                <div>
                  <p className="text-slate-500 text-sm font-medium">
                    {item.label}
                  </p>

                  <h3 className="text-4xl font-black text-slate-800 mt-3">
                    {item.value}
                  </h3>
                </div>

                {/* ICON */}
                <div
                  className={`
                    w-16
                    h-16
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    ${item.bg}
                  `}
                >
                  <Icon
                    size={30}
                    className={item.text}
                  />
                </div>
              </div>

              {/* BOTTOM MINI INFO */}
              <div className="mt-6 flex items-center gap-2">
                <div
                  className={`
                    w-2
                    h-2
                    rounded-full
                    bg-gradient-to-r
                    ${item.gradient}
                  `}
                />

                <p className="text-sm text-slate-400">
                  Updated recently
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* PERFORMANCE CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.4,
        }}
        className="
          mt-8
          bg-gradient-to-r
          from-slate-900
          via-slate-800
          to-slate-900
          rounded-[32px]
          p-8
          overflow-hidden
          relative
        "
      >
        {/* BG EFFECT */}
        <div
          className="
            absolute
            top-0
            right-0
            w-72
            h-72
            bg-blue-500/10
            rounded-full
            blur-3xl
          "
        />

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* LEFT */}
            <div>
              <h3 className="text-3xl font-black text-white">
                Performance Overview
              </h3>

              <p className="text-slate-300 mt-3 max-w-2xl leading-relaxed">
                Keep improving your profile performance by
                completing projects successfully, maintaining
                strong communication, and receiving positive
                reviews.
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-6">
              {/* CIRCLE */}
              <div
                className="
                  w-32
                  h-32
                  rounded-full
                  border-[10px]
                  border-blue-500
                  flex
                  items-center
                  justify-center
                  bg-white/5
                  backdrop-blur-sm
                "
              >
                <div className="text-center">
                  <h4 className="text-3xl font-black text-white">
                    {stats.successRate || 0}%
                  </h4>

                  <p className="text-slate-300 text-sm mt-1">
                    Success
                  </p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="space-y-4">
                <div>
                  <p className="text-slate-400 text-sm">
                    Rating
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <Star
                      className="text-yellow-400 fill-yellow-400"
                      size={18}
                    />

                    <span className="text-white font-bold text-lg">
                      {stats.averageRating || 0}/5
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">
                    Projects
                  </p>

                  <p className="text-white font-bold text-lg mt-1">
                    {stats.completedProjects || 0} Completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileStats;