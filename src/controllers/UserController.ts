import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import UserRepository from '../repositories/UserRepository'
import { hash } from 'bcrypt'

class UserController {
  /* async index(request: FastifyRequest, reply: FastifyReply) {} */

  /* async show(request: FastifyRequest, reply: FastifyReply) {} */

  async store(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(4),
    })

    const { name, email, password } = createUserBodySchema.parse(request.body)

    const newUser = {
      name,
      email,
      password: await hash(password, 10),
    }

    const userAlreadyExists = await UserRepository.findByEmail(newUser.email)

    if (userAlreadyExists) {
      return reply.status(400).send({
        message: 'User already exists',
      })
    }

    await UserRepository.create(newUser)

    return reply.status(201).send()
  }

  /* async update(request: FastifyRequest, reply: FastifyReply) {} */

  /* async delete(request: FastifyRequest, reply: FastifyReply) {} */
}

export default new UserController()
