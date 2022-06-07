import path from 'path'
import * as Reflect from 'reflect-metadata'
import { type BuildSchemaOptions, buildSchemaSync } from 'type-graphql'
import url from 'url'

import ApolloServer from './apollo-server'
import helloResolver from './hello/resolver'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const resolvers: BuildSchemaOptions['resolvers'] = [helloResolver]

// Check in case of reflect-metadata removed when build
if (!Reflect) {
  throw new Error('No reflect-metadata polyfill')
}

const schema = buildSchemaSync({
  resolvers,
  emitSchemaFile: {
    path: path.resolve(__dirname, '../../graphql/generated/schema.gql'),
    commentDescriptions: true,
    sortedSchema: false, // by default the printed schema is sorted alphabetically
  },
})

export function createApolloServer(): ApolloServer {
  return new ApolloServer({
    schema,
  })
}
