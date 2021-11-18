import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  title: 'Vitesse Nuxt 3',
  buildModules: [
    '@vueuse/core/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
  ],
  unocss: {
    shortcuts: [
      ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ],
    uno: true,
    attributify: true,
    icons: {
      scale: 1.2,
    },
  },
  vite: {
    logLevel: 'info',
  },
})
