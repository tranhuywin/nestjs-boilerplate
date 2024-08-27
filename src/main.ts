import {
  BadRequestException,
  NestApplicationOptions,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { type NestExpressApplication } from '@nestjs/platform-express'
import compression from 'compression'
import helmet from 'helmet'
import morgan from 'morgan'
import { WinstonModule } from 'nest-winston'
import { initializeTransactionalContext } from 'typeorm-transactional'

import { AppModule } from './app.module'
import { TEnv } from './configs'
import { CustomLoggerService } from './core/custom-logger'
import { BadRequestExceptionFilter } from './core/filters'
import { AllExceptionsFilter } from './core/filters/all-exceptions.filter'
import { setupSwagger } from './setup-swagger'

export async function bootstrap(): Promise<NestExpressApplication> {
  initializeTransactionalContext()
  const customLoggerService = new CustomLoggerService()
  const isLocal = (process.env.NODE_ENV as TEnv) === 'local'
  const applicationOptions: NestApplicationOptions = {
    cors: true,
    ...(isLocal
      ? {}
      : {
          logger: WinstonModule.createLogger(customLoggerService.createLoggerConfig),
        }),
  }
  const app = await NestFactory.create<NestExpressApplication>(AppModule, applicationOptions)
  app.setGlobalPrefix('/api')
  app.use(helmet())
  app.use(morgan('short'))
  app.use(compression())

  app.enableVersioning({ type: VersioningType.URI })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      dismissDefaultMessages: false,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  )
  const httpAdapter = app.getHttpAdapter()
  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapter),
    new BadRequestExceptionFilter(httpAdapter),
  )

  setupSwagger(app)

  await app.listen(process.env.APP_PORT ?? 3000)

  const swaggerPath = process.env.SWAGGER_PATH ?? 'docs'
  console.info(`Server running on         ${await app.getUrl()}`)
  console.info(`Documentation running on  ${await app.getUrl()}/${swaggerPath}`)

  return app
}

void bootstrap()
