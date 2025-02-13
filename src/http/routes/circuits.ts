import Elysia from 'elysia'
import { db } from '@/db/connection'
import { desc } from 'drizzle-orm'
import { circuits } from '@/db/schema'


export const getCircuits = new Elysia().get('/listCircuits', async () => {
  try {
    const circuitsList = await db
      .select({
        id: circuits.id,
        name: circuits.name,
        description: circuits.description,
        duration: circuits.duration,
        imageURL: circuits.imageUrl,
        createdAt: circuits.createdAt,
      })
      .from(circuits)
      .orderBy(desc(circuits.createdAt))
      .limit(10)

    return circuitsList
  } catch (err) {
    console.log(err)
  }
})
