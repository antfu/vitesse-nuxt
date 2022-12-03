export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  unocss: {
    preflight: true, // Injecting `@unocss/reset/tailwind.css` entry
  },
  css: [],
  colorMode: {
    classSuffix: '',
  },
})
