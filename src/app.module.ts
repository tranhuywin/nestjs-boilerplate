import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module'
import configuration, { IConfig } from './configs'
import { EmailsModule } from './emails/emails.module'
import { RequestTimingMiddleware } from './middlewares/request-timing.middleware'
import { PaymentsModule } from './payments/payments.module'
import { StripeModule } from './stripe/stripe.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<IConfig>) => configService.get('database'),
      inject: [ConfigService],
    }),
    StripeModule.forRoot(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' }),
    EventEmitterModule.forRoot(),
    UsersModule,
    AuthModule,
    PaymentsModule,
    EmailsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestTimingMiddleware).forRoutes('*')
  }
}
