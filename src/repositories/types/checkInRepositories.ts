import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepositories {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
