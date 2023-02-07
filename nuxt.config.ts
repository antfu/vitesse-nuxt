import type { NuxtPage } from '@nuxt/schema'

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

// const lifecycle = process.env.npm_lifecycle_event
const autoImportOpts = {
  // global imports to register
  imports: [
    // presets
    'pinia',
    'vue-i18n',
    // custom
    {},
  ],
  dts: './generated/auto-imports.d.ts',
  vueTemplate: true,
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
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@element-plus/nuxt',
    // Replaced by `plugin/i18n.ts` for now for this issue:
    // https://github.com/intlify/nuxt3/issues/68#issuecomment-1139435935
    // '@intlify/nuxt3',

    // Temporary workaround for `*.ts` files in `pages/` causing errors related to auto route generation
    // https://github.com/nuxt/framework/issues/6920#issuecomment-1232596227
    (_, nuxt): void => {
      if (process.env.NODE_ENV === 'development') {
        nuxt.options.extensions = nuxt.options.extensions.filter(
          (ext) => ext !== '.ts',
        )
      }
    },
  ],
  build: {
    transpile: [
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
  css: ['~/styles/index.scss'],
  unocss: {
    attributify: true,
    icons: true,
    // https://github.com/unocss/unocss/issues/932
    // @unocss/reset/tailwind.css is inserted after the Element UI style, causing button background to be transparent
    // preflight: true,
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
    // Improved pages module configuration
    // https://github.com/nuxt/nuxt/issues/12333
    'pages:extend': function (pages) {
      function removePagesMatching(
        pattern: RegExp,
        pages: NuxtPage[] = [],
      ): void {
        const pagesToRemove = []
        for (const page of pages) {
          if (pattern.test(page.file)) {
            pagesToRemove.push(page)
          } else {
            removePagesMatching(pattern, page.children)
          }
        }

        for (const page of pagesToRemove) {
          pages.splice(pages.indexOf(page), 1)
        }
      }
      removePagesMatching(/pages(.*)\/components\/|\.ts$/, pages)
    },
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
