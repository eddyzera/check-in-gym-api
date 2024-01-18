import request from 'supertest'
import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'

describe('Register Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Jonh Doe',
      email: 'jonh.doe@gmail.com',
      password: '12345678',
    })

    expect(response.statusCode).toEqual(201)
  })
})
