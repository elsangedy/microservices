import { Query, Mutation, Resolver, Args, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { SigninInput, SignupInput, User, AuthPayload } from '@microservices/common/dist/contracts'

import { Context as ContextInterface } from '../contracts'
import { GqlAuthGuard } from '../guards/graphql-auth.guard'
import { AuthService } from './auth.service'

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query()
  @UseGuards(new GqlAuthGuard())
  public async me(@Context() ctx: ContextInterface): Promise<User> {
    return this.authService.me({
      id: ctx.req.user.userId
    })
  }

  @Mutation()
  public async signin(@Args('data') data: SigninInput): Promise<AuthPayload> {
    return this.authService.signin(data)
  }

  @Mutation()
  public async signup(@Args('data') data: SignupInput): Promise<AuthPayload> {
    return this.authService.signup(data)
  }
}
