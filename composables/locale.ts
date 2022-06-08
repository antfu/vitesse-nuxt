import { useI18n } from 'vue-i18n'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
        /* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-argument */
        if (nuxtApp.ssrContext?.req.headers) {
          const acceptLanguage =
            nuxtApp.ssrContext.req.headers['accept-language'] || 'en'
          const preferredLanguage = acceptLanguage.split(',')[0]
          setLocale(preferredLanguage)
        }
        /* eslint-enable */
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
