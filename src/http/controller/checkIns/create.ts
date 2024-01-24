import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/services/factories/makeCheckInUseCase'

export const createController = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const createCheckInsParamsSchema = z.object({
    gymId: z.string().uuid(),
  })
  const createCheckInsBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInsParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInsBodySchema.parse(request.body)

  const createGymUseCase = makeCheckInUseCase()
  await createGymUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return response.status(201).send()
}
