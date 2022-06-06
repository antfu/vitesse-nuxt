/* eslint-disable import/no-unresolved,@typescript-eslint/explicit-function-return-type */

import { defineNuxtConfig } from 'nuxt'

import locales from './locales'

const lifecycle = process.env.npm_lifecycle_event

const autoImportOpts = {
  // global imports to register
  imports: [
    // presets
    'pinia',
    // custom
    {},
  ],
  // dirs: ['generated/typed-router'],
  dts: './generated/auto-imports.d.ts',
}

export default defineNuxtConfig({
  autoImports: {
    dirs: [
      'generated/typed-router',
      'graphql/generated/ops/queries',
      'graphql/generated/ops/mutations',
      'graphql/generated/ops/subscriptions',
    ],
  },
  modules: [
    // https://github.com/antfu/unplugin-auto-import
    ['unplugin-auto-import/nuxt', autoImportOpts],
    'nuxt-typed-router',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-lodash',
    '@intlify/nuxt3',
    //  'nuxt-graphql-codegen'
  ],
  build: {
    // https://github.com/element-plus/element-plus-nuxt-starter/blob/44644788ee0d2a2580769769f9885b5cd9f7c0ab/nuxt.config.ts#L27
    transpile:
      lifecycle === 'build' || lifecycle === 'generate' ? ['element-plus'] : [],
  },
  experimental: {
    reactivityTransform: true,
    // Disabled for now, see:
    // https://github.com/antfu/vitesse-nuxt3/issues/42#issuecomment-1126377430
    // viteNode: true,
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  ignore: ['graphql/generated/**'],
  // https://github.com/victorgarciaesgi/nuxt-typed-router
  nuxtTypedRouter: {
    // Output directory where you cant the files to be saved
    outDir: './generated/typed-router',
    // Name of the routesNames object
    // routesObjectName: 'routerPagesNames',
  },
  // https://github.com/cipami/nuxt-lodash
  lodash: {
    prefix: 'lo',
    prefixSkip: [],
  },
  css: ['~/styles/index.scss'],
  unocss: {
    preflight: true,
  },
  colorMode: {
    classSuffix: '',
  },
  // https://github.com/intlify/nuxt3
  intlify: {
    vueI18n: {
      locale: 'zh-CN',
      messages: locales,
    },
  },
  // vite: {
  //   plugins: [],
  // },
})
