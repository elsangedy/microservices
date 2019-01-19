import { Injectable } from '@nestjs/common'
import { Client, ClientProxy, Transport } from '@nestjs/microservices'

import { Commands } from '@microservices/common/dist/commands'

import { FindById, SigninInput, SignupInput, User, AuthPayload } from '@microservices/common/dist/contracts'

@Injectable()
export class AuthService {
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: process.env.RABBITMQ_QUEUE,
      queueOptions: {
        durable: false
      }
    }
  })
  client: ClientProxy

  public async me(data: FindById): Promise<User> {
    return await this.client.send<User, FindById>(Commands.userById, data).toPromise()
  }

  public async signin(data: SigninInput): Promise<AuthPayload> {
    return await this.client.send<AuthPayload, SigninInput>(Commands.signin, data).toPromise()
  }

  public async signup(data: SignupInput): Promise<AuthPayload> {
    return await this.client.send<AuthPayload, SignupInput>(Commands.signup, data).toPromise()
  }
}
