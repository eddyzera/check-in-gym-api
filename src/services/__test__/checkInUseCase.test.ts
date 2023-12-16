import { expect, describe, it, beforeEach } from 'vitest'
import { CheckInUseCase } from '../checkInUseCase'
import { InMemoryCheckInRepository } from '@/test/inMemoryDataBase/inMemoryCheckInRepository'

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

describe('User Register Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new CheckInUseCase(checkInRepository)
  })
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in in twice on the same day', async () => {
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
