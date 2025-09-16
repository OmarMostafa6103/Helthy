import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import ar from "./translations/ar.json";

// Determine initial language from localStorage when available, default to Arabic
function getInitialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved) return saved;
  } catch {
    // ignore
  }
  return "ar";
}

const initialLang = getInitialLang();

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ar: { translation: ar } },
  lng: initialLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

// Ensure document language and direction are set (in case index.html script didn't run or JS changed later)
try {
  document.documentElement.lang = initialLang;
  document.documentElement.dir = initialLang === "ar" ? "rtl" : "ltr";
} catch {
  // ignore (server-side rendering or restricted env)
}

export default i18n;
