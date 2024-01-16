import { Gym, Prisma } from '@prisma/client'

type FindManyNearbyParams = {
  latitude: number
  longitude: number
}

export interface GymsRepositories {
  findById(gymId: string): Promise<Gym | null>
  searchManyByTitle(query: string, page: number): Promise<Gym[]>
  findManyNearBy(params: FindManyNearbyParams): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
