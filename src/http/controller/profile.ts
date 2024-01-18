import { FastifyRequest, FastifyReply } from 'fastify'

export const profile = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  return response.status(200).send()
}
