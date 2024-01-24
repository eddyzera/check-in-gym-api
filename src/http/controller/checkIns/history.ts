import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsHistoryUseCase } from '@/services/factories/makeFetchUserCheckInsHistoryUseCase'

export const historyController = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })
  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()
  const { checkIns } = await fetchCheckInsHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return response.status(200).send({
    checkIns,
  })
}
