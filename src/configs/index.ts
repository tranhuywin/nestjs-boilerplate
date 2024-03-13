import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { dbConfig } from './database';

export interface IConfig {
  env: string;
  port: number;
  database: PostgresConnectionOptions;
  keys: {
    privateKey: string;
    publicKey: string;
  };
  postgresHost: string;
  jwtSecretKey: string;
  stripe: {
    publishableKey: string;
    secretKey: string;
  };
  mailer: {
    user: string;
    pass: string;
  };
}

export default (): Partial<IConfig> => ({
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  database: dbConfig(),
  keys: {
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY,
  },
  postgresHost: process.env.POSTGRES_HOST || 'localhost',
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
  },
  mailer: {
    user: process.env.MAILER_AUTH_USER,
    pass: process.env.MAILER_AUTH_PASS,
  },
});
