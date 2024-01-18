import request from 'supertest'
import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'

describe('Profile Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'Jonh Doe',
      email: 'jonh.doe@gmail.com',
      password: '12345678',
    })
    const authResponse = await request(app.server).post('/sessions').send({
      email: 'jonh.doe@gmail.com',
      password: '12345678',
    })

    const { token } = authResponse.body
    const profileResponse = await await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'jonh.doe@gmail.com',
      }),
    )
  })
})
