import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import UserRepository from '../repositories/UserRepository'
import { compare } from 'bcrypt'

class LoginController {
  async store(request: FastifyRequest, reply: FastifyReply) {
    const loginBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = loginBodySchema.parse(request.body)

    const user = await UserRepository.findByEmail(email)

    if (user === undefined) {
      return reply.status(404).send({
        message: 'User not found',
      })
    }

    const passwordMatch = await compare(password, user.password)

    if (passwordMatch === false) {
      return reply.status(400).send({
        message: 'Incorrect password',
      })
    }

    reply.cookie('sessionId', user.id, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })

    return reply.send()
  }
}

export default new LoginController()
