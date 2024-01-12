import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

/* eslint-disable */
i18n.use(Backend)
  .use(initReactI18next)
  .init(
    {
      lng: 'en',
      fallbackLng: ['en', 'fa'],
      debug: false,
      ns: ['common', 'home', 'experience'],
      defaultNS: 'common',
      interpolation: {
        escapeValue: false
      }
    }, (err, t) => {
      if (err !== undefined) { console.warn('something went wrong loading', err) }
    }
  )

/* eslint-enable */
export default i18n
