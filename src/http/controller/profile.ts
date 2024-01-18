import { FastifyRequest, FastifyReply } from 'fastify'

export const profile = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  console.log(`headers =>`, request.headers)
  await request.jwtVerify()
  console.log(`user =>`, request.user.sub)
  return response.status(200).send()
}
