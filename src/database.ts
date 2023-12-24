import { Knex, knex as setupKnex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: env.KNEX_CONNECTION,
  },
  migrations: {
    extension: 'ts',
    directory: env.KNEX_MIGRATIONS,
  },
  useNullAsDefault: true,
}

export const knex = setupKnex(config)
