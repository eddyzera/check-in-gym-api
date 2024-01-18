import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest'

// postgresql://docker:docker@localhost:5432/gym-api?schema=public

const prisma = new PrismaClient()

function generateDataBaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provider a DATA_BASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>(<unknown>{
  name: 'prisma',
  transformMode: 'web',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDataBaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
})
