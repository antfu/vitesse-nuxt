import {
  type GraphQLOptions,
  ApolloServerBase,
  convertNodeHttpToRequest,
  isHttpQueryError,
  runHttpQuery,
} from 'apollo-server-core'
import { useBody, useQuery } from 'h3'
import type { IncomingMessage, ServerResponse } from 'http'

export default class ApolloServer extends ApolloServerBase {
  async createGraphQLServerOptions(
    request?: IncomingMessage,
    reply?: ServerResponse,
  ): Promise<GraphQLOptions> {
    return this.graphQLServerOptions({ request, reply })
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  createHandler() {
    return defineEventHandler(async (event) => {
      const { req, res } = event
      const options = await this.createGraphQLServerOptions(req, res)
      try {
        const { graphqlResponse, responseInit } = await runHttpQuery([], {
          method: req.method || 'GET',
          options,
          query: req.method === 'POST' ? await useBody(req) : useQuery(req),
          request: convertNodeHttpToRequest(req),
        })
        if (responseInit.headers) {
          for (const [name, value] of Object.entries<string>(
            responseInit.headers,
          )) {
            res.setHeader(name, value)
          }
        }
        res.end(graphqlResponse)
      } catch (e) {
        const error = e as Error
        if (isHttpQueryError(error)) {
          if (error.headers) {
            for (const [name, value] of Object.entries<string>(error.headers)) {
              res.setHeader(name, value)
            }
          }
          res.statusCode = error.statusCode
        }
        res.end(error.message)
      }
    })
  }
}
