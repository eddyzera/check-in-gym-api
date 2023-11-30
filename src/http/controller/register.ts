import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserRegisterUseCase } from '@/services/userRegisterUseCase'
import { PrismaUsersRepository } from '@/repositories/prismaUsersRepository'

export const registerController = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const userRegisterUseCase = new UserRegisterUseCase(prismaUsersRepository)
    await userRegisterUseCase.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    return response.status(409).send()
  }

  return response.status(201).send()
}
