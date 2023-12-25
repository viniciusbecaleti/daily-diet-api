import { FastifyInstance } from 'fastify'
import LoginController from '../controllers/LoginController'

export async function loginRoutes(app: FastifyInstance) {
  app.post('/', LoginController.store)
}
