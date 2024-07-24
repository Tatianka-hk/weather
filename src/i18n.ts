import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import uk from './locales/ua.json'

const messages = {
  en,
  uk
}

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
  legacy: false,
  globalInjection: true
})

export default i18n
