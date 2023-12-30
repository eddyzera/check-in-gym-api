import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from '../createGymsUseCase'
import { InMemoryGymsRepository } from '@/test/inMemoryDataBase/InMemoryGymsRepository'
import { compare } from 'bcryptjs'
let userRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Gym Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(userRepository)
  })
  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'gym-title',
      description: null,
      latitude: -23.5213529,
      longitude: -46.1900059,
      phone: null,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
