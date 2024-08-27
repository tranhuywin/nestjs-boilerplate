import type { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder().setTitle('API').addBearerAuth()

  const swaggerPath = process.env.SWAGGER_PATH ?? 'docs'
  const document = SwaggerModule.createDocument(app, documentBuilder.build())
  SwaggerModule.setup(swaggerPath, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
}
