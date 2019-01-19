import { NestFactory, FastifyAdapter } from '@nestjs/core'
import { Transport } from '@nestjs/common/enums/transport.enum'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import * as helmet from 'helmet'
import * as compression from 'compression'

import { AppModule } from './app.module'

async function bootstrap() {
  // app
  const app = await NestFactory.create(AppModule, new FastifyAdapter())

  // microservice
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: process.env.RABBITMQ_QUEUE,
      queueOptions: {
        durable: false
      }
    }
  })

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Auth microservice')
    .setDescription('Auth microservice API description')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, swaggerOptions)

  SwaggerModule.setup('/', app, document)

  // security
  app.use(helmet())

  // performance
  app.use(compression())

  // cors
  app.enableCors()

  // listening
  await app.startAllMicroservicesAsync()

  await app.listen(process.env.APP_PORT || 4001)
}

bootstrap()
