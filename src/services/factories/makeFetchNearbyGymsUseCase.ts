import { PrismaGymsRepository } from '@/repositories/prismaGymsRepository'
import { FetchNearbyGyms } from '../fetchNearbyGyms'

export const makeFetchNearbyGymsUseCase = () => {
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGyms(prismaGymsRepository)

  return useCase
}
