// src/modules/profile/components/ExperienceCard.jsx

import { motion } from "framer-motion";
import {
  Briefcase,
  CalendarDays,
  MapPin,
  Building2,
  Clock3,
  Pencil,
  Trash2,
} from "lucide-react";

const ExperienceCard = ({
  experience,
  editable = false,
  onEdit,
  onDelete,
}) => {
  if (!experience) return null;

  const {
    id,
    role,
    company,
    location,
    startDate,
    endDate,
    current = false,
    description,
    employmentType,
    technologies = [],
  } = experience;

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -4,
      }}
      className="
        relative
        overflow-hidden
        bg-white
        border
        border-slate-200
        rounded-[28px]
        p-7
        shadow-sm
        hover:shadow-2xl
        transition-all
        duration-300
      "
    >
      {/* TOP GRADIENT */}
      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-1
          bg-gradient-to-r
          from-blue-500
          via-indigo-500
          to-purple-500
        "
      />

      {/* ACTIONS */}
      {editable && (
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <motion.button
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => onEdit?.(experience)}
            className="
              w-11
              h-11
              rounded-2xl
              bg-blue-50
              hover:bg-blue-100
              text-blue-600
              flex
              items-center
              justify-center
              transition-all
            "
          >
            <Pencil size={18} />
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => onDelete?.(id)}
            className="
              w-11
              h-11
              rounded-2xl
              bg-red-50
              hover:bg-red-100
              text-red-600
              flex
              items-center
              justify-center
              transition-all
            "
          >
            <Trash2 size={18} />
          </motion.button>
        </div>
      )}

      {/* HEADER */}
      <div className="flex items-start gap-5">
        {/* ICON */}
        <div
          className="
            min-w-[72px]
            h-[72px]
            rounded-3xl
            bg-gradient-to-br
            from-blue-500
            to-indigo-600
            flex
            items-center
            justify-center
            shadow-lg
            text-white
          "
        >
          <Briefcase size={30} />
        </div>

        {/* INFO */}
        <div className="flex-1">
          {/* ROLE */}
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-black text-slate-800">
              {role}
            </h3>

            {current && (
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-1.5
                  rounded-full
                  bg-emerald-100
                  text-emerald-700
                  text-sm
                  font-bold
                "
              >
                <span
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-emerald-500
                    animate-pulse
                  "
                />

                Current
              </span>
            )}
          </div>

          {/* COMPANY */}
          <div className="flex flex-wrap items-center gap-5 mt-4">
            <div className="flex items-center gap-2 text-slate-600">
              <Building2 size={18} />

              <span className="font-semibold">
                {company}
              </span>
            </div>

            {location && (
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin size={18} />

                <span>{location}</span>
              </div>
            )}

            {employmentType && (
              <div className="flex items-center gap-2 text-slate-500">
                <Clock3 size={18} />

                <span>{employmentType}</span>
              </div>
            )}
          </div>

          {/* DATE */}
          <div
            className="
              inline-flex
              items-center
              gap-3
              mt-5
              px-5
              py-3
              rounded-2xl
              bg-slate-100
              text-slate-700
              font-semibold
            "
          >
            <CalendarDays size={18} />

            <span>
              {formatDate(startDate)} —{" "}
              {current
                ? "Present"
                : formatDate(endDate)}
            </span>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      {description && (
        <div className="mt-7">
          <h4 className="font-bold text-slate-800 mb-3">
            Description
          </h4>

          <p className="text-slate-600 leading-relaxed">
            {description}
          </p>
        </div>
      )}

      {/* TECHNOLOGIES */}
      {technologies.length > 0 && (
        <div className="mt-7">
          <h4 className="font-bold text-slate-800 mb-4">
            Technologies & Skills
          </h4>

          <div className="flex flex-wrap gap-3">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                }}
                className="
                  px-4
                  py-2
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-50
                  to-blue-50
                  border
                  border-indigo-100
                  text-indigo-700
                  font-semibold
                  text-sm
                "
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div
        className="
          mt-8
          pt-6
          border-t
          border-slate-100
          flex
          items-center
          justify-between
        "
      >
        <div className="flex items-center gap-2">
          <div
            className="
              w-3
              h-3
              rounded-full
              bg-blue-500
            "
          />

          <p className="text-sm text-slate-500">
            Professional Experience
          </p>
        </div>

        <div className="text-sm text-slate-400">
          #{id || "EXP"}
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;