import { defineNuxtConfig } from 'nuxt3'
import { presetAttributify, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'

export default defineNuxtConfig({
  buildModules: [
    '@vueuse/core/nuxt',
    '~/modules/uno.ts',
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
