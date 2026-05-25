import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../app/store/slices/auth.slice";

import {
  Mail,
  Lock,
  ArrowRight,
  Briefcase,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [focusedField, setFocusedField] =
    useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post("/api/v1/auth/login", form);

      const { user, token } =
        response.data.data;

      dispatch(
        loginSuccess({
          user,
          token,
        })
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field, color) => `
    flex
    items-center
    gap-3
    rounded-2xl
    border
    px-5
    py-4
    bg-slate-50
    transition-all
    duration-300
    ${
      focusedField === field
        ? `${color} bg-white shadow-lg`
        : "border-slate-200 hover:border-slate-300"
    }
  `;

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-indigo-950
        to-slate-900
        flex
        items-center
        justify-center
        p-6
        overflow-hidden
        relative
      "
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl" />

      {/* MAIN CARD */}
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
          relative
          w-full
          max-w-6xl
          grid
          grid-cols-1
          lg:grid-cols-2
          overflow-hidden
          rounded-[40px]
          border
          border-white/10
          bg-white/10
          backdrop-blur-2xl
          shadow-2xl
        "
      >
        {/* LEFT SIDE */}
        <div
          className="
            hidden
            lg:flex
            flex-col
            justify-between
            p-14
            bg-gradient-to-br
            from-indigo-600
            via-blue-600
            to-cyan-500
            text-white
            relative
            overflow-hidden
          "
        >
          {/* DECORATION */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* LOGO */}
            <div className="flex items-center gap-4 mb-16">
              <div
                className="
                  w-16
                  h-16
                  rounded-3xl
                  bg-white/20
                  backdrop-blur-xl
                  flex
                  items-center
                  justify-center
                "
              >
                <Briefcase size={30} />
              </div>

              <div>
                <h1 className="text-3xl font-black">
                  FreelanceConnect
                </h1>

                <p className="text-blue-100">
                  Work Without Limits
                </p>
              </div>
            </div>

            {/* TEXT */}
            <div>
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-white/15
                  px-5
                  py-3
                  rounded-full
                  font-semibold
                  mb-8
                "
              >
                <Sparkles size={18} />
                Modern Freelance Platform
              </div>

              <h2
                className="
                  text-6xl
                  font-black
                  leading-tight
                  mb-8
                "
              >
                Welcome
                <span className="block text-cyan-200">
                  Back
                </span>
              </h2>

              <p
                className="
                  text-xl
                  text-blue-100
                  leading-relaxed
                  max-w-xl
                "
              >
                Manage contracts, proposals,
                milestones, and discover premium
                freelance opportunities globally.
              </p>
            </div>
          </div>

          {/* FEATURES */}
          <div className="relative z-10 space-y-5">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-2xl">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h3 className="font-bold">
                  Secure Authentication
                </h3>

                <p className="text-blue-100 text-sm">
                  Protected account & encrypted data
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-2xl">
                <Briefcase size={22} />
              </div>

              <div>
                <h3 className="font-bold">
                  Freelance Marketplace
                </h3>

                <p className="text-blue-100 text-sm">
                  Clients and freelancers connected
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            bg-white
            p-8
            md:p-14
            flex
            flex-col
            justify-center
          "
        >
          {/* MOBILE LOGO */}
          <div className="lg:hidden text-center mb-10">
            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-gradient-to-br
                from-indigo-600
                to-blue-600
                flex
                items-center
                justify-center
                mx-auto
                mb-5
                shadow-xl
              "
            >
              <Briefcase
                className="text-white"
                size={34}
              />
            </div>

            <h1 className="text-4xl font-black text-slate-800">
              FreelanceConnect
            </h1>
          </div>

          {/* HEADER */}
          <div className="mb-10">
            <h2 className="text-5xl font-black text-slate-800 mb-4">
              Login
            </h2>

            <p className="text-slate-500 text-lg">
              Sign in to continue managing your
              freelance career.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Email Address
              </label>

              <motion.div
                whileHover={{ y: -1 }}
                className={inputClass(
                  "email",
                  "border-indigo-500 shadow-indigo-100"
                )}
              >
                <Mail
                  className="text-indigo-500"
                  size={20}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() =>
                    setFocusedField("email")
                  }
                  onBlur={() =>
                    setFocusedField("")
                  }
                  required
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-slate-700
                    placeholder:text-slate-400
                  "
                />
              </motion.div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Password
              </label>

              <motion.div
                whileHover={{ y: -1 }}
                className={inputClass(
                  "password",
                  "border-blue-500 shadow-blue-100"
                )}
              >
                <Lock
                  className="text-blue-500"
                  size={20}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() =>
                    setFocusedField(
                      "password"
                    )
                  }
                  onBlur={() =>
                    setFocusedField("")
                  }
                  required
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-slate-700
                    placeholder:text-slate-400
                  "
                />
              </motion.div>
            </div>

            {/* FORGOT */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="
                  text-indigo-600
                  font-semibold
                  hover:text-indigo-700
                  transition-all
                "
              >
                Forgot password?
              </Link>
            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.98,
              }}
              type="submit"
              disabled={loading}
              className="
                w-full
                rounded-3xl
                bg-gradient-to-r
                from-indigo-600
                to-blue-600
                py-5
                text-lg
                font-bold
                text-white
                shadow-xl
                hover:shadow-2xl
                transition-all
                duration-300
                disabled:opacity-70
                flex
                items-center
                justify-center
                gap-3
              "
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  Login
                  <ArrowRight size={22} />
                </>
              )}
            </motion.button>
          </form>

          {/* FOOTER */}
          <div className="mt-10 text-center">
            <p className="text-slate-500">
              Don’t have an account?{" "}
              <span
                onClick={() =>
                  navigate("/register")
                }
                className="
                  text-indigo-600
                  font-bold
                  cursor-pointer
                  hover:text-indigo-700
                "
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;