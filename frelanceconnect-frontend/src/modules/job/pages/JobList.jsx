import { useEffect, useMemo, useState } from "react";
import client from "../../../core/api/client";
import { motion } from "framer-motion";

import {
  Search,
  Briefcase,
  DollarSign,
  Filter,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import JobCard from "../components/JobCard";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [budgetFilter, setBudgetFilter] =
    useState("all");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await client.get(
          "/jobs"
        );

        setJobs(res.data.data || []);
      } catch (err) {
        console.log("FETCH JOBS ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // FILTER + SEARCH
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        job.description
          ?.toLowerCase()
          .includes(search.toLowerCase());

      let matchesBudget = true;

      if (budgetFilter === "low") {
        matchesBudget = job.budget < 500;
      }

      if (budgetFilter === "medium") {
        matchesBudget =
          job.budget >= 500 &&
          job.budget <= 2000;
      }

      if (budgetFilter === "high") {
        matchesBudget = job.budget > 2000;
      }

      return matchesSearch && matchesBudget;
    });
  }, [jobs, search, budgetFilter]);

  const totalBudget = jobs.reduce(
    (sum, job) =>
      sum + Number(job.budget || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* BACKGROUND EFFECT */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-indigo-700
            via-blue-600
            to-cyan-600
          "
        />

        <div
          className="
            absolute
            top-0
            left-0
            w-full
            h-full
            opacity-20
          "
        >
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />

          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300 rounded-full blur-3xl" />
        </div>

        {/* CONTENT */}
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            {/* TAG */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-white/15
                border
                border-white/20
                backdrop-blur-lg
                px-5
                py-3
                rounded-full
                text-white
                font-semibold
                mb-8
              "
            >
              <Sparkles size={18} />
              Discover Premium Freelance Projects
            </div>

            {/* HEADING */}
            <h1
              className="
                text-5xl
                md:text-7xl
                font-black
                text-white
                leading-tight
                mb-6
              "
            >
              Find Your Next
              <span className="block text-cyan-200">
                Opportunity
              </span>
            </h1>

            {/* SUBTEXT */}
            <p
              className="
                text-xl
                text-blue-100
                leading-relaxed
                max-w-3xl
                mb-10
              "
            >
              Connect with clients worldwide and work
              on exciting freelance projects in web
              development, design, AI, mobile apps,
              and more.
            </p>

            {/* SEARCH */}
            <div
              className="
                bg-white/10
                backdrop-blur-2xl
                border
                border-white/20
                rounded-[32px]
                p-5
                shadow-2xl
              "
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {/* SEARCH INPUT */}
                <div
                  className="
                    lg:col-span-3
                    flex
                    items-center
                    gap-3
                    bg-white
                    rounded-2xl
                    px-5
                    py-4
                  "
                >
                  <Search
                    className="text-slate-400"
                    size={22}
                  />

                  <input
                    type="text"
                    placeholder="Search jobs, skills, technologies..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="
                      w-full
                      outline-none
                      text-slate-700
                      placeholder:text-slate-400
                      bg-transparent
                    "
                  />
                </div>

                {/* FILTER */}
                <div
                  className="
                    lg:col-span-2
                    flex
                    items-center
                    gap-3
                    bg-white
                    rounded-2xl
                    px-5
                    py-4
                  "
                >
                  <Filter
                    className="text-slate-400"
                    size={20}
                  />

                  <select
                    value={budgetFilter}
                    onChange={(e) =>
                      setBudgetFilter(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      outline-none
                      bg-transparent
                      text-slate-700
                      cursor-pointer
                    "
                  >
                    <option value="all">
                      All Budgets
                    </option>

                    <option value="low">
                      Below $500
                    </option>

                    <option value="medium">
                      $500 - $2000
                    </option>

                    <option value="high">
                      Above $2000
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TOTAL JOBS */}
          <motion.div
            whileHover={{ y: -5 }}
            className="
              bg-white
              border
              border-slate-200
              rounded-[30px]
              p-8
              shadow-xl
            "
          >
            <div className="flex items-center justify-between mb-6">
              <div
                className="
                  bg-blue-100
                  p-4
                  rounded-2xl
                "
              >
                <Briefcase
                  className="text-blue-600"
                  size={28}
                />
              </div>

              <TrendingUp
                className="text-green-500"
                size={22}
              />
            </div>

            <h2 className="text-4xl font-black text-slate-800 mb-2">
              {jobs.length}
            </h2>

            <p className="text-slate-500 font-medium">
              Total Jobs Available
            </p>
          </motion.div>

          {/* MATCHING */}
          <motion.div
            whileHover={{ y: -5 }}
            className="
              bg-white
              border
              border-slate-200
              rounded-[30px]
              p-8
              shadow-xl
            "
          >
            <div className="flex items-center justify-between mb-6">
              <div
                className="
                  bg-indigo-100
                  p-4
                  rounded-2xl
                "
              >
                <Search
                  className="text-indigo-600"
                  size={28}
                />
              </div>

              <TrendingUp
                className="text-green-500"
                size={22}
              />
            </div>

            <h2 className="text-4xl font-black text-slate-800 mb-2">
              {filteredJobs.length}
            </h2>

            <p className="text-slate-500 font-medium">
              Matching Jobs
            </p>
          </motion.div>

          {/* BUDGET */}
          <motion.div
            whileHover={{ y: -5 }}
            className="
              bg-white
              border
              border-slate-200
              rounded-[30px]
              p-8
              shadow-xl
            "
          >
            <div className="flex items-center justify-between mb-6">
              <div
                className="
                  bg-green-100
                  p-4
                  rounded-2xl
                "
              >
                <DollarSign
                  className="text-green-600"
                  size={28}
                />
              </div>

              <TrendingUp
                className="text-green-500"
                size={22}
              />
            </div>

            <h2 className="text-4xl font-black text-slate-800 mb-2">
              ${totalBudget.toLocaleString()}
            </h2>

            <p className="text-slate-500 font-medium">
              Total Project Budget
            </p>
          </motion.div>
        </div>
      </section>

      {/* JOBS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* SECTION HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-black text-slate-800 mb-3">
              Available Jobs
            </h2>

            <p className="text-slate-500">
              Explore freelance opportunities tailored
              for professionals.
            </p>
          </div>

          <div
            className="
              hidden
              md:flex
              items-center
              gap-2
              bg-white
              border
              border-slate-200
              px-5
              py-3
              rounded-2xl
              shadow-sm
            "
          >
            <Briefcase
              className="text-indigo-600"
              size={18}
            />

            <span className="font-semibold text-slate-700">
              {filteredJobs.length} Jobs Found
            </span>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-[30px]
              p-16
              text-center
              shadow-sm
            "
          >
            <div
              className="
                w-16
                h-16
                border-4
                border-indigo-200
                border-t-indigo-600
                rounded-full
                animate-spin
                mx-auto
                mb-6
              "
            />

            <p className="text-xl text-slate-500 font-medium">
              Loading jobs...
            </p>
          </div>
        ) : filteredJobs.length === 0 ? (
          /* EMPTY */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
              bg-white
              border
              border-slate-200
              rounded-[30px]
              p-16
              text-center
              shadow-sm
            "
          >
            <div
              className="
                bg-slate-100
                w-24
                h-24
                rounded-full
                flex
                items-center
                justify-center
                mx-auto
                mb-8
              "
            >
              <Search
                className="text-slate-400"
                size={42}
              />
            </div>

            <h3 className="text-3xl font-black text-slate-800 mb-4">
              No Jobs Found
            </h3>

            <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
              Try changing your search keyword or
              budget filters to discover more freelance
              opportunities.
            </p>
          </motion.div>
        ) : (
          /* GRID */
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default JobList;

