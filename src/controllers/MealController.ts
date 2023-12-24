import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import MealRepository from '../repositories/MealRepository'
import UserRepository from '../repositories/UserRepository'

class MealController {
  async store(request: FastifyRequest, reply: FastifyReply) {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      diet: z.enum(['yes', 'no']),
      userId: z.string().uuid(),
    })

    const { name, description, diet, userId } = createMealBodySchema.parse(
      request.body,
    )

    const newMeal = {
      name,
      description,
      diet,
      userId,
    }

    const userExists = await UserRepository.findById(newMeal.userId)

    if (!userExists) {
      return reply.status(404).send({
        message: 'User not found',
      })
    }

    await MealRepository.create(newMeal)

    return reply.status(201).send()
  }
}

export default new MealController()
