import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchGymUseCase } from '@/services/factories/makeSearchGymsUseCase'

export const searchController = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })
  const { query, page } = searchGymsQuerySchema.parse(request.query)

  const searchGymUseCase = makeSearchGymUseCase()
  const { gyms } = await searchGymUseCase.execute({
    query,
    page,
  })

  return response.status(200).send({
    gyms,
  })
}
