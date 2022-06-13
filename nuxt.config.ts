/* eslint-disable import/no-unresolved,@typescript-eslint/explicit-function-return-type */

import { ElementPlusResolver } from '@daotl/unplugin-vue-components/resolvers'
import { defineNuxtConfig } from 'nuxt'

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
  resolvers: [ElementPlusResolver({ nuxt: true, ssr: true })],
  dts: './generated/auto-imports.d.ts',
}

const vueComponentsOpts = {
  resolvers: [ElementPlusResolver({ nuxt: true, ssr: true })],
  dts: './generated/vue-components.d.ts',
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
    'nuxt-typed-router',
    // https://github.com/antfu/unplugin-auto-import
    ['unplugin-auto-import/nuxt', autoImportOpts],
    ['unplugin-vue-components/nuxt', vueComponentsOpts],
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-lodash',
    // Replaced by `plugin/i18n.ts` for now for this issue:
    // https://github.com/intlify/nuxt3/issues/68#issuecomment-1139435935
    // '@intlify/nuxt3',
    // 'nuxt-graphql-codegen'
  ],
  build: {
    transpile: [
      // https://github.com/element-plus/element-plus-nuxt-starter/blob/44644788ee0d2a2580769769f9885b5cd9f7c0ab/nuxt.config.ts#L27
      ...(lifecycle === 'build' || lifecycle === 'generate'
        ? ['element-plus']
        : []),
      // Already solved by setting `nuxt: truessr: true` to `ElementPlusResolver`
      // For importing 'element-plus/es/components/xxx/style/css' to work
      // 'element-plus/es',
    ],
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
  // intlify: {
  //   vueI18n: {
  //     locale: 'zh-CN',
  //     messages: locales,
  //   },
  // },
  // vite: {
  //   plugins: [],
  // },
})
