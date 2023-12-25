import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import MealRepository from '../repositories/MealRepository'
import UserRepository from '../repositories/UserRepository'

class MealController {
  async index(request: FastifyRequest, reply: FastifyReply) {
    const sessionId = request.cookies.sessionId!

    const meals = await MealRepository.findAll(sessionId)

    return reply.status(200).send(meals)
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const sessionId = request.cookies.sessionId!

    const showMealParamsSchema = z.object({
      mealId: z.string().uuid(),
    })

    const { mealId } = showMealParamsSchema.parse(request.params)

    const meal = await MealRepository.findById(mealId, sessionId)

    return reply.status(200).send(meal)
  }

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

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const sessionId = request.cookies.sessionId!

    const deleteMealParamsSchema = z.object({
      mealId: z.string().uuid(),
    })

    const { mealId } = deleteMealParamsSchema.parse(request.params)

    await MealRepository.delete(mealId, sessionId)

    return reply.status(200).send()
  }
}

export default new MealController()
