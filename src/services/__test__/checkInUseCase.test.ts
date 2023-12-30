import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { Decimal } from '@prisma/client/runtime/library'
import { CheckInUseCase } from '../checkInUseCase'
import { InMemoryCheckInRepository } from '@/test/inMemoryDataBase/inMemoryCheckInRepository'
import { InMemoryGymsRepository } from '@/test/inMemoryDataBase/InMemoryGymsRepository'
import { MaxDistanceError } from '../errors/maxDistanceErrors'
import { ResourceNotFoundError } from '../errors/resourceNotFoundError'

let checkInRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('User Register Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)
    vi.useFakeTimers()

    await gymsRepository.create({
      id: 'gym-01',
      title: 'gym-title',
      description: 'gym-description',
      latitude: -23.5411998,
      longitude: -46.1637413,
      phone: 'gym-phone',
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5411998,
      userLongitude: -46.1637413,
    })

    console.log(`check in => ,`, checkIn.created_at)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in in twice on the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5411998,
      userLongitude: -46.1637413,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.5411998,
        userLongitude: -46.1637413,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5411998,
      userLongitude: -46.1637413,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5411998,
      userLongitude: -46.1637413,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'gym-title',
      description: 'gym-description',
      latitude: new Decimal(-23.5213529),
      longitude: new Decimal(-46.1900059),
      phone: 'gym-phone',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -23.5411998,
        userLongitude: -46.1637413,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })

  it('should not be able if there is no gym', async () => {
    await expect(() =>
      sut.execute({
        gymId: 'gym-03',
        userId: 'user-01',
        userLatitude: -23.5411998,
        userLongitude: -46.1637413,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
