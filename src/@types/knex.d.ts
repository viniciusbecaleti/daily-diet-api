import 'knex'

declare module 'knex/types/tables' {
  interface Tables {
    users: {
      id: string
      name: string
    }
  }
}
