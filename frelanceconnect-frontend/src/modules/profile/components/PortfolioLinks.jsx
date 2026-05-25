// src/modules/profile/components/PortfolioLinks.jsx
import { Globe } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Github,
  Linkedin,
  ExternalLink,
  Plus,
  Trash2,
  FolderOpen,
} from "lucide-react";

const PortfolioLinks = ({
  portfolioLinks = [],
  editable = false,
  onChange,
}) => {
  const [newLink, setNewLink] = useState({
    title: "",
    url: "",
    type: "portfolio",
  });

  const handleAddLink = () => {
    if (!newLink.title || !newLink.url) return;

    const updatedLinks = [...portfolioLinks, newLink];

    onChange(updatedLinks);

    setNewLink({
      title: "",
      url: "",
      type: "portfolio",
    });
  };

  const handleDelete = (index) => {
    const updatedLinks = portfolioLinks.filter(
      (_, i) => i !== index
    );

    onChange(updatedLinks);
  };

  const getIcon = (type) => {
    switch (type) {
      case "github":
        return <Github size={20} />;

      case "linkedin":
        return <Linkedin size={20} />;

      case "website":
        return <Globe size={20} />;

      default:
        return <FolderOpen size={20} />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case "github":
        return "from-slate-800 to-slate-900";

      case "linkedin":
        return "from-blue-600 to-indigo-600";

      case "website":
        return "from-emerald-500 to-green-600";

      default:
        return "from-purple-600 to-pink-600";
    }
  };

  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        shadow-sm
        p-8
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800">
            Portfolio & Links
          </h2>

          <p className="text-slate-500 mt-1">
            Showcase your work and online presence
          </p>
        </div>

        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-gradient-to-r
            from-indigo-500
            to-blue-600
            flex
            items-center
            justify-center
            text-white
            shadow-lg
          "
        >
          <ExternalLink size={24} />
        </div>
      </div>

      {/* EMPTY STATE */}
      {portfolioLinks.length === 0 && (
        <div
          className="
            border-2
            border-dashed
            border-slate-200
            rounded-3xl
            py-14
            flex
            flex-col
            items-center
            justify-center
            text-center
          "
        >
          <div
            className="
              w-20
              h-20
              rounded-full
              bg-slate-100
              flex
              items-center
              justify-center
              mb-5
            "
          >
            <FolderOpen
              className="text-slate-400"
              size={34}
            />
          </div>

          <h3 className="text-xl font-bold text-slate-700">
            No Portfolio Links Added
          </h3>

          <p className="text-slate-500 mt-2 max-w-md">
            Add your GitHub, LinkedIn, personal website,
            or portfolio projects to attract more clients.
          </p>
        </div>
      )}

      {/* LINKS GRID */}
      {portfolioLinks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {portfolioLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              whileHover={{
                y: -5,
                scale: 1.01,
              }}
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                hover:shadow-xl
                transition-all
                duration-300
                group
              "
            >
              {/* TOP GRADIENT */}
              <div
                className={`
                  absolute
                  top-0
                  left-0
                  w-full
                  h-1
                  bg-gradient-to-r
                  ${getColor(link.type)}
                `}
              />

              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className={`
                      w-14
                      h-14
                      rounded-2xl
                      bg-gradient-to-r
                      ${getColor(link.type)}
                      text-white
                      flex
                      items-center
                      justify-center
                      shadow-lg
                    `}
                  >
                    {getIcon(link.type)}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {link.title}
                    </h3>

                    <p className="text-slate-500 text-sm mt-1 capitalize">
                      {link.type}
                    </p>

                    <p
                      className="
                        text-blue-600
                        text-sm
                        mt-3
                        break-all
                        line-clamp-2
                      "
                    >
                      {link.url}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-slate-100
                      flex
                      items-center
                      justify-center
                      text-slate-600
                      group-hover:bg-blue-100
                      group-hover:text-blue-600
                      transition-all
                    "
                  >
                    <ExternalLink size={18} />
                  </motion.div>

                  {editable && (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(index);
                      }}
                      className="
                        w-10
                        h-10
                        rounded-xl
                        bg-red-50
                        text-red-500
                        flex
                        items-center
                        justify-center
                        hover:bg-red-100
                        transition-all
                      "
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}

      {/* ADD LINK FORM */}
      {editable && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            mt-8
            rounded-3xl
            border
            border-slate-200
            bg-slate-50
            p-6
          "
        >
          <h3 className="text-xl font-bold text-slate-800 mb-6">
            Add Portfolio Link
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {/* TITLE */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Title
              </label>

              <input
                type="text"
                placeholder="My Portfolio"
                value={newLink.title}
                onChange={(e) =>
                  setNewLink({
                    ...newLink,
                    title: e.target.value,
                  })
                }
                className="
                  w-full
                  px-4
                  py-3
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  outline-none
                  focus:ring-4
                  focus:ring-blue-100
                  focus:border-blue-500
                  transition-all
                "
              />
            </div>

            {/* TYPE */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Link Type
              </label>

              <select
                value={newLink.type}
                onChange={(e) =>
                  setNewLink({
                    ...newLink,
                    type: e.target.value,
                  })
                }
                className="
                  w-full
                  px-4
                  py-3
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  outline-none
                  focus:ring-4
                  focus:ring-blue-100
                  focus:border-blue-500
                  transition-all
                "
              >
                <option value="portfolio">
                  Portfolio
                </option>

                <option value="github">
                  GitHub
                </option>

                <option value="linkedin">
                  LinkedIn
                </option>

                <option value="website">
                  Website
                </option>
              </select>
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                URL
              </label>

              <input
                type="url"
                placeholder="https://example.com"
                value={newLink.url}
                onChange={(e) =>
                  setNewLink({
                    ...newLink,
                    url: e.target.value,
                  })
                }
                className="
                  w-full
                  px-4
                  py-3
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  outline-none
                  focus:ring-4
                  focus:ring-blue-100
                  focus:border-blue-500
                  transition-all
                "
              />
            </div>
          </div>

          {/* BUTTON */}
          <motion.button
            type="button"
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={handleAddLink}
            className="
              inline-flex
              items-center
              gap-3
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              hover:from-blue-700
              hover:to-indigo-700
              text-white
              px-6
              py-3
              rounded-2xl
              font-bold
              shadow-lg
              hover:shadow-xl
              transition-all
            "
          >
            <Plus size={18} />
            Add Link
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default PortfolioLinks;