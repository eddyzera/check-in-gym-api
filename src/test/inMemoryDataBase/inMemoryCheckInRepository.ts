import { randomUUID } from 'node:crypto'
import { CheckInRepositories } from '@/repositories/types/checkInRepositories'
import { CheckIn, Prisma } from '@prisma/client'

export class InMemoryCheckInRepository implements CheckInRepositories {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}
