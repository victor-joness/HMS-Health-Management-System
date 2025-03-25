import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '../locale/en.json'
import pt from '../locale/pt.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: en.translations },
      pt: { translations: pt.translations },
    },
    lng: 'pt', // Idioma padrão
    fallbackLng: 'pt', // Idioma de fallback
    ns: ['translations'], // Namespace usado
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;