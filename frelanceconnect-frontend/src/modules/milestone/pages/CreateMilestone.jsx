import { motion } from "framer-motion";
import { CheckCircle, Layers, Sparkles } from "lucide-react";
import MilestoneForm from "../components/MilestoneForm";

const CreateMilestone = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* HEADER */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="text-indigo-600" />
              <h2 className="font-semibold text-slate-900 text-lg">
                Milestone Builder
              </h2>
            </div>
            <p className="text-slate-600 text-sm">
              Create structured project phases with payments and deadlines.
            </p>
          </div>

          {/* WHY */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 hover:bg-indigo-100 transition">
            <Layers className="text-indigo-600 mb-3" />

            <h3 className="font-semibold text-slate-900 mb-2">
              Why Milestones?
            </h3>

            <ul className="text-sm text-slate-600 space-y-2">
              <li>• Break large projects into steps</li>
              <li>• Secure staged payments</li>
              <li>• Track freelancer progress</li>
              <li>• Reduce project risk</li>
            </ul>
          </div>

          {/* TIP */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="text-green-500" />
              <span className="font-medium text-slate-900">
                Pro Tip
              </span>
            </div>
            <p className="text-sm text-slate-600">
              3–5 milestones is the sweet spot for most freelance projects.
            </p>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition">
            <div className="h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-t-2xl" />

            <div className="p-6 md:p-10">
              <MilestoneForm />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default CreateMilestone;