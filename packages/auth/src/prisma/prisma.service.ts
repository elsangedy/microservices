import { Injectable } from '@nestjs/common'

import { Prisma } from './'

@Injectable()
export class PrismaService {
  prisma: Prisma

  constructor() {
    this.prisma = new Prisma()
  }
}
