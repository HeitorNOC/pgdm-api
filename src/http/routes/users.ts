import { Elysia, t } from 'elysia'
import { db } from '@/db/connection'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const updateUser = new Elysia().patch(
  '/users/update',
  async ({ body, set }) => {
    try {
      const { id, email, phone, username } = body

      const updatedUser = await db
        .update(users)
        .set({ email, phone, username })
        .where(eq(users.id, id))
        .returning()

      if (updatedUser.length === 0) {
        set.status = 404
        return { error: 'Usuário não encontrado' }
      }

      return updatedUser[0]
    } catch (err) {
      console.log(err)
      set.status = 500
      return { error: 'Erro ao atualizar usuário' }
    }
  },
  {
    body: t.Object({
      id: t.Numeric(),
      email: t.String(),
      phone: t.Optional(t.String()),
      username: t.String(),
    }),
  },
)

export const updateUserTeacherCode = new Elysia().patch(
  '/users/teacherCode',
  async ({ body, set }) => {
    try {
      const { id, teacherCode } = body

      const updatedUser = await db
        .update(users)
        .set({ teacherCode })
        .where(eq(users.id, id))
        .returning()

      if (updatedUser.length === 0) {
        set.status = 404
        return { error: 'Usuário não encontrado' }
      }

      return updatedUser[0]
    } catch (err) {
      console.log(err)
      set.status = 500
      return { error: 'Erro ao atualizar teacherCode' }
    }
  },
  {
    body: t.Object({
      id: t.Numeric(),
      teacherCode: t.String(),
    }),
  },
)

export const getUser = new Elysia().post(
  '/user',
  async ({ body, set }) => {
    try {
      const { id } = body

      const updatedUser = await db
        .select()
        .from(users)
        .where(eq(users.id, id))

      if (updatedUser.length === 0) {
        set.status = 404
        return { error: 'Usuário não encontrado' }
      }

      return updatedUser[0]
    } catch (err) {
      console.log(err)
      set.status = 500
      return { error: 'Erro ao atualizar teacherCode' }
    }
  },
  {
    body: t.Object({
      id: t.Numeric(),
    }),
  },
)

export const createUser = new Elysia().post(
  '/users',
  async ({ body, set }) => {
    try {
      const { name, email, phone, username, passwordHash, teacherCode, userType } = body

      const newUser = await db
        .insert(users)
        .values({
          name,
          email,
          phone,
          username,
          passwordHash,
          teacherCode,
          userType,
        })
        .returning()

      return newUser[0]
    } catch (err) {
      console.log(err)
      set.status = 500
      return { error: 'Erro ao criar usuário' }
    }
  },
  {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      phone: t.String(),
      username: t.String(),
      passwordHash: t.String(),
      teacherCode: t.Optional(t.String()),
      userType: t.String(),
    }),
  },
)
