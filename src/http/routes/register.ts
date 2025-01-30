import Elysia, { t } from 'elysia';
import bcrypt from 'bcryptjs';
import { db } from '@/db/connection';
import { users } from '@/db/schema';
import { UnauthorizedError } from './errors/unauthorized-error';

const userRegistrationSchema = t.Object({
    name: t.String(),
    email: t.String(),
    password: t.String(),
    username: t.String()
});

export const register = new Elysia().post(
  '/register',
  async ({ body, set }) => {

    const { name, email, password, username } = body;

    const existingUser = await db.query.users.findFirst({
        where(fields, { eq }) {
          return eq(fields.email, email)
        },
      });
    if (existingUser) {
        throw new UnauthorizedError();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.insert(users).values([{ name, email, passwordHash: hashedPassword, username }]);

    set.status = 201; 
  },
  {
    body: userRegistrationSchema 
  }
);
