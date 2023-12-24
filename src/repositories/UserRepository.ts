import { knex } from '../database'

interface User {
  name: string
}

class UserRepository {
  async findByName(name: string) {
    const user = await knex('users').where({ name }).first()

    return user
  }

  async create(newUser: User) {
    const user = await this.findByName(newUser.name)

    if (user) {
      throw new Error('User already exists')
    }

    await knex('users').insert(newUser)
  }
}

export default new UserRepository()
