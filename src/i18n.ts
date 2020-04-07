import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en/translation.json";
import plTranslation from "./locales/pl/translation.json";
import { isProduction } from "./config";

export const SUPPORTED_LANGUAGES = ["en", "pl"];

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(detector)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      pl: {
        translation: plTranslation,
      },
    },
    fallbackLng: "en",
    debug: !isProduction,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
