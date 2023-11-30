import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { UserRepositories } from './types/userRepositories'

export class PrismaUsersRepository implements UserRepositories {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return userWithSameEmail
  }
}
