import { renderPlaygroundPage } from 'graphql-playground-html'

export default defineEventHandler((event) => {
  try {
    const body = renderPlaygroundPage({
      endpoint: '/api/graphql',
    })
    event.res.end(body)
  } catch (err) {
    event.res.end({ message: (err as Error).message })
  }
})
