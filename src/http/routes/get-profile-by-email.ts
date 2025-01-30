import Elysia from 'elysia'
import { authentication } from '../authentication'
import { db } from '@/db/connection'

export const getProfileByEmail = new Elysia()
  .use(authentication)
  .get('/get-user-by-email', async ({ getUserByEmail }) => {
    const email = await getUserByEmail()

    const user = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, email)
      },
    })

    if (!user) {
      throw new Error('User not found.')
    }

    return user
  })
