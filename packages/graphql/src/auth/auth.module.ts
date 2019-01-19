import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { JwtStrategyService } from './jwt-strategy.service'

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secretOrPrivateKey: process.env.APP_SECRET
    })
  ],
  providers: [JwtStrategyService, AuthService, AuthResolver],
  exports: [AuthResolver]
})
export class AuthModule {}
