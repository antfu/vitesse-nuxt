import { ElementPlusResolver } from '@daotl/unplugin-vue-components/resolvers'

const lifecycle = process.env.npm_lifecycle_event

const elementPlusResolver = ElementPlusResolver({
  nuxt: true,
  ssr: true,
  directives: false,
})

const autoImportOpts = {
  // global imports to register
  imports: [
    // presets
    'pinia',
    // custom
    {},
  ],
  // dirs: ['generated/typed-router'],
  resolvers: [elementPlusResolver],
  dts: './generated/auto-imports.d.ts',
  vueTemplate: true,
}

const vueComponentsOpts = {
  resolvers: [ElementPlusResolver({ nuxt: true, ssr: true })],
  dts: './generated/vue-components.d.ts',
}

export default defineNuxtConfig({
  imports: {
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
    // May disable for error:
    // https://github.com/antfu/vitesse-nuxt3/issues/42#issuecomment-1126377430
    // viteNode: false,
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  ignore: [
    'graphql/generated/**',
    'generated/typed-router',
    ...(process.env.NODE_ENV !== 'development'
      ? ['pages/**/*.ts', 'pages/**/components']
      : []),
  ],
  vue: {
    compilerOptions: {
      directiveTransforms: {
        loading: () => ({
          props: [],
          needRuntime: true,
        }),
      },
    },
  },
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
  // vite: {
  //   server: {
  //     proxy: {
  //       // https://github.com/nuxt/framework/discussions/1223#discussioncomment-3113141
  //       '/api': {
  //         target: 'http://local.dev:8080', // process.env.API_URL,
  //         changeOrigin: true,
  //         rewrite: (path) => path,
  //       },
  //     },
  //   },
  // },

  // https://github.com/nuxt/framework/issues/6204#issuecomment-1201398080
  hooks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'vite:extendConfig': function (config: any, { isServer }: any) {
      if (isServer) {
        // Workaround for netlify issue
        // https://github.com/nuxt/framework/issues/6204
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        config.build.rollupOptions.output.inlineDynamicImports = true
      }
    },
  },
})
