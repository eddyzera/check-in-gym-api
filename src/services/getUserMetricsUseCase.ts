import { CheckInRepositories } from '@/repositories/types/checkInRepositories'

interface GetUserMetricsUseCaseRequest {
  userId: string
  page: number
}
interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckInRepositories) {}

  async execute({
    userId,
    page,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
