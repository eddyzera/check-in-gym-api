import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsUseCase } from '../searchGymsUseCase'
import { InMemoryGymsRepository } from '@/test/inMemoryDataBase/InMemoryGymsRepository'

let gymRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gym Use Case', () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymRepository)
  })
  it('should be able to search for gyms', async () => {
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
      latitude: -23.5213529,
      longitude: -46.1900059,
      phone: null,
    })

    const { gyms } = await sut.execute({
      query: 'title-01',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'title-01' })])
  })

  it('should be able to fetch paginate check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `title gym ${i}`,
        description: null,
        latitude: -23.5213529,
        longitude: -46.1900059,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({
      query: 'title',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'title gym 21' }),
      expect.objectContaining({ title: 'title gym 22' }),
    ])
  })
})
