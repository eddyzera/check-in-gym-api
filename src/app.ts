import fastify from 'fastify'
import { ZodError } from 'zod'
import { usersRoutes } from '@/http/controller/users/routes'
import { gymsRoutes } from '@/http/controller/gyms/routes'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { checkInsRoutes } from './http/controller/checkIns/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _, response) => {
  if (error instanceof ZodError) {
    return response
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: here we should log to an external tool like DataDog
  }

  return response.status(500).send({ message: 'Internal Server Error' })
})
