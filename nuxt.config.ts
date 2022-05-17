import { defineNuxtConfig } from 'nuxt'
import TypedRouter from 'nuxt-typed-router'

export default defineNuxtConfig({
  buildModules: [TypedRouter],
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  experimental: {
    reactivityTransform: true,
    // Disabled for now, see:
    // https://github.com/antfu/vitesse-nuxt3/issues/42#issuecomment-1126377430
    // viteNode: true,
  },
  nuxtTypedRouter: {
    // Output directory where you cant the files to be saved
    // outDir: './generated',
    // Name of the routesNames object
    // routesObjectName: 'routerPagesNames',
  },
  unocss: {
    preflight: true,
  },
  colorMode: {
    classSuffix: '',
  },
})
