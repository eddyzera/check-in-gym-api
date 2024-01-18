import { FastifyInstance } from 'fastify'
import { registerController } from '@/http/controller/users/register'
import { authenticate } from '@/http/controller/users/authenticate'
import { profile } from '@/http/controller/users/profile'
import { verifyJWT } from '../../middleware/verifyJWT'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
}
