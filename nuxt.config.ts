import { defineNuxtConfig } from 'nuxt3'
import { presetAttributify, presetUno, presetIcons } from 'unocss'

export default defineNuxtConfig({
  meta: {
    title: 'Vitesse Nuxt 3',
  },
  buildModules: [
    '@vueuse/core/nuxt',
    '@unocss/nuxt',
  ],
  unocss: {
    shortcuts: [
      ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ],
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
        scale: 1.2,
      }),
    ],
  },
})
