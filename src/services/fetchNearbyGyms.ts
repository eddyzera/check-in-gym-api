import { GymsRepositories } from '@/repositories/types/gymsRepositories'
import { Gym } from '@prisma/client'

interface FetchNearbyGymsRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsResponse {
  gyms: Gym[]
}

export class FetchNearbyGyms {
  constructor(private gymRepository: GymsRepositories) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsRequest): Promise<FetchNearbyGymsResponse> {
    const gyms = await this.gymRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
