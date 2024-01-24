import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInUseCase } from '@/services/factories/makeValidateCheckInUseCase'

export const validateController = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()
  await validateCheckInUseCase.execute({
    checkInId,
  })

  return response.status(204).send()
}
