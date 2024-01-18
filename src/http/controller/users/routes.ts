import { FastifyInstance } from 'fastify'
import { registerController } from '@/http/controller/users/register'
import { authenticate } from '@/http/controller/users/authenticate'
import { profile } from './profile'
import { verifyJWT } from '../../middleware/verifyJWT'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticate)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
