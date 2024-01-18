import { FastifyInstance } from 'fastify'
import { registerController } from '@/http/controller/register'
import { authenticate } from '@/http/controller/authenticate'
import { profile } from './controller/profile'
import { verifyJWT } from './middleware/verifyJwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticate)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
