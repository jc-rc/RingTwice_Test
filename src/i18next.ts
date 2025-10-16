import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './locales/en.json'
import es from './locales/es.json'
import nl from './locales/nl.json'
import fr from './locales/fr.json'

export const resources = { 
  en: { translation: en },
  es: { translation: es },
  nl: { translation: nl },
  fr: { translation: fr },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });
  
export default i18n;
  