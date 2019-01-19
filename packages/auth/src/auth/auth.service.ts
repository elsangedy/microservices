import { Injectable, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { hash, compare } from 'bcrypt'

import { User, AuthPayload, JwtPayload } from '@microservices/common/dist/contracts'

import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly prismaService: PrismaService) {}

  public async user(id: string): Promise<User> {
    return await this.prismaService.prisma.user({
      id
    })
  }

  public async signin(email: string, password: string): Promise<AuthPayload> {
    const user = await this.prismaService.prisma.user({
      email
    })

    if (!user) {
      throw new BadRequestException('Email or password invalid')
    }

    const checkPassword = await compare(password, user.password)

    if (!checkPassword) {
      throw new BadRequestException('Email or password invalid')
    }

    return await this.createToken(user)
  }

  public async signup(name: string, email: string, password: string): Promise<AuthPayload> {
    const exists = await this.prismaService.prisma.$exists.user({
      email
    })

    if (exists) {
      throw new BadRequestException('Email already exists')
    }

    const passwordHash = await hash(password, 10)

    const user = await this.prismaService.prisma.createUser({
      name,
      email,
      password: passwordHash
    })

    return await this.createToken(user)
  }

  async createToken(user: User): Promise<AuthPayload> {
    const token = await this.jwtService.sign({
      userId: user.id
    })

    return {
      token,
      user
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.prismaService.prisma.user({
      id: payload.userId
    })
  }
}
