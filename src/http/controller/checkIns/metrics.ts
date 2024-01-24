import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/services/factories/makeGetUserMetricsUseCase'

export const metricsController = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()
  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  })

  return response.status(200).send({
    checkInsCount,
  })
}
