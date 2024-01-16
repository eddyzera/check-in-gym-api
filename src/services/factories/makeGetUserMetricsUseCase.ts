import { GetUserMetricsUseCase } from '../getUserMetricsUseCase'
import { PrismaCheckInsRepository } from '@/repositories/prismaCheckInsRepository'

export const makeGetUserMetricsUseCase = () => {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const authenticateUseCase = new GetUserMetricsUseCase(
    prismaCheckInsRepository,
  )

  return authenticateUseCase
}
