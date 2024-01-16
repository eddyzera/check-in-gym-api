import { PrismaGymsRepository } from '@/repositories/prismaGymsRepository'
import { CreateGymUseCase } from '../createGymsUseCase'

export const makeCreateGymUseCase = () => {
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(prismaGymsRepository)

  return useCase
}
