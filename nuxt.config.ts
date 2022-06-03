/* eslint-disable import/no-unresolved */

import { defineNuxtConfig } from 'nuxt'
import TypedRouter from 'nuxt-typed-router'
import AutoImport from 'unplugin-auto-import/vite'

import locales from './locales'

const lifecycle = process.env.npm_lifecycle_event

export default defineNuxtConfig({
  buildModules: [
    '@intlify/nuxt3',
    // '@nuxt3/graphql-codegen-module',
    '@nuxt3/apollo-module',
  ],
  // https://github.com/intlify/nuxt3#-configurations
  intlify: {
    vueI18n: {
      locale: 'zh',
      messages: locales,
    },
  },
  // https://github.com/newbeea/nuxt3-graphql-codegen-module#configuration
  // Not working for now, generate manually with `npx graphql-codegen` for now
  // graphqlCodegen: {
  //   schema: ['http://localhost:3000/api/graphql', 'https://countries.trevorblades.com/'],
  // },
  // https://github.com/newbeea/nuxt3-apollo-module#configuration
  apollo: {
    default: {
      // Local GraphQL server, set BASE_URL env when building if using serverless or deploying on an unknown port
      uri: `${process.env.BASE_URL || 'http://localhost:3000'}/api/graphql`,
    },
    trevorblades: {
      uri: 'https://countries.trevorblades.com/',
    },
  },
  modules: [
    TypedRouter,
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-lodash',
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
  // https://github.com/victorgarciaesgi/nuxt-typed-router
  nuxtTypedRouter: {
    // Output directory where you cant the files to be saved
    // outDir: './generated',
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
  vite: {
    plugins: [
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: ['pinia'],
        dts: 'types/auto-imports.d.ts',
      }),
    ],
  },
})
