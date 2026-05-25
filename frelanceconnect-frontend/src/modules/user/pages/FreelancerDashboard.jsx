// src/modules/freelancer/pages/FreelancerDashboard.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageCircle,
  Wallet,
  LogOut,
  Lock,
  DollarSign,
  Search,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  CalendarDays,
} from "lucide-react";

import { logout } from "../../../app/store/slices/auth.slice";

import * as jobService from "../../../core/services/job.service";

const ITEMS_PER_PAGE = 5;

const FreelancerDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  // FETCH JOBS
  const fetchJobs = async () => {
    try {
      setLoading(true);

      const res = await jobService.getJobs({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        search,
      });

      setJobs(res.data.data || []);

      setTotalPages(
        res.data.pagination?.totalPages || 1
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [currentPage, search]);

  // LOGOUT
  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // SIDEBAR LINKS
  const sidebarLinks = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      action: () =>
        navigate("/freelancer-dashboard"),
    },

    {
      label: "My Profile",
      icon: UserCircle,
      action: () =>
        navigate("/freelancer/profile"),
    },

    {
      label: "Browse Jobs",
      icon: Briefcase,
      action: () => navigate("/jobs"),
    },

    {
      label: "My Proposals",
      icon: FileText,
      action: () => navigate("/proposals"),
    },

    {
      label: "Contracts",
      icon: FileText,
      action: () => navigate("/contracts"),
    },

    {
      label: "Messages",
      icon: MessageCircle,
      action: () => navigate("/messages"),
    },

    {
      label: "Wallet",
      icon: Wallet,
      action: () => navigate("/wallet"),
    },

    {
      label: "Change Password",
      icon: Lock,
      action: () =>
        navigate("/change-password"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex">
      {/* SIDEBAR */}
      <aside className="w-[280px] bg-slate-900 text-white p-6 flex flex-col justify-between">

        <div>
          {/* LOGO */}
          <div className="mb-10">
            <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              FreelanceConnect
            </h1>

            <p className="text-slate-400 text-sm mt-2">
              Freelancer Workspace
            </p>
          </div>

          {/* NAVIGATION */}
          <nav className="space-y-3">
            {sidebarLinks.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.button
                  key={index}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={item.action}
                  className="
                    w-full
                    flex
                    items-center
                    gap-4
                    px-5
                    py-4
                    rounded-2xl
                    text-slate-300
                    hover:bg-slate-800
                    hover:text-white
                    transition-all
                    duration-300
                  "
                >
                  <Icon size={20} />

                  <span className="font-medium">
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* LOGOUT */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="
            flex
            items-center
            justify-center
            gap-3
            bg-red-500
            hover:bg-red-600
            py-4
            rounded-2xl
            font-bold
            transition-all
          "
        >
          <LogOut size={18} />
          Logout
        </motion.button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

          <div>
            <h2 className="text-4xl font-black text-slate-800">
              Freelancer Dashboard
            </h2>

            <p className="text-slate-500 mt-2">
              Browse jobs, manage contracts,
              and grow your freelance career.
            </p>
          </div>

          {/* AVAILABLE JOBS CARD */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="
              bg-white
              border
              border-slate-200
              shadow-sm
              rounded-3xl
              p-5
              min-w-[250px]
            "
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-500 text-sm">
                  Available Jobs
                </p>

                <h3 className="text-3xl font-black text-blue-600 mt-1">
                  {jobs.length}
                </h3>
              </div>

              <div className="bg-blue-100 p-4 rounded-2xl">
                <Briefcase
                  className="text-blue-600"
                  size={28}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* CONTRACTS */}
          <motion.div
            whileHover={{ y: -5 }}
            className="
              bg-white
              rounded-3xl
              p-6
              border
              border-slate-200
              shadow-sm
            "
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-500 text-sm">
                  Active Contracts
                </p>

                <h3 className="text-3xl font-black mt-2">
                  0
                </h3>
              </div>

              <div className="bg-indigo-100 p-4 rounded-2xl">
                <FileText
                  className="text-indigo-600"
                  size={26}
                />
              </div>
            </div>
          </motion.div>

          {/* EARNINGS */}
          <motion.div
            whileHover={{ y: -5 }}
            className="
              bg-white
              rounded-3xl
              p-6
              border
              border-slate-200
              shadow-sm
            "
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-500 text-sm">
                  Earnings
                </p>

                <h3 className="text-3xl font-black mt-2">
                  $0
                </h3>
              </div>

              <div className="bg-green-100 p-4 rounded-2xl">
                <DollarSign
                  className="text-green-600"
                  size={26}
                />
              </div>
            </div>
          </motion.div>

          {/* PROPOSALS */}
          <motion.div
            whileHover={{ y: -5 }}
            className="
              bg-white
              rounded-3xl
              p-6
              border
              border-slate-200
              shadow-sm
            "
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-500 text-sm">
                  Proposals
                </p>

                <h3 className="text-3xl font-black mt-2">
                  0
                </h3>
              </div>

              <div className="bg-orange-100 p-4 rounded-2xl">
                <MessageCircle
                  className="text-orange-600"
                  size={26}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* JOBS SECTION */}
        <div>

          {/* TOP BAR */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6">

            <div>
              <h3 className="text-2xl font-black text-slate-800">
                Latest Jobs
              </h3>

              <p className="text-slate-500 mt-1">
                Search and apply to projects
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative w-full lg:w-[350px]">

              <Search
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="
                  w-full
                  bg-white
                  border
                  border-slate-200
                  rounded-2xl
                  py-4
                  pl-12
                  pr-4
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />
            </div>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="grid gap-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    bg-white
                    rounded-3xl
                    p-7
                    animate-pulse
                    border
                    border-slate-200
                  "
                >
                  <div className="h-6 w-1/3 bg-slate-200 rounded mb-4"></div>

                  <div className="h-4 w-full bg-slate-200 rounded mb-2"></div>

                  <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (

            /* EMPTY STATE */
            <div className="bg-white rounded-3xl p-14 text-center border border-slate-200">

              <div className="text-6xl mb-4">
                📭
              </div>

              <h3 className="text-2xl font-bold text-slate-700">
                No Jobs Found
              </h3>

              <p className="text-slate-500 mt-2">
                Try searching with different
                keywords.
              </p>
            </div>

          ) : (
            <>
              {/* JOBS */}
              <div className="grid gap-6">

                {jobs.map((job) => (
                  <motion.div
                    key={job.id}
                    whileHover={{ y: -3 }}
                    className="
                      bg-white
                      border
                      border-slate-200
                      rounded-3xl
                      p-7
                      shadow-sm
                      hover:shadow-xl
                      transition-all
                      duration-300
                    "
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                      {/* LEFT */}
                      <div className="flex-1">

                        {/* STATUS */}
                        <div
                          className={`
                            inline-flex
                            items-center
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-semibold
                            mb-4
                            ${
                              job.status === "OPEN"
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-700"
                            }
                          `}
                        >
                          {job.status}
                        </div>

                        {/* TITLE */}
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">
                          {job.title}
                        </h3>

                        {/* DESCRIPTION */}
                        <p className="text-slate-500 leading-relaxed mb-5">
                          {job.description}
                        </p>

                        {/* FOOTER */}
                        <div className="flex flex-wrap gap-3 items-center">

                          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl font-semibold">
                            <DollarSign size={16} />
                            Budget: ${job.budget}
                          </div>

                          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-xl font-medium">
                            <CalendarDays size={16} />

                            {new Date(
                              job.createdAt
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {/* BUTTON */}
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() =>
                          navigate(
                            `/jobs/${job.id}/apply`
                          )
                        }
                        className="
                          bg-gradient-to-r
                          from-blue-600
                          to-indigo-600
                          text-white
                          px-7
                          py-4
                          rounded-2xl
                          font-bold
                          shadow-lg
                          hover:shadow-2xl
                          transition-all
                        "
                      >
                        Apply Now
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-10">

                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage(
                        (prev) => prev - 1
                      )
                    }
                    className="
                      p-3
                      rounded-xl
                      bg-white
                      border
                      border-slate-200
                      disabled:opacity-40
                    "
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="font-semibold text-slate-600">
                    Page {currentPage} of{" "}
                    {totalPages}
                  </div>

                  <button
                    disabled={
                      currentPage === totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        (prev) => prev + 1
                      )
                    }
                    className="
                      p-3
                      rounded-xl
                      bg-white
                      border
                      border-slate-200
                      disabled:opacity-40
                    "
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default FreelancerDashboard;