import { randomUUID } from 'node:crypto'
import { GymsRepositories } from '@/repositories/types/gymsRepositories'
import { Gym, Prisma } from '@prisma/client'
import { getDistanceBetweenCoordinate } from '@/utils/getDistanceBetweenCoordinate'

export class InMemoryGymsRepository implements GymsRepositories {
  public items: Gym[] = []

  async findById(gymId: string) {
    const user = this.items.find((item) => item.id === gymId)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }

  async searchManyByTitle(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearBy(params: { latitude: number; longitude: number }) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinate(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }
}
