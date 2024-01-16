import { PrismaUsersRepository } from '@/repositories/prismaUsersRepository'
import { GetUserProfileUseCase } from '../getUserProfileUseCase'

export const makeGetUserProfileUseCase = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(prismaUsersRepository)

  return useCase
}
