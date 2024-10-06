import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@locales/en/translation.json';
import he from '@locales/he/translation.json'; 

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      he: { translation: he },
    },
    lng: typeof window !== 'undefined' ? navigator.language.split('-')[0] : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Disable suspense to avoid SSR issues
    },
  });

export default i18n;