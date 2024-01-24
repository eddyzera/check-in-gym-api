import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middleware/verifyJWT'
import { createController } from './create'
import { validateController } from './validate'
import { historyController } from './history'
import { metricsController } from './metrics'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.get('/check-in/history', historyController)
  app.get('/check-in/metrics', metricsController)

  app.post('/gyms/:gymId/check-ins', createController)
  app.patch('/check-ins/:checkInId/validate', validateController)
}
