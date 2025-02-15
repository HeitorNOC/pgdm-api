// Importing necessary libraries and files
import Elysia, { Static, t } from 'elysia';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { env } from '@/env';
import { UnauthorizedError } from './routes/errors/unauthorized-error';
import { db } from '@/db/connection';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema';

async function getUserByEmail(email: string) {
    return await db.query.users.findFirst({
        where: eq(users.email, email)
    })
}

async function verifyPassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword);
}

export const login = new Elysia()
    .post('/login', async (request: any) => {
        const { email, password } = request.body;

        const user = await getUserByEmail(email);
        if (!user || !(await verifyPassword(password, user.passwordHash))) {
            throw new UnauthorizedError();
        }

        const jwtPayload = { sub: user.id, email: user.email, userType: user.userType };
        const token = sign(jwtPayload, env.JWT_SECRET_KEY, { expiresIn: '1h' });
        request.set.status = 200;
        return { token }; 
    })
    .error({ UNAUTHORIZED: UnauthorizedError })
    .onError(({ error, set }) => {
        set.status = 401;
        return { message: error.message };
    });
