import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

import { dbConfig } from './database'

export type TEnv = 'local' | 'development' | 'production' | 'staging'

export interface IConfig {
  env: TEnv
  port: number
  database: PostgresConnectionOptions
  keys: {
    privateKey: string
    publicKey: string
  }
  postgresHost: string
  jwtSecretKey: string
  stripe: {
    publishableKey: string
    secretKey: string
  }
  mailer: {
    user: string
    pass: string
  }
  awsS3: {
    accessKeyId: string
    secretAccessKey: string
    bucket: string
    region: string
    endpoint: string
  }
}

export default (): Partial<IConfig> => ({
  env: (process.env.NODE_ENV as TEnv) || 'local',
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: dbConfig(),
  keys: {
    privateKey: process.env.PRIVATE_KEY ?? '',
    publicKey: process.env.PUBLIC_KEY ?? '',
  },
  postgresHost: process.env.POSTGRES_HOST ?? 'localhost',
  jwtSecretKey: process.env.JWT_SECRET_KEY ?? '',
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY ?? '',
    secretKey: process.env.STRIPE_SECRET_KEY ?? '',
  },
  mailer: {
    user: process.env.MAILER_AUTH_USER ?? '',
    pass: process.env.MAILER_AUTH_PASS ?? '',
  },
  awsS3: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY ?? '',
    bucket: process.env.AWS_S3_PUBLIC_BUCKET ?? '',
    region: process.env.AWS_S3_REGION ?? '',
    endpoint: process.env.AWS_S3_ENDPOINT ?? '',
  },
})
