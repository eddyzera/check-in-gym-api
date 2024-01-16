import { CheckIn } from '@prisma/client'
import { CheckInRepositories } from '@/repositories/types/checkInRepositories'

interface FetchMembersCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}
interface FetchMembersCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchMembersCheckInsHistoryUseCase {
  constructor(private checkInRepository: CheckInRepositories) {}

  async execute({
    userId,
    page,
  }: FetchMembersCheckInsHistoryUseCaseRequest): Promise<FetchMembersCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return {
      checkIns,
    }
  }
}
