import { FastifyInstance } from 'fastify'
import MealController from '../controllers/MealController'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', MealController.store)
}
