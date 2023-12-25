import 'knex'

declare module 'knex/types/tables' {
  interface Tables {
    users: {
      id: string
      name: string
      email: string
      password: string
    }
    meals: {
      id: string
      name: string
      description: string
      diet: 'yes' | 'no'
      created_at: string
      updated_at: string
      user_id: string
    }
  }
}
