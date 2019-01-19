import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      tracing: false,
      cacheControl: false,
      playground: true,
      // installSubscriptionHandlers: true,
      typePaths: [process.env.NODE_ENV === 'production' ? 'schema.graphql' : 'src/schema.graphql'],
      definitions:
        process.env.NODE_ENV === 'production'
          ? null
          : {
              path: 'src/schema.ts',
              outputAs: 'class'
            },
      context: ({ req }) => ({ req })
    }),
    AuthModule
  ]
})
export class AppModule {}
