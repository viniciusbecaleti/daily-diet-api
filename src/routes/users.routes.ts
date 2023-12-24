import { FastifyInstance } from 'fastify'
import UserController from '../controllers/UserController'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', UserController.store)
}
