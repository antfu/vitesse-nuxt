import { createApolloServer } from '~/server/graphql'

const apolloServer = createApolloServer()
void apolloServer.start().catch((err) => {
  throw err
})
const handler = apolloServer.createHandler()
export default handler
