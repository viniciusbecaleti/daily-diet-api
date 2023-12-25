import { FastifyInstance } from 'fastify'
import { usersRoutes } from './users.routes'
import { mealsRoutes } from './meals.routes'
import { loginRoutes } from './login.routes'

export async function routes(app: FastifyInstance) {
  app.register(usersRoutes, {
    prefix: '/users',
  })

  app.register(mealsRoutes, {
    prefix: '/meals',
  })

  app.register(loginRoutes, {
    prefix: '/login',
  })
}
