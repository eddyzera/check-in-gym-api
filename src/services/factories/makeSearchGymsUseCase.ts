import { PrismaGymsRepository } from '@/repositories/prismaGymsRepository'
import { SearchGymsUseCase } from '../searchGymsUseCase'

export const makeSearchGymUseCase = () => {
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(prismaGymsRepository)

  return useCase
}
