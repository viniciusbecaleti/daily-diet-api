import fastify from 'fastify'
import { env } from './env'
import { usersRoutes } from './routes/users.routes'
import { mealsRoutes } from './routes/meals.routes'

const app = fastify()

app.register(usersRoutes, {
  prefix: '/users',
})

app.register(mealsRoutes, {
  prefix: '/meals',
})

app
  .listen({
    port: env.APP_PORT,
  })
  .then(() =>
    console.log(`HTTP Server Running on http://localhost:${env.APP_PORT}`),
  )
