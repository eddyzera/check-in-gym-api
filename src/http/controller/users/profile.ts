import { makeGetUserProfileUseCase } from '@/services/factories/makeGetUserProfileUseCase'
import { FastifyRequest, FastifyReply } from 'fastify'

export const profile = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  console.log(`headers =>`, request.headers)
  const getUserProfile = makeGetUserProfileUseCase()
  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })
  return response.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
