import { InvalidCredentialsError } from './errors/invalidCredentialsError'
import { compare } from 'bcryptjs'
import { CheckIn } from '@prisma/client'
import { CheckInRepositories } from '@/repositories/types/checkInRepositories'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}
interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInRepository: CheckInRepositories) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
