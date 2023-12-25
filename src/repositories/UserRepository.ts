import { knex } from '../database'

interface User {
  name: string
}

class UserRepository {
  async findById(id: string) {
    const user = await knex('users').where({ id }).first()

    return user
  }

  async findByName(name: string) {
    const user = await knex('users').where({ name }).first()

    return user
  }

  async findByEmail(email: string) {
    const user = await knex('users').where({ email }).first()

    return user
  }

  async create(newUser: User) {
    await knex('users').insert(newUser)
  }
}

export default new UserRepository()
