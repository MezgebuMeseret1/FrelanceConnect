// src/modules/profile/components/ProfileAvatarUpload.jsx

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Upload,
  Trash2,
  User,
  ImagePlus,
} from "lucide-react";

const ProfileAvatarUpload = ({
  image = "",
  name = "User",
  editable = false,
  onChange,
}) => {
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(image);

  const handleClick = () => {
    if (!editable) return;

    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);

    if (onChange) {
      onChange(file, imageUrl);
    }
  };

  const handleRemove = () => {
    setPreview("");

    if (onChange) {
      onChange(null, "");
    }
  };

  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-[32px]
        p-8
        shadow-sm
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800">
            Profile Picture
          </h2>

          <p className="text-slate-500 mt-1">
            Upload a professional profile photo
          </p>
        </div>

        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-gradient-to-r
            from-blue-500
            to-indigo-600
            flex
            items-center
            justify-center
            text-white
            shadow-lg
          "
        >
          <Camera size={24} />
        </div>
      </div>

      {/* AVATAR SECTION */}
      <div className="flex flex-col items-center">
        {/* AVATAR */}
        <motion.div
          whileHover={
            editable
              ? {
                  scale: 1.03,
                }
              : {}
          }
          onClick={handleClick}
          className={`
            relative
            group
            w-44
            h-44
            rounded-full
            overflow-hidden
            border-[6px]
            border-white
            shadow-2xl
            bg-slate-100
            flex
            items-center
            justify-center
            transition-all
            duration-300
            ${
              editable
                ? "cursor-pointer hover:shadow-blue-200"
                : ""
            }
          `}
        >
          {/* IMAGE */}
          {preview ? (
            <img
              src={preview}
              alt={name}
              className="
                w-full
                h-full
                object-cover
              "
            />
          ) : (
            <div
              className="
                w-full
                h-full
                bg-gradient-to-br
                from-slate-100
                to-slate-200
                flex
                items-center
                justify-center
              "
            >
              <User
                size={70}
                className="text-slate-400"
              />
            </div>
          )}

          {/* OVERLAY */}
          {editable && (
            <div
              className="
                absolute
                inset-0
                bg-black/50
                opacity-0
                group-hover:opacity-100
                transition-all
                duration-300
                flex
                flex-col
                items-center
                justify-center
                text-white
              "
            >
              <Camera size={34} />

              <p className="mt-3 font-semibold text-sm">
                Change Photo
              </p>
            </div>
          )}

          {/* ONLINE INDICATOR */}
          <div
            className="
              absolute
              bottom-4
              right-4
              w-7
              h-7
              rounded-full
              bg-emerald-500
              border-4
              border-white
              shadow-md
            "
          />
        </motion.div>

        {/* NAME */}
        <div className="text-center mt-6">
          <h3 className="text-2xl font-black text-slate-800">
            {name}
          </h3>

          <p className="text-slate-500 mt-1">
            Professional Freelancer Profile
          </p>
        </div>

        {/* BUTTONS */}
        {editable && (
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {/* UPLOAD */}
            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={handleClick}
              type="button"
              className="
                inline-flex
                items-center
                gap-3
                px-6
                py-3
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                hover:from-blue-700
                hover:to-indigo-700
                text-white
                font-bold
                shadow-lg
                hover:shadow-xl
                transition-all
              "
            >
              <Upload size={18} />
              Upload Photo
            </motion.button>

            {/* REMOVE */}
            {preview && (
              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={handleRemove}
                type="button"
                className="
                  inline-flex
                  items-center
                  gap-3
                  px-6
                  py-3
                  rounded-2xl
                  bg-red-50
                  hover:bg-red-100
                  text-red-600
                  font-bold
                  border
                  border-red-200
                  transition-all
                "
              >
                <Trash2 size={18} />
                Remove
              </motion.button>
            )}
          </div>
        )}

        {/* FILE INFO */}
        <div
          className="
            mt-8
            w-full
            rounded-3xl
            border
            border-dashed
            border-slate-200
            bg-slate-50
            p-6
          "
        >
          <div className="flex items-start gap-4">
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-blue-100
                flex
                items-center
                justify-center
              "
            >
              <ImagePlus
                className="text-blue-600"
                size={24}
              />
            </div>

            <div>
              <h4 className="font-bold text-slate-800">
                Profile Photo Tips
              </h4>

              <ul className="mt-3 space-y-2 text-sm text-slate-500">
                <li>
                  • Use a professional and clear image
                </li>

                <li>
                  • Recommended size: 500×500 pixels
                </li>

                <li>
                  • JPG, PNG supported
                </li>

                <li>
                  • Good lighting improves trust
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* HIDDEN FILE INPUT */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProfileAvatarUpload;