import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prismaUsersRepository'

interface UserRegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class UserRegisterUseCase {
  constructor(private userRepository: any) {}

  async execute({ name, email, password }: UserRegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    await this.userRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
