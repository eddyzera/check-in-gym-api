import { expect, describe, it, beforeEach } from 'vitest'
import { GetUserMetricsUseCase } from '../getUserMetricsUseCase'
import { InMemoryCheckInRepository } from '@/test/inMemoryDataBase/inMemoryCheckInRepository'

let checkInRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)
  })
  it('should be able to get check-ins count from metrics ', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })
    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkInsCount).toEqual(2)
  })
})
