import { FetchMembersCheckInsHistoryUseCase } from '../fetchMembersCheckInsHistoryUseCase'
import { PrismaCheckInsRepository } from '@/repositories/prismaCheckInsRepository'

export const makeFetchUserCheckInsHistoryUseCase = () => {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchMembersCheckInsHistoryUseCase(
    prismaCheckInsRepository,
  )

  return useCase
}
