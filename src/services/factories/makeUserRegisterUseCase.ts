import { PrismaUsersRepository } from '@/repositories/prismaUsersRepository'
import { UserRegisterUseCase } from '../userRegisterUseCase'

export const makeUserRegisterUseCase = () => {
  const userRepository = new PrismaUsersRepository()
  const userRegisterUseCase = new UserRegisterUseCase(userRepository)

  return userRegisterUseCase
}
