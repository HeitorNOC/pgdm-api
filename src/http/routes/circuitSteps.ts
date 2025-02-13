import Elysia, { t } from 'elysia'
import { db } from '@/db/connection'
import { eq } from 'drizzle-orm';
import { circuitSteps } from '@/db/schema';

export const getCircuitSteps = new Elysia().get('/circuitSteps/:circuitId', async ({ params }) => {
  try {
    const circuitStepsList = await db
      .select({
        id: circuitSteps.id,
        circuitId: circuitSteps.circuitId,
        name: circuitSteps.name,
        order: circuitSteps.order,
        duration: circuitSteps.duration,
        restTime: circuitSteps.restTime,
        imageUrl: circuitSteps.imageUrl,
        createdAt: circuitSteps.createdAt,
      })
      .from(circuitSteps)
      .where(eq(circuitSteps.circuitId, params.circuitId))
      .orderBy(circuitSteps.order)
      .limit(10)

    return circuitStepsList
  } catch (err) {
    console.log(err)
  }
})