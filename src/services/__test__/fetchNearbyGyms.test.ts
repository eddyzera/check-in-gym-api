import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGyms } from '../fetchNearbyGyms'
import { InMemoryGymsRepository } from '@/test/inMemoryDataBase/InMemoryGymsRepository'

let gymRepository: InMemoryGymsRepository
let sut: FetchNearbyGyms

// -23.5216581
// -46.2012426

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGyms(gymRepository)
  })
  it('should be able to fetch nearby gyms', async () => {
    await gymRepository.create({
      title: 'title-01',
      description: null,
      latitude: -23.5213529,
      longitude: -46.1900059,
      phone: null,
    })

    await gymRepository.create({
      title: 'title-02',
      description: null,
      latitude: -23.5235696,
      longitude: -46.1926263,
      phone: null,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.5213529,
      userLongitude: -46.1900059,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'title-01' }),
      expect.objectContaining({ title: 'title-02' }),
    ])
  })
})
