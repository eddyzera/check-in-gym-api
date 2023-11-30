import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class InMemoryUsersRepository {
  public users: any[] = []
  async create(data: Prisma.UserCreateInput) {
    this.users.push()

    return this.users
  }
}
