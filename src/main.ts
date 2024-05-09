import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import { WinstonModule } from 'nest-winston'

import { AppModule } from './app.module'
import { CustomLoggerService } from './core/custom-logger'

config()

async function bootstrap() {
  const customLoggerService = new CustomLoggerService()
  const isDevelopment = process.env.NODE_ENV !== 'development'
  const applicationOptions = {
    ...(isDevelopment ? { logger: WinstonModule.createLogger(customLoggerService.createLoggerConfig) } : {}),
  }

  const app = await NestFactory.create(AppModule, applicationOptions)

  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}
bootstrap()
