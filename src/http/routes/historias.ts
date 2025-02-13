import Elysia, { t } from 'elysia'
import { db } from '@/db/connection'
import { ilike, desc, sql } from 'drizzle-orm'
import { historias } from '@/db/schema'

export const getHistories = new Elysia().get('/listHistories', async () => {
  try {
    const historiesList = await db
      .select({
        id: historias.id,
        name: historias.name,
        description: historias.description,
        imageUrl: historias.imageUrl,
        createdAt: historias.createdAt,
      })
      .from(historias)
      .orderBy(desc(historias.createdAt))
      .limit(10)

    return historiesList
  } catch (err) {
    console.log(err)
  }
})