import { defineNuxtConfig } from 'nuxt3'
import { presetAttributify, presetUno, presetIcons } from 'unocss'

export default defineNuxtConfig({
  buildModules: [
    '@vueuse/core/nuxt',
    '@unocss/nuxt',
  ],
  css: [
    '@unocss/reset/tailwind.css',
    '~/styles/main.css',
  ],
  unocss: {
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
        scale: 1.2,
      }),
    ],
  },
  components: true,
})
