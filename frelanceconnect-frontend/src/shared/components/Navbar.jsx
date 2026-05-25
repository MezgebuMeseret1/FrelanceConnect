import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Briefcase,
  LayoutDashboard,
  LogOut,
  Home,
  UserPlus,
  LogIn,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const isActive = (path) =>
    location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        backdrop-blur-xl
        bg-white/80
        border-b
        border-slate-200
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          items-center
          justify-between
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-10">
          {/* LOGO */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/")}
            className="
              flex
              items-center
              gap-3
              cursor-pointer
            "
          >
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-gradient-to-br
                from-blue-600
                to-indigo-600
                flex
                items-center
                justify-center
                shadow-lg
              "
            >
              <Briefcase
                className="text-white"
                size={22}
              />
            </div>

            <div>
              <h1
                className="
                  text-2xl
                  font-black
                  bg-gradient-to-r
                  from-slate-900
                  to-slate-600
                  bg-clip-text
                  text-transparent
                "
              >
                FreelanceConnect
              </h1>

              <p className="text-xs text-slate-400 -mt-1">
                Freelance Marketplace
              </p>
            </div>
          </motion.div>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center gap-3">
            {/* HOME */}
            <Link
              to="/"
              className={`
                flex
                items-center
                gap-2
                px-5
                py-3
                rounded-2xl
                font-semibold
                transition-all
                duration-300
                ${
                  isActive("/")
                    ? "bg-blue-100 text-blue-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }
              `}
            >
              <Home size={18} />
              Home
            </Link>

            {/* JOBS */}
            <Link
              to="/jobs"
              className={`
                flex
                items-center
                gap-2
                px-5
                py-3
                rounded-2xl
                font-semibold
                transition-all
                duration-300
                ${
                  isActive("/jobs")
                    ? "bg-blue-100 text-blue-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }
              `}
            >
              <Briefcase size={18} />
              Jobs
            </Link>

            {/* DASHBOARD */}
            {token && (
              <Link
                to="/dashboard"
                className={`
                  flex
                  items-center
                  gap-2
                  px-5
                  py-3
                  rounded-2xl
                  font-semibold
                  transition-all
                  duration-300
                  ${
                    isActive("/dashboard")
                      ? "bg-blue-100 text-blue-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }
                `}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {!token ? (
            <>
              {/* LOGIN */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/login")}
                className="
                  flex
                  items-center
                  gap-2
                  px-5
                  py-3
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-700
                  font-semibold
                  hover:bg-slate-50
                  transition-all
                "
              >
                <LogIn size={18} />
                Login
              </motion.button>

              {/* SIGN UP */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/register")}
                className="
                  flex
                  items-center
                  gap-2
                  px-6
                  py-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-indigo-600
                  text-white
                  font-bold
                  shadow-lg
                  hover:shadow-2xl
                  transition-all
                "
              >
                <UserPlus size={18} />
                Sign Up
              </motion.button>
            </>
          ) :
          
          null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;