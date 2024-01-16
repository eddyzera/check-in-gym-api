import { PrismaGymsRepository } from '@/repositories/prismaGymsRepository'
import { FetchNearbyGyms } from '../fetchNearbyGyms'

export const makeNearbyGymsUseCase = () => {
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGyms(prismaGymsRepository)

  return useCase
}
