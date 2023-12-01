import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { UserRepositories } from '@/repositories/types/userRepositories'
import { UserAlreadyExists } from './errors/userAlreadyExistsError'

interface UserRegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class UserRegisterUseCase {
  constructor(private userRepository: UserRepositories) {}

  async execute({ name, email, password }: UserRegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExists()
    }

    await this.userRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
