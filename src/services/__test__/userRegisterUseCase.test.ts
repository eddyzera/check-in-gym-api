import { expect, describe, it, beforeEach } from 'vitest'
import { UserRegisterUseCase } from '../userRegisterUseCase'
import { InMemoryUsersRepository } from '@/test/inMemoryDataBase/inMemoryUsersRepository'
import { compare } from 'bcryptjs'
import { UserAlreadyExists } from '../errors/userAlreadyExistsError'

let userRepository: InMemoryUsersRepository
let sut: UserRegisterUseCase

describe('User Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new UserRegisterUseCase(userRepository)
  })
  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Jonh Doe',
      email: 'jonh_doe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'jonh_doe@example.com'

    await sut.execute({
      name: 'Jonh Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Jonh Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExists)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Jonh Doe',
      email: 'jonh_doe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
