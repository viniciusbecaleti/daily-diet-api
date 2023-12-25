import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import MealRepository from '../repositories/MealRepository'
import UserRepository from '../repositories/UserRepository'

class MealController {
  async store(request: FastifyRequest, reply: FastifyReply) {
    const sessionId = request.cookies.sessionId!

    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      diet: z.enum(['yes', 'no']),
    })

    const { name, description, diet } = createMealBodySchema.parse(request.body)

    const newMeal = {
      name,
      description,
      diet,
      userId: sessionId,
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
