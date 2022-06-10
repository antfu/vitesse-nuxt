// https://github.com/bicouy0/nuxt3-urql/blob/0f9040955a42cdd6916f48665cdb475037b6b4e7/plugins/urql.ts

import plugin, {
  type ClientOptions,
  cacheExchange,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from '@urql/vue'
// import { cacheExchange as graphCacheExchange } from '@urql/exchange-graphcache'

// import schema from '~/graphql/generated/introspection'
// import type { GraphCacheConfig } from '~/graphql/generated/types'

const ssrKey = '__URQL_DATA__'

export default defineNuxtPlugin((nuxt) => {
  const ssr = ssrExchange({
    isClient: process.client,
  })

  // when app is created in browser, restore SSR state from nuxt payload
  if (process.client) {
    nuxt.hook('app:created', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ssr.restoreData(nuxt.payload[ssrKey])
    })
  }

  // when app has rendered in server, send SSR state to client
  if (process.server) {
    nuxt.hook('app:rendered', () => {
      nuxt.payload[ssrKey] = ssr.extractData()
    })
  }

  // use urql graphcache
  // const cacheConfig: GraphCacheConfig = {
  //   schema,
  //   keys: {
  //     Country: (data) => data.code || null,
  //   },
  //   resolvers: {
  //     Query: {
  //       country: (_, args) => ({ __typename: 'Country', code: args.code }),
  //     },
  //   },
  //   // storage: process.client ? makeDefaultStorage() : undefined
  // }
  //   const cacheExchange = graphCacheExchange(cacheConfig)

  const host = process.server ? 'http://127.0.0.1:3000' : `//${location.host}`
  const url = `${host}/api/graphql`
  const opt: ClientOptions = {
    url,
    exchanges: [
      dedupExchange,
      cacheExchange,
      ssr, // Add `ssr` in front of the `fetchExchange`
      fetchExchange,
    ],
  }
  // const client = createClient(opt)

  nuxt.vueApp.use(plugin, opt)
})
