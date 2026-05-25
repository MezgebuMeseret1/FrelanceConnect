import { useState } from "react";
import { motion } from "framer-motion";

import {
  User,
  Mail,
  Lock,
  Phone,
  Briefcase,
  Users,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const RegisterForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "CLIENT",
  });

  const [focusedField, setFocusedField] =
    useState("");

  const completedFields =
    Object.values(form).filter(Boolean).length;

  const progress = (completedFields / 5) * 100;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputClass = (field, color) => `
    flex
    items-center
    gap-4
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
        relative
        overflow-hidden
      "
    >
      {/* BACKGROUND */}
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
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

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

            {/* HERO */}
            <div>
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white/15
                  px-5
                  py-3
                  font-semibold
                  mb-8
                "
              >
                <Sparkles size={18} />
                Join the future of freelancing
              </div>

              <h2
                className="
                  text-6xl
                  font-black
                  leading-tight
                  mb-8
                "
              >
                Create Your
                <span className="block text-cyan-200">
                  Account
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
                Connect with clients, manage
                projects, create milestones, and
                grow your freelance career on one
                powerful platform.
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
                  Secure Platform
                </h3>

                <p className="text-blue-100 text-sm">
                  Protected authentication &
                  contracts
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-2xl">
                <Users size={22} />
              </div>

              <div>
                <h3 className="font-bold">
                  Global Talent Network
                </h3>

                <p className="text-blue-100 text-sm">
                  Hire or work from anywhere
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
          <div className="mb-8">
            <h2 className="text-5xl font-black text-slate-800 mb-4">
              Sign Up
            </h2>

            <p className="text-slate-500 text-lg">
              Create your account and start your
              freelance journey today.
            </p>
          </div>

          {/* PROGRESS */}
          <div
            className="
              rounded-3xl
              border
              border-slate-200
              bg-slate-50
              p-5
              mb-8
            "
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-slate-600">
                Registration Progress
              </span>

              <span className="text-sm font-bold text-indigo-600">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${progress}%`,
                }}
                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-indigo-500
                  to-blue-600
                "
              />
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* NAME */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Full Name
              </label>

              <motion.div
                whileHover={{ y: -1 }}
                className={inputClass(
                  "name",
                  "border-indigo-500 shadow-indigo-100"
                )}
              >
                <User
                  className="text-indigo-500"
                  size={20}
                />

                <input
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() =>
                    setFocusedField("name")
                  }
                  onBlur={() =>
                    setFocusedField("")
                  }
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-slate-700
                    placeholder:text-slate-400
                  "
                />

                {form.name && (
                  <CheckCircle2
                    className="text-green-500"
                    size={20}
                  />
                )}
              </motion.div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Email Address
              </label>

              <motion.div
                whileHover={{ y: -1 }}
                className={inputClass(
                  "email",
                  "border-blue-500 shadow-blue-100"
                )}
              >
                <Mail
                  className="text-blue-500"
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
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-slate-700
                    placeholder:text-slate-400
                  "
                />

                {form.email && (
                  <CheckCircle2
                    className="text-green-500"
                    size={20}
                  />
                )}
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
                  "border-purple-500 shadow-purple-100"
                )}
              >
                <Lock
                  className="text-purple-500"
                  size={20}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
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
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-slate-700
                    placeholder:text-slate-400
                  "
                />

                {form.password && (
                  <CheckCircle2
                    className="text-green-500"
                    size={20}
                  />
                )}
              </motion.div>
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Phone Number
              </label>

              <motion.div
                whileHover={{ y: -1 }}
                className={inputClass(
                  "phone",
                  "border-cyan-500 shadow-cyan-100"
                )}
              >
                <Phone
                  className="text-cyan-500"
                  size={20}
                />

                <input
                  name="phone"
                  placeholder="Optional phone number"
                  value={form.phone}
                  onChange={handleChange}
                  onFocus={() =>
                    setFocusedField("phone")
                  }
                  onBlur={() =>
                    setFocusedField("")
                  }
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-slate-700
                    placeholder:text-slate-400
                  "
                />

                {form.phone && (
                  <CheckCircle2
                    className="text-green-500"
                    size={20}
                  />
                )}
              </motion.div>
            </div>

            {/* ROLE */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Account Type
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CLIENT */}
                <motion.div
                  whileHover={{ y: -2 }}
                  onClick={() =>
                    setForm({
                      ...form,
                      role: "CLIENT",
                    })
                  }
                  className={`
                    cursor-pointer
                    rounded-3xl
                    border
                    p-5
                    transition-all
                    duration-300
                    ${
                      form.role === "CLIENT"
                        ? "border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-100"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }
                  `}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-indigo-100
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Briefcase
                        className="text-indigo-600"
                        size={22}
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-800">
                        Client
                      </h3>

                      <p className="text-sm text-slate-500">
                        Hire freelancers
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* FREELANCER */}
                <motion.div
                  whileHover={{ y: -2 }}
                  onClick={() =>
                    setForm({
                      ...form,
                      role: "FREELANCER",
                    })
                  }
                  className={`
                    cursor-pointer
                    rounded-3xl
                    border
                    p-5
                    transition-all
                    duration-300
                    ${
                      form.role ===
                      "FREELANCER"
                        ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-100"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }
                  `}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-blue-100
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Users
                        className="text-blue-600"
                        size={22}
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-800">
                        Freelancer
                      </h3>

                      <p className="text-sm text-slate-500">
                        Find freelance work
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
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
                flex
                items-center
                justify-center
                gap-3
                mt-6
              "
            >
              Create Account
              <ArrowRight size={22} />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;