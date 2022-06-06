import path from 'path'
import * as Reflect from 'reflect-metadata'
import { buildSchemaSync } from 'type-graphql'
import url from 'url'

import { ApolloServer, resolvers } from '~/server/graphql'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let schema
if (Reflect) {
  // in case of reflect-metadata removed when build
  schema = buildSchemaSync({
    resolvers,
    emitSchemaFile: {
      path: path.resolve(__dirname, '../../graphql/generated/schema.gql'),
      commentDescriptions: true,
      sortedSchema: false, // by default the printed schema is sorted alphabetically
    },
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
