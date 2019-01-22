import { Test, TestingModule } from '@nestjs/testing'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { PrismaService } from '../prisma/prisma.service'
import { AuthService } from './auth.service'
import { JwtStrategyService } from './jwt-strategy.service'

describe('AuthService', () => {
  let service: AuthService

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
      providers: [AuthService, JwtStrategyService, PrismaService]
    }).compile()

    service = module.get(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
