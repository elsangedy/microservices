import { NestFactory, FastifyAdapter } from '@nestjs/core'

import * as helmet from 'helmet'
import * as compression from 'compression'

import { AppModule } from './app.module'

async function bootstrap() {
  // app
  const app = await NestFactory.create(AppModule, new FastifyAdapter())

  // security
  app.use(helmet())

  // performance
  app.use(compression())

  // cors
  app.enableCors()

  // listening
  await app.listen(process.env.APP_PORT || 4000)
}

bootstrap()
