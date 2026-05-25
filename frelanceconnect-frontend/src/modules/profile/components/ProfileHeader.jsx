// src/modules/profile/components/ProfileHeader.jsx
import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  CalendarDays,
  Pencil,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const ProfileHeader = ({
  name = "Unknown User",
  email = "No email",
  phone = "No phone",
  location = "Remote",
  image = "",
  role = "Freelancer",
  joinedDate = "",
  verified = false,
  onEdit,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        relative
        overflow-hidden
        rounded-[34px]
        border
        border-slate-200
        bg-white
        shadow-xl
      "
    >
      {/* COVER */}
      <div
        className="
          h-56
          bg-gradient-to-r
          from-indigo-600
          via-blue-600
          to-cyan-500
          relative
        "
      >
        {/* GLOW */}
        <div
          className="
            absolute
            top-0
            right-0
            w-72
            h-72
            bg-white/10
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-0
            w-full
            h-20
            bg-gradient-to-t
            from-black/10
            to-transparent
          "
        />
      </div>

      {/* CONTENT */}
      <div className="px-8 pb-8">
        {/* AVATAR */}
        <div
          className="
            -mt-20
            relative
            w-fit
          "
        >
          <div
            className="
              w-40
              h-40
              rounded-[30px]
              overflow-hidden
              border-[6px]
              border-white
              bg-white
              shadow-2xl
            "
          >
            <img
              src={
                image ||
                `https://ui-avatars.com/api/?name=${name}&background=4f46e5&color=fff&size=300`
              }
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {verified && (
            <div
              className="
                absolute
                bottom-2
                right-2
                bg-emerald-500
                w-10
                h-10
                rounded-2xl
                flex
                items-center
                justify-center
                border-4
                border-white
                shadow-lg
              "
            >
              <BadgeCheck
                className="text-white"
                size={18}
              />
            </div>
          )}
        </div>

        {/* HEADER ROW */}
        <div
          className="
            mt-6
            flex
            flex-col
            xl:flex-row
            xl:items-start
            xl:justify-between
            gap-6
          "
        >
          {/* LEFT */}
          <div className="flex-1">
            {/* NAME */}
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-black text-slate-800">
                {name}
              </h1>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-indigo-100
                  text-indigo-700
                  px-4
                  py-2
                  rounded-2xl
                  font-bold
                "
              >
                {role}
              </div>
            </div>

            {/* CONTACT */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* EMAIL */}
              <div
                className="
                  flex
                  items-center
                  gap-4
                  bg-slate-50
                  border
                  border-slate-200
                  rounded-2xl
                  p-4
                "
              >
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <Mail
                    className="text-blue-600"
                    size={20}
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    Email
                  </p>

                  <p className="font-semibold text-slate-700 break-all">
                    {email}
                  </p>
                </div>
              </div>

              {/* PHONE */}
              <div
                className="
                  flex
                  items-center
                  gap-4
                  bg-slate-50
                  border
                  border-slate-200
                  rounded-2xl
                  p-4
                "
              >
                <div className="bg-emerald-100 p-3 rounded-2xl">
                  <Phone
                    className="text-emerald-600"
                    size={20}
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    Phone
                  </p>

                  <p className="font-semibold text-slate-700">
                    {phone}
                  </p>
                </div>
              </div>

              {/* LOCATION */}
              <div
                className="
                  flex
                  items-center
                  gap-4
                  bg-slate-50
                  border
                  border-slate-200
                  rounded-2xl
                  p-4
                "
              >
                <div className="bg-orange-100 p-3 rounded-2xl">
                  <MapPin
                    className="text-orange-600"
                    size={20}
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    Location
                  </p>

                  <p className="font-semibold text-slate-700">
                    {location}
                  </p>
                </div>
              </div>

              {/* JOIN DATE */}
              <div
                className="
                  flex
                  items-center
                  gap-4
                  bg-slate-50
                  border
                  border-slate-200
                  rounded-2xl
                  p-4
                "
              >
                <div className="bg-indigo-100 p-3 rounded-2xl">
                  <CalendarDays
                    className="text-indigo-600"
                    size={20}
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    Joined
                  </p>

                  <p className="font-semibold text-slate-700">
                    {joinedDate || "Recently"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* EDIT BUTTON */}
          <div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onEdit}
              className="
                flex
                items-center
                gap-3
                bg-gradient-to-r
                from-indigo-600
                to-blue-600
                hover:from-indigo-700
                hover:to-blue-700
                text-white
                px-7
                py-4
                rounded-2xl
                font-bold
                shadow-xl
                transition-all
              "
            >
              <Pencil size={18} />
              Edit Profile
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;