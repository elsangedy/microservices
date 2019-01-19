import { Test, TestingModule } from '@nestjs/testing'

import { AuthController } from './auth.controller'

describe('AuthController', () => {
  let controller: AuthController

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController]
    }).compile()

    controller = module.get(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
