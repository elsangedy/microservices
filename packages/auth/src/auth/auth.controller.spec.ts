import { Test, TestingModule } from '@nestjs/testing'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategyService } from './jwt-strategy.service'
import { PrismaService } from '../prisma/prisma.service'

describe('AuthController', () => {
  let controller: AuthController

  beforeAll(async () => {
    process.env.APP_SECRET = 'mysecret'
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({
          defaultStrategy: 'jwt'
        }),
        JwtModule.register({
          secretOrPrivateKey: process.env.APP_SECRET
        })
      ],
      providers: [JwtStrategyService, AuthService, PrismaService],
      controllers: [AuthController]
    }).compile()

    controller = module.get(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
