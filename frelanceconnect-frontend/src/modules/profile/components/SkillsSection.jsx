// src/modules/profile/components/SkillsSection.jsx

import { motion } from "framer-motion";
import {
  Code2,
  Plus,
  Trash2,
  Sparkles,
} from "lucide-react";

const SkillsSection = ({
  skills = [],
  editable = false,
  newSkill = "",
  setNewSkill,
  onAddSkill,
  onRemoveSkill,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        bg-white
        border
        border-slate-200
        rounded-[32px]
        p-7
        shadow-lg
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-3 rounded-2xl">
              <Code2
                className="text-indigo-600"
                size={24}
              />
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-800">
                Skills & Expertise
              </h2>

              <p className="text-slate-500 mt-1">
                Showcase professional strengths and technologies
              </p>
            </div>
          </div>
        </div>

        <div
          className="
            hidden
            lg:flex
            items-center
            gap-2
            bg-indigo-50
            text-indigo-700
            px-4
            py-2
            rounded-2xl
            font-bold
          "
        >
          <Sparkles size={18} />
          {skills.length} Skills
        </div>
      </div>

      {/* ADD SKILL */}
      {editable && (
        <div
          className="
            mb-8
            flex
            flex-col
            md:flex-row
            gap-4
          "
        >
          <input
            type="text"
            placeholder="Add a new skill..."
            value={newSkill}
            onChange={(e) =>
              setNewSkill(e.target.value)
            }
            className="
              flex-1
              bg-slate-50
              border
              border-slate-200
              rounded-2xl
              px-5
              py-4
              outline-none
              focus:ring-4
              focus:ring-indigo-100
              focus:border-indigo-500
              transition-all
            "
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={onAddSkill}
            className="
              flex
              items-center
              justify-center
              gap-2
              bg-gradient-to-r
              from-indigo-600
              to-blue-600
              hover:from-indigo-700
              hover:to-blue-700
              text-white
              px-6
              py-4
              rounded-2xl
              font-bold
              shadow-lg
              transition-all
            "
          >
            <Plus size={18} />
            Add Skill
          </motion.button>
        </div>
      )}

      {/* EMPTY */}
      {skills.length === 0 ? (
        <div
          className="
            bg-slate-50
            border
            border-dashed
            border-slate-300
            rounded-3xl
            py-16
            text-center
          "
        >
          <div className="bg-slate-200 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5">
            <Code2
              className="text-slate-500"
              size={36}
            />
          </div>

          <h3 className="text-2xl font-bold text-slate-700">
            No Skills Added
          </h3>

          <p className="text-slate-500 mt-2">
            Add skills to make your profile stronger.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {skills.map((skill, index) => {
            const skillName =
              typeof skill === "string"
                ? skill
                : skill?.name;

            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -4,
                  scale: 1.03,
                }}
                className="
                  group
                  relative
                  flex
                  items-center
                  gap-3
                  bg-gradient-to-r
                  from-indigo-50
                  to-blue-50
                  border
                  border-indigo-100
                  text-slate-800
                  px-5
                  py-4
                  rounded-2xl
                  shadow-sm
                  hover:shadow-lg
                  transition-all
                "
              >
                {/* ICON */}
                <div className="bg-white p-2 rounded-xl shadow-sm">
                  <Code2
                    className="text-indigo-600"
                    size={18}
                  />
                </div>

                {/* NAME */}
                <span className="font-bold text-[15px]">
                  {skillName}
                </span>

                {/* REMOVE */}
                {editable && (
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() =>
                      onRemoveSkill(index)
                    }
                    className="
                      opacity-0
                      group-hover:opacity-100
                      transition-all
                      bg-red-100
                      hover:bg-red-200
                      text-red-600
                      p-2
                      rounded-xl
                    "
                  >
                    <Trash2 size={16} />
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default SkillsSection;