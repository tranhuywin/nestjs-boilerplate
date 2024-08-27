import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'
import { addTransactionalDataSource } from 'typeorm-transactional'

import '@/boilerplate.polyfill'

import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import configuration, { IConfig } from './configs'
import { EmailsModule } from './emails/emails.module'
import { RequestTimingMiddleware } from './middlewares/request-timing.middleware'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<IConfig>) => {
        const dbConfig = configService.get('database')
        if (!dbConfig) {
          throw new Error('Database configuration is missing')
        }
        return dbConfig
      },
      inject: [ConfigService],
      dataSourceFactory: async (options?: DataSourceOptions) => {
        if (!options) {
          throw new Error('Invalid options passed')
        }
        return addTransactionalDataSource(new DataSource(options))
      },
    }),
    EventEmitterModule.forRoot(),
    UsersModule,
    AuthModule,
    EmailsModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestTimingMiddleware).forRoutes('*')
  }
}
