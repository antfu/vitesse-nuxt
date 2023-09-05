import { useI18n } from 'vue-i18n'

export function useLocale() {
  const { locale } = useI18n()

  const currentLocale = useCookie('locale', { maxAge: 20 * 365 * 24 * 60 * 60 })

  const setLocale = (l: string): void => {
    currentLocale.value = l
    locale.value = l
  }

  const setPreferredLanguage = (): void => {
    if (!currentLocale.value) {
      if (process.server) {
        const nuxtApp = useNuxtApp()

        if (nuxtApp.ssrContext?.event.req.headers) {
          const acceptLanguage =
            nuxtApp.ssrContext.event.req.headers['accept-language'] || 'en'
          const preferredLanguage = acceptLanguage.split(',')[0]
          setLocale(preferredLanguage)
        }
      }
    } else {
      setLocale(currentLocale.value)
    }
  }

  return {
    setPreferredLanguage,
    setLocale,
    locale,
  }
}
