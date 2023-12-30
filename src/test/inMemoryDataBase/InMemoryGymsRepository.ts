import { GymsRepositories } from '@/repositories/types/gymsRepositories'
import { Gym } from '@prisma/client'

export class InMemoryUsersRepository implements GymsRepositories {
  public items: Gym[] = []

  async findById(gymId: string) {
    const user = this.items.find((item) => item.id === gymId)

    if (!user) {
      return null
    }

    return user
  }
}
