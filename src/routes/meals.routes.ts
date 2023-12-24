import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export async function mealsRoutes(app: FastifyInstance) {
  app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.send({ meals: [] })
  })
}
