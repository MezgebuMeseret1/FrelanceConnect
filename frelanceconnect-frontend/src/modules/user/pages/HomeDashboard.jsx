import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Search,
  Users,
  ShieldCheck,
  Star,
} from "lucide-react";

const HomeDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* BACKGROUND IMAGE */}
      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
          bg-no-repeat
          scale-105
        "
        style={{
          backgroundImage: "url('/assets/home-bg.png.png')",
        }}
      />

      {/* OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-slate-950/90
          via-slate-900/80
          to-indigo-950/80
        "
      />

      {/* GLOW */}
      <div className="absolute top-[-150px] left-[-100px] h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-3xl" />

      <div className="absolute bottom-[-200px] right-[-100px] h-[450px] w-[450px] rounded-full bg-indigo-500/20 blur-3xl" />

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* BADGE */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/5
                px-5
                py-2
                text-sm
                font-medium
                text-blue-200
                backdrop-blur-xl
                mb-7
              "
            >
              <Star size={16} />
              Trusted by freelancers & clients worldwide
            </div>

            {/* HEADING */}
            <h1
              className="
                text-5xl
                md:text-7xl
                font-black
                leading-tight
                text-white
              "
            >
              Find Work.
              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-blue-400
                  via-cyan-300
                  to-indigo-400
                  bg-clip-text
                  text-transparent
                "
              >
                Hire Talent.
              </span>

              <br />
              Grow Faster.
            </h1>

            {/* DESCRIPTION */}
            <p
              className="
                mt-8
                max-w-2xl
                text-lg
                md:text-xl
                leading-relaxed
                text-slate-300
              "
            >
              FreelanceConnect helps businesses hire expert
              freelancers and enables professionals to discover
              remote opportunities, collaborate, and build
              successful careers online.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/login")}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-indigo-600
                  px-8
                  py-4
                  text-lg
                  font-bold
                  text-white
                  shadow-2xl
                  transition-all
                "
              >
                Get Started
                <ArrowRight size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/jobs")}
                className="
                  rounded-2xl
                  border
                  border-white/15
                  bg-white/5
                  backdrop-blur-xl
                  px-8
                  py-4
                  text-lg
                  font-semibold
                  text-white
                  hover:bg-white/10
                  transition-all
                "
              >
                Browse Jobs
              </motion.button>
            </div>

            {/* STATS */}
            <div className="mt-14 flex flex-wrap gap-8">
              <div>
                <h3 className="text-3xl font-black text-white">
                  10K+
                </h3>

                <p className="text-slate-400 mt-1">
                  Freelancers
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black text-white">
                  5K+
                </h3>

                <p className="text-slate-400 mt-1">
                  Projects Posted
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black text-white">
                  99%
                </h3>

                <p className="text-slate-400 mt-1">
                  Client Satisfaction
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* GLASS CARD */}
            <div
              className="
                rounded-[32px]
                border
                border-white/10
                bg-white/10
                backdrop-blur-2xl
                p-8
                shadow-2xl
              "
            >
              <h2 className="text-3xl font-black text-white mb-8">
                Why Choose FreelanceConnect?
              </h2>

              <div className="space-y-6">
                {/* FEATURE */}
                <div
                  className="
                    flex
                    gap-5
                    rounded-2xl
                    bg-white/5
                    p-5
                    border
                    border-white/5
                  "
                >
                  <div className="bg-blue-500/20 p-4 rounded-2xl">
                    <Search
                      className="text-blue-300"
                      size={28}
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Smart Job Discovery
                    </h3>

                    <p className="text-slate-300 mt-2 leading-relaxed">
                      Discover opportunities that match your
                      skills, experience, and goals instantly.
                    </p>
                  </div>
                </div>

                {/* FEATURE */}
                <div
                  className="
                    flex
                    gap-5
                    rounded-2xl
                    bg-white/5
                    p-5
                    border
                    border-white/5
                  "
                >
                  <div className="bg-indigo-500/20 p-4 rounded-2xl">
                    <Users
                      className="text-indigo-300"
                      size={28}
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Top Freelance Talent
                    </h3>

                    <p className="text-slate-300 mt-2 leading-relaxed">
                      Connect with highly skilled professionals
                      across design, development, marketing, and
                      more.
                    </p>
                  </div>
                </div>

                {/* FEATURE */}
                <div
                  className="
                    flex
                    gap-5
                    rounded-2xl
                    bg-white/5
                    p-5
                    border
                    border-white/5
                  "
                >
                  <div className="bg-green-500/20 p-4 rounded-2xl">
                    <ShieldCheck
                      className="text-green-300"
                      size={28}
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Secure Collaboration
                    </h3>

                    <p className="text-slate-300 mt-2 leading-relaxed">
                      Contracts, milestones, and payments are
                      managed securely in one place.
                    </p>
                  </div>
                </div>

                {/* FEATURE */}
                <div
                  className="
                    flex
                    gap-5
                    rounded-2xl
                    bg-white/5
                    p-5
                    border
                    border-white/5
                  "
                >
                  <div className="bg-cyan-500/20 p-4 rounded-2xl">
                    <Briefcase
                      className="text-cyan-300"
                      size={28}
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Professional Growth
                    </h3>

                    <p className="text-slate-300 mt-2 leading-relaxed">
                      Build your portfolio, grow your network,
                      and scale your freelance business faster.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;