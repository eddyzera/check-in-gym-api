import request from 'supertest'
import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/test/createAndAuthenticateUser'

describe('Create Gym Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to create gym', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'gym-title',
        description: 'gym-description',
        latitude: -23.5213529,
        longitude: -46.1900059,
        phone: '11999999999',
      })
    expect(response.statusCode).toEqual(201)
  })
})
