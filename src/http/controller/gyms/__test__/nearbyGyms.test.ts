import request from 'supertest'
import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/test/createAndAuthenticateUser'

describe('Nearby Gyms Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to search gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'gym-title-01',
        description: 'gym-description',
        latitude: -23.5213529,
        longitude: -46.1900059,
        phone: '11999999999',
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'gym-title-02',
        description: 'gym-description',
        latitude: -23.6060672,
        longitude: -46.6223104,
        phone: '11999999999',
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -23.5213529,
        longitude: -46.1900059,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'gym-title-01',
      }),
    ])
  })
})
