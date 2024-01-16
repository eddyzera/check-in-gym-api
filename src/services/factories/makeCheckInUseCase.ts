import { CheckInUseCase } from '../checkInUseCase'
import { PrismaCheckInsRepository } from '@/repositories/prismaCheckInsRepository'
import { PrismaGymsRepository } from '@/repositories/prismaGymsRepository'

export const makeCheckInUseCase = () => {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(
    prismaCheckInsRepository,
    prismaGymsRepository,
  )

  return useCase
}
