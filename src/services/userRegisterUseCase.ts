import { hash } from 'bcryptjs'
import { UserRepositories } from '@/repositories/types/userRepositories'
import { UserAlreadyExists } from './errors/userAlreadyExistsError'
import { User } from '@prisma/client'

interface UserRegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface UserRegisterUseCaseResponse {
  user: User
}

export class UserRegisterUseCase {
  constructor(private userRepository: UserRepositories) {}

  async execute({
    name,
    email,
    password,
  }: UserRegisterUseCaseRequest): Promise<UserRegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExists()
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
