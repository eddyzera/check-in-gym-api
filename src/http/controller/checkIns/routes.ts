import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middleware/verifyJWT'
import { createController } from './create'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/gyms/:gymId/check-ins', createController)
}
