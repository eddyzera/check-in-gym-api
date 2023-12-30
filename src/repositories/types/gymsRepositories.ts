import { Gym } from '@prisma/client'

export interface GymsRepositories {
  findById(userId: string): Promise<Gym | null>
}
