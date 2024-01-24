import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/services/factories/makeCreateGymUseCase'

export const createController = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const createBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })
  const { title, description, phone, latitude, longitude } =
    createBodySchema.parse(request.body)

  const createGymUseCase = makeCreateGymUseCase()
  await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  return response.status(201).send()
}
