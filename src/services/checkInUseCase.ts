import { UserRepositories } from '@/repositories/types/userRepositories'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'
import { compare } from 'bcryptjs'
import { CheckIn } from '@prisma/client'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}
interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private usersRepository: UserRepositories) {}

  async execute({
    email,
    password,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
