import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { PrismaModule } from '../prisma/prisma.module'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategyService } from './jwt-strategy.service'

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secretOrPrivateKey: process.env.APP_SECRET
    }),
    PrismaModule
  ],
  providers: [JwtStrategyService, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
