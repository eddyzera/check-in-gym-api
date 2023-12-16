import { PrismaUsersRepository } from '@/repositories/prismaUsersRepository'
import { AuthenticateUseCase } from '../authenticateUseCase'

export const makeAuthenticateUseCase = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

  return authenticateUseCase
}
