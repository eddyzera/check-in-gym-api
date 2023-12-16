import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/services/errors/invalidCredentialsError'
import { makeAuthenticateUseCase } from '@/services/factories/makeAuthenticateUseCase'

export const authenticate = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return response.status(400).send({ message: error.message })
    }

    throw error

    // return response.status(500).send()
  }

  return response.status(200).send()
}
