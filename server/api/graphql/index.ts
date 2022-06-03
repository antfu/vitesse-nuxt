import * as Reflect from 'reflect-metadata'
import { buildSchemaSync } from 'type-graphql'

import { ApolloServer, resolvers } from '~/server/graphql'

let schema
if (Reflect) {
  // in case of reflect-metadata removed when build
  schema = buildSchemaSync({
    resolvers,
    // emitSchemaFile: {
    //   path: './.nuxt/schema.graphql',
    // },
  })
} else {
  throw new Error('No reflect-metadata polyfill')
}

const apolloServer = new ApolloServer({
  schema,
})
void apolloServer.start()
const handler = apolloServer.createHandler()

export default handler
// const startAt = Date.now()
// let count = 0

// export default () => ({
//   pageview: count++,
//   startAt,
// })
