import { FastifyInstance } from 'fastify'
import { registerController } from '@/http/controller/register'
import { authenticate } from '@/http/controller/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticate)
}
