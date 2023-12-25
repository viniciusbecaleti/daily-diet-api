import { FastifyInstance } from 'fastify'
import MealController from '../controllers/MealController'
import { checkSessionIdExists } from '../middleware/checkSessionIdExists'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    checkSessionIdExists(request, reply)
  })

  app.get('/', MealController.index)
  app.get('/:mealId', MealController.show)
  app.post('/', MealController.store)
  app.delete('/:mealId', MealController.delete)
}
