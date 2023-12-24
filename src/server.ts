import fastify from 'fastify'
import { env } from './env'
import { routes } from './routes'

const app = fastify()

app.register(routes)

app
  .listen({
    port: env.APP_PORT,
  })
  .then(() =>
    console.log(`HTTP Server Running on http://localhost:${env.APP_PORT}`),
  )
