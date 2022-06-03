import { type BuildSchemaOptions } from 'type-graphql'

import hello from './hello/resolver'

export * from './apollo-server'

export const resolvers: BuildSchemaOptions['resolvers'] = [hello]
