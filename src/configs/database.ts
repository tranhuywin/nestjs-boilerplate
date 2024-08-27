import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

import { join } from 'path'

export const dbConfig = (): PostgresConnectionOptions => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [join(__dirname, '../**/*.entity.{ts,js}')],
  synchronize: false,
  dropSchema: false,
  migrationsRun: false,
  logging: false,
  migrations: [join(__dirname, '../migrations/**/*.{ts,js}')],
  namingStrategy: new SnakeNamingStrategy(),
})

export default dbConfig()
