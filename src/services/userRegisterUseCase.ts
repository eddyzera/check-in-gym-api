import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

interface UserRegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function userRegisterUseCase({
  name,
  email,
  password,
}: UserRegisterUseCaseRequest) {
  const passwordHash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: passwordHash,
    },
  })
}
