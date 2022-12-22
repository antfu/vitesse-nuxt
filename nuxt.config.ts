import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const _lifecycle = process.env.npm_lifecycle_event

const apiBase = '' // '/nuxt-starter'
const runtimeConfig = {
  // The private keys which are only available within server-side
  apiSecret: '123',
  // Keys within public, will be also exposed to the client-side
  public: {
    // When adding apiBase to the runtimeConfig.public, Nuxt adds it to each page payload. We can universally access apiBase in both server and browser.
    // apiBase,
    backends: {
      restApiBaseUrl: `${apiBase}/api`,
      wsApiBaseUrl: `${apiBase}/ws`,
    },
  },
}

const elementPlusResolver = ElementPlusResolver({
  ssr: true,
  directives: false,
})

const autoImportOpts = {
  // global imports to register
  imports: [
    // presets
    'pinia',
    'vue-i18n',
    // custom
    {},
  ],
  resolvers: [elementPlusResolver],
  dts: './generated/auto-imports.d.ts',
  vueTemplate: true,
}

const vueComponentsOpts = {
  resolvers: [elementPlusResolver],
  dts: './generated/vue-components.d.ts',
}

export default defineNuxtConfig({
  runtimeConfig,
  // Without this option, `rootDir` was incorrectly set to `web/frontend/web-frontend` because of pnpm workspace
  // rootDir: '.',
  /**
   * Used to set the modules directories for path resolving (for example, webpack's `resolveLoading`, `nodeExternals` and `postcss`).
   * The configuration path is relative to `options.rootDir` (default is current working directory).
   * Setting this field may be necessary if your project is organized as a yarn workspace-styled mono-repository.
   * default: ["/<rootDir>/node_modules","/home/pooya/Code/framework/packages/schema/node_modules"]
   */
  // modulesDir: ['/<rootDir>/node_modules', '../../node_modules'],
  // ssr: false,
  // sourcemap: false,
  nitro: {
    // Enable multi core handling: https://nitro.unjs.io/deploy/node#cluster-mode
    preset: 'node-cluster',
    // Proxy backend APIs
    devProxy: {
      '/api': {
        target: 'http://local.dev:8080/api',
        changeOrigin: true,
      },
    },
    //   esbuild: {
    //     options: {
    //       minify: false,
    //     },
    //   },
  },
  // alias: {
  //   '@common': path.resolve(__dirname, '../common/src'),
  //   '@backend': path.resolve(__dirname, '../backend/src'),
  // },
  imports: {
    dirs: ['generated/typed-router'],
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
  ],
  build: {
    transpile: [
      // https://github.com/element-plus/element-plus-nuxt-starter/commit/09c84c050fae55600957cd89dba143ba8363fed0#diff-5977891bf10802cdd3cde62f0355105a1662e65b02ae4fb404a27bb0f5f53a07
      'element-plus/es',
      // Fix error: "[nuxt] [request error] [unhandled] [500] Cannot find module './internal/Observable'"
      // https://github.com/nuxt/framework/discussions/7772#discussioncomment-3970252
      'rxjs',
    ],
  },
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
    // May disable for error:
    // https://github.com/antfu/vitesse-nuxt3/issues/42#issuecomment-1126377430
    // viteNode: false,
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  ignore: [
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
