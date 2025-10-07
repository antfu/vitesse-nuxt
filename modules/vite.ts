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
            id: 'nuxt',
            type: 'iframe',
            icon: 'https://nuxt.com/assets/design-kit/icon-green.svg',
            title: 'Nuxt',
            url: '/__nuxt_devtools__/client/',
          })
        },
      },
    })
  },
})
