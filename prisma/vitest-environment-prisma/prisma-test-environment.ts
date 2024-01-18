import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest'

// postgresql://docker:docker@localhost:5432/gym-api?schema=public

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
    console.log(`generateDataBaseURL =>`, generateDataBaseURL(schema))

    return {
      async teardown() {
        console.log('Teardown')
      },
    }
  },
})
