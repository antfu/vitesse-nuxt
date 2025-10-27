import { addVitePlugin, defineNuxtModule } from '@nuxt/kit'
import { DevTools } from '@vitejs/devtools'

export default defineNuxtModule({
  meta: {
    name: 'vite',
  },
  setup() {
    addVitePlugin(DevTools())
    addVitePlugin({
      name: 'nuxt:devtools',
      devtools: {
        setup(ctx) {
          ctx.docks.register({
            id: 'vitest',
            type: 'iframe',
            icon: 'https://vitest.dev/logo.svg',
            title: 'Vitest',
            url: 'http://localhost:51204/__vitest__/#/',
          })
          ctx.docks.register({
            id: 'nuxt',
            type: 'iframe',
            icon: 'https://nuxt.com/assets/design-kit/icon-green.svg',
            title: 'Nuxt',
            url: '/__nuxt_devtools__/client/',
          })
          ctx.docks.register({
            id: 'unocss',
            type: 'iframe',
            icon: 'https://unocss.dev/logo.svg',
            title: 'Vitest',
            url: '/__unocss',
          })
        },
      },
    })
  },
})
