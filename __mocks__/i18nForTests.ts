import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import FR_COMMON from "@locales/fr/common.json";

i18n.use(initReactI18next).init({
  lng: "fr",
  fallbackLng: "fr",
  debug: false, // It should be false
  ns: ["common"],
  defaultNS: "common",
  resources: { fr: { common: FR_COMMON } },
});

export default i18n;
