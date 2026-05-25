import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  ArrowLeft,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    try {
      setLoading(true);

      // TODO:
      // API CALL HERE
      console.log("Reset password for:", email);

      alert("Password reset link sent!");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-indigo-950
        flex
        items-center
        justify-center
        px-6
        py-10
        relative
        overflow-hidden
      "
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-blue-500/20 rounded-full blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-indigo-500/20 rounded-full blur-3xl" />

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          relative
          z-10
          w-full
          max-w-md
          rounded-[32px]
          border
          border-white/10
          bg-white/10
          backdrop-blur-2xl
          shadow-2xl
          p-8
        "
      >
        {/* BACK BUTTON */}
        <motion.button
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/login")}
          className="
            flex
            items-center
            gap-2
            text-slate-300
            hover:text-white
            transition-all
            mb-8
          "
        >
          <ArrowLeft size={18} />
          Back to Login
        </motion.button>

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div
            className="
              h-20
              w-20
              rounded-3xl
              bg-gradient-to-br
              from-blue-500
              to-indigo-600
              flex
              items-center
              justify-center
              shadow-xl
            "
          >
            <ShieldCheck className="text-white" size={36} />
          </div>
        </div>

        {/* TITLE */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white">
            Forgot Password?
          </h1>

          <p className="text-slate-300 mt-4 leading-relaxed">
            Enter your email address and we’ll send you a
            secure password reset link.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-3">
              Email Address
            </label>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-5
                py-4
                focus-within:border-blue-500
                focus-within:bg-white/10
                transition-all
              "
            >
              <Mail
                className="text-slate-400"
                size={20}
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-white
                  placeholder:text-slate-400
                "
              />
            </div>
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              py-4
              text-lg
              font-bold
              text-white
              shadow-xl
              hover:shadow-2xl
              transition-all
              disabled:opacity-70
            "
          >
            {loading ? (
              "Sending Reset Link..."
            ) : (
              <>
                Send Reset Link
                <Send size={18} />
              </>
            )}
          </motion.button>
        </form>

        {/* FOOTER */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            Remember your password?{" "}
            <span
              onClick={() => navigate("/login")}
              className="
                text-blue-400
                hover:text-blue-300
                cursor-pointer
                font-semibold
              "
            >
              Login
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;