import Elysia, { t } from 'elysia'
import { db } from '@/db/connection'
import { ilike, desc, sql } from 'drizzle-orm'
import { steps } from '@/db/schema'

export const getSteps = new Elysia().get('/listSteps', async () => {
  try {
    const stepsList = await db
      .select({
        id: steps.id,
        name: steps.name,
        description: steps.description,
        imageUrl: steps.imageUrl,
        videoUrl: steps.videoUrl,
        createdAt: steps.createdAt,
      })
      .from(steps)
      .orderBy(desc(steps.createdAt))
      .limit(10)

    return stepsList
  } catch (err) {
    console.log(err)
  }
})
