import { GymsRepositories } from '@/repositories/types/gymsRepositories'
import { Gym } from '@prisma/client'

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymRepository: GymsRepositories) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymRepository.searchManyByTitle(query, page)

    return {
      gyms,
    }
  }
}
