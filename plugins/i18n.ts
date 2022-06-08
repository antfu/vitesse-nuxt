import { createI18n } from 'vue-i18n'

import locales from '~/locales'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'zh-CN',
  fallbackLocale: 'en',
  messages: locales,
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(i18n)
})
