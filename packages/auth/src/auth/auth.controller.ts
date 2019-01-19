import { Controller, Req, Post, Get, Body, UseGuards } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger'

import { Commands } from '@microservices/common/dist/commands'
import { SigninInput, SignupInput, FindById, User, AuthPayload } from '@microservices/common/dist/contracts'

import { ContextRequest } from '../contracts'

import { AuthService } from './auth.service'

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Logged user data' })
  @ApiResponse({ status: 401, description: 'Not authorized' })
  @Get('me')
  @UseGuards(AuthGuard())
  public async me(@Req() req: ContextRequest): Promise<User> {
    return await this.user({
      id: req.user.userId
    })
  }

  @MessagePattern(Commands.userById)
  public async user(@Body() data: FindById): Promise<User> {
    return await this.authService.user(data.id)
  }

  @ApiOperation({ title: 'Signin' })
  @ApiResponse({ status: 200, description: 'Signin success' })
  @ApiResponse({ status: 400, description: 'Invalid fields' })
  @Post('signin')
  @MessagePattern(Commands.signin)
  public async signin(@Body() data: SigninInput): Promise<AuthPayload> {
    return await this.authService.signin(data.email, data.password)
  }

  @Post('signup')
  @MessagePattern(Commands.signup)
  public async signup(@Body() data: SignupInput): Promise<AuthPayload> {
    return await this.authService.signup(data.name, data.email, data.password)
  }
}
