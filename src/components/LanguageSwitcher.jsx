import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const LANGS = [
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "en", label: "English", flag: "🇺🇸" },
];

const LanguageSwitcher = ({ className = "" }) => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && saved !== i18n.language) {
      i18n.changeLanguage(saved);
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
    }
  }, [i18n]);

  const select = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = code;
    setOpen(false);
  };

  const current = i18n.language || "ar";

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 px-3 py-1 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-sm"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="text-lg">
          {LANGS.find((l) => l.code === current)?.flag}
        </span>
        <span className="hidden sm:inline">
          {LANGS.find((l) => l.code === current)?.label}
        </span>
        <svg className="w-3 h-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#111827] rounded-md shadow-lg z-50 overflow-hidden">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => select(l.code)}
              className={`w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-3 ${
                current === l.code
                  ? "bg-gray-100 dark:bg-gray-800 font-semibold"
                  : ""
              }`}
            >
              <span className="text-lg">{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

LanguageSwitcher.propTypes = {
  className: PropTypes.string,
};
