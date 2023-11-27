import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { userRegisterUseCase } from '@/services/userRegisterUseCase'

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
    await userRegisterUseCase({
      name,
      email,
      password,
    })
  } catch (error) {
    return response.status(409).send()
  }

  return response.status(201).send()
}
