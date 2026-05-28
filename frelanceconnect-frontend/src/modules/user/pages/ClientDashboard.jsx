import { useEffect, useMemo, useState } from "react";
import client from "../../../core/api/client";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  MessageCircle,
  Wallet,
  FileText,
  Lock,
  LogOut,
  ArrowRight,
  DollarSign,
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  UserCircle2,
} from "lucide-react";

import { logout } from "../../../app/store/slices/auth.slice";

const ITEMS_PER_PAGE = 5;

const ClientDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // SEARCH
  const [search, setSearch] = useState("");

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  // FETCH JOBS
  const fetchJobs = async () => {
    try {
      const res = await client.get(
        "/jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(res.data.data || []);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // FILTER JOBS
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const query = search.toLowerCase();

      return (
        job.title?.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query)
      );
    });
  }, [jobs, search]);

  // PAGINATION
  const totalPages = Math.ceil(
    filteredJobs.length / ITEMS_PER_PAGE
  );

  const paginatedJobs = useMemo(() => {
    const startIndex =
      (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredJobs.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredJobs, currentPage]);

  // LOGOUT
  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // SIDEBAR
  const sidebarLinks = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      action: () => navigate("/dashboard"),
    },
    {
      label: "My Jobs",
      icon: Briefcase,
      action: () => navigate("/jobs"),
    },
    {
      label: "Post Job",
      icon: PlusCircle,
      action: () => navigate("/post-job"),
    },
    {
      label: "Employer Profile",
      icon: UserCircle2,
      action: () => navigate("/employer-profile"),
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
      label: "Contracts",
      icon: FileText,
      action: () => navigate("/contracts"),
    },
    {
      label: "Change Password",
      icon: Lock,
      action: () => navigate("/change-password"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex">
      
      {/* SIDEBAR */}
      <aside className="w-[290px] bg-slate-900 text-white p-6 flex flex-col justify-between">

        <div>

          {/* LOGO */}
          <div className="mb-10">
            <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
              FreelanceConnect
            </h1>

            <p className="text-slate-400 text-sm mt-2">
              Client Workspace
            </p>
          </div>

          {/* PROFILE */}
          <div className="bg-slate-800 rounded-3xl p-5 mb-8 border border-slate-700">
            <div className="flex items-center gap-4">

              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="profile"
                  className="w-14 h-14 rounded-2xl object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center text-xl font-bold">
                  {user?.name?.charAt(0)}
                </div>
              )}

              <div>
                <h3 className="font-bold text-lg">
                  {user?.name || "Client"}
                </h3>

                <p className="text-slate-400 text-sm">
                  {user?.email}
                </p>
              </div>
            </div>
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
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-10">

          <div>
            <h2 className="text-5xl font-black text-slate-800">
              Welcome back 👋
            </h2>

            <p className="text-slate-500 mt-3 text-lg">
              Manage jobs, proposals, contracts, and hiring activity.
            </p>
          </div>

          {/* POST JOB BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/post-job")}
            className="
              bg-gradient-to-r
              from-indigo-600
              to-blue-600
              text-white
              px-8
              py-4
              rounded-2xl
              font-bold
              shadow-xl
              hover:shadow-2xl
              transition-all
            "
          >
            + Post New Job
          </motion.button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          {/* TOTAL JOBS */}
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
                  Total Jobs
                </p>

                <h3 className="text-4xl font-black mt-2">
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

          {/* ACTIVE CONTRACTS */}
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
                  Contracts
                </p>

                <h3 className="text-4xl font-black mt-2">
                  0
                </h3>
              </div>

              <div className="bg-indigo-100 p-4 rounded-2xl">
                <FileText
                  className="text-indigo-600"
                  size={28}
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

                <h3 className="text-4xl font-black mt-2">
                  0
                </h3>
              </div>

              <div className="bg-orange-100 p-4 rounded-2xl">
                <Users
                  className="text-orange-600"
                  size={28}
                />
              </div>
            </div>
          </motion.div>

          {/* WALLET */}
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
                  Wallet
                </p>

                <h3 className="text-4xl font-black mt-2">
                  $0
                </h3>
              </div>

              <div className="bg-green-100 p-4 rounded-2xl">
                <DollarSign
                  className="text-green-600"
                  size={28}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* JOB SECTION */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">

          {/* TOP */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">

            <div>
              <h3 className="text-3xl font-black text-slate-800">
                Recent Jobs
              </h3>

              <p className="text-slate-500 mt-2">
                Manage your posted jobs and incoming proposals.
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative w-full xl:w-[380px]">

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
                  border
                  border-slate-200
                  rounded-2xl
                  py-4
                  pl-12
                  pr-4
                  outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                "
              />
            </div>
          </div>

          {/* JOB LIST */}
          {loading ? (
            <div className="text-center py-16 text-slate-500">
              Loading jobs...
            </div>
          ) : paginatedJobs.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              No jobs found.
            </div>
          ) : (
            <>
              <div className="grid gap-6">
                {paginatedJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    whileHover={{ y: -4 }}
                    className="
                      border
                      border-slate-200
                      rounded-3xl
                      p-7
                      hover:shadow-xl
                      transition-all
                      duration-300
                    "
                  >
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                      <div className="flex-1">

                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-2xl font-bold text-slate-800">
                            {job.title}
                          </h3>

                          <span className="
                            bg-green-100
                            text-green-700
                            text-xs
                            font-bold
                            px-3
                            py-1
                            rounded-full
                          ">
                            OPEN
                          </span>
                        </div>

                        <p className="text-slate-500 leading-relaxed mb-5">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-3">

                          <div className="
                            inline-flex
                            items-center
                            gap-2
                            bg-green-50
                            text-green-700
                            px-4
                            py-2
                            rounded-xl
                            font-semibold
                          ">
                            <DollarSign size={16} />
                            Budget: ${job.budget}
                          </div>

                          <div className="
                            inline-flex
                            items-center
                            gap-2
                            bg-indigo-50
                            text-indigo-700
                            px-4
                            py-2
                            rounded-xl
                            font-semibold
                          ">
                            <Users size={16} />
                            Proposals
                          </div>
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div className="flex flex-col sm:flex-row gap-4">

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() =>
                            navigate(`/jobs/${job.id}/edit`)
                          }
                          className="
                            px-6
                            py-4
                            rounded-2xl
                            border
                            border-slate-200
                            font-bold
                            hover:bg-slate-100
                            transition-all
                          "
                        >
                          Edit Job
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() =>
                            navigate(`/jobs/${job.id}/proposals`)
                          }
                          className="
                            bg-gradient-to-r
                            from-indigo-600
                            to-blue-600
                            text-white
                            px-7
                            py-4
                            rounded-2xl
                            font-bold
                            shadow-lg
                            hover:shadow-2xl
                            transition-all
                            flex
                            items-center
                            gap-2
                          "
                        >
                          View Proposals
                          <ArrowRight size={18} />
                        </motion.button>
                      </div>
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
                      setCurrentPage((prev) => prev - 1)
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
                    Page {currentPage} of {totalPages}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => prev + 1)
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

export default ClientDashboard;

