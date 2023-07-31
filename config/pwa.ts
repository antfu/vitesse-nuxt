import process from 'node:process'
import type { ModuleOptions } from '@vite-pwa/nuxt'
import { appDescription, appName } from '../constants/index'

const scope = '/'

export const pwa: ModuleOptions = {
  mode: 'development',
  registerType: 'autoUpdate',
  scope,
  base: scope,
  manifest: {
    id: scope,
    scope,
    name: appName,
    short_name: appName,
    description: appDescription,
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'maskable-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,txt,png,ico,svg}'],
    navigateFallbackDenylist: [/^\/api\//, /^\/hi\//],
    navigateFallback: '/',
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        handler: 'NetworkFirst',
        urlPattern: ({ url }) => url.pathname.startsWith('/hi/') ? ['hi', url.pathname] : false,
        options: {
          cacheName: 'hi-id-cache',
          cacheableResponse: {
            statuses: [200], // only 200 status code will be cached
          },
          expiration: {
            maxEntries: 10, // max 10 entries will be cached
          },
          plugins: [{
            // when offline and /hi/<name> missing from cache, the sw will fail, fallback to /
            handlerDidError: async () => Response.redirect('/', 302),
          }],
        },
      },
      {
        urlPattern: /^https:\/\/fonts.googleapis.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts.gstatic.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  registerWebManifestInRouteRules: true,
  writePlugin: true,
  devOptions: {
    enabled: process.env.VITE_PLUGIN_PWA === 'true',
    navigateFallback: scope,
  },
}
