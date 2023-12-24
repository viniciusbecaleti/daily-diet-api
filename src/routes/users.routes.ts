import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.send({ users: [] })
  })
}
