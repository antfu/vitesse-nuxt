import locales from './locales'

export default defineI18nConfig(() => ({
  legacy: false,
  globalInjection: true,
  locale: 'zh-CN',
  fallbackLocale: 'en',
  messages: locales,
}))
