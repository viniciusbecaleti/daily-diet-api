import { FastifyInstance } from 'fastify'
import MealController from '../controllers/MealController'
import { checkSessionIdExists } from '../middleware/checkSessionIdExists'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    checkSessionIdExists(request, reply)
  })

  app.post('/', MealController.store)
  app.delete('/:mealId', MealController.delete)
}
