import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/test/inMemoryDataBase/inMemoryUsersRepository'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from '../authenticateUseCase'
import { InvalidCredentialsError } from '../errors/invalidCredentialsError'

let userRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate UseCase', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(userRepository)
  })
  it('should be able to authenticate', async () => {
    await userRepository.create({
      name: 'Jonh Doe',
      email: 'jonh_doe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'jonh_doe@example.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'jonh_doe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      name: 'Jonh Doe',
      email: 'jonh_doe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'jonh_doe@example.com',
        password: '123478',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
