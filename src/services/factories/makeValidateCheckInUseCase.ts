import { PrismaCheckInsRepository } from '@/repositories/prismaCheckInsRepository'
import { ValidateCheckInUseCase } from '../validateCheckIns'

export const makeValidateCheckInUseCase = () => {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(prismaCheckInsRepository)

  return useCase
}
