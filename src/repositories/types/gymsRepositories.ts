import { Gym } from '@prisma/client'

export interface GymsRepositories {
  findById(gymId: string): Promise<Gym | null>
}
