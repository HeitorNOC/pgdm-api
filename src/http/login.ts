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
        console.log("📩 Corpo da requisição:", request.body);

        const { email, password } = request.body;

        console.log("🔍 Buscando usuário no banco de dados...");
        const user = await getUserByEmail(email);
        console.log("👤 Usuário encontrado:", user ? user.email : "Nenhum usuário encontrado");

        if (!user) {
            console.log("❌ Erro: Usuário não encontrado");
            throw new Error("Usuário não autorizado");

        }

        console.log("🔍 Verificando senha...");
        const isPasswordValid = await verifyPassword(password, user.passwordHash);
        console.log("✅ Senha válida?", isPasswordValid);

        if (!isPasswordValid) {
            console.log("❌ Erro: Senha incorreta");
            throw new Error("Usuário não autorizado");

        }

        console.log("🔐 Gerando token JWT...");
        const jwtPayload = { sub: user.id, email: user.email, userType: user.userType, teacherCode: user.teacherCode };
        const token = sign(jwtPayload, env.JWT_SECRET_KEY, { expiresIn: '1h' });

        console.log("✅ Token gerado com sucesso:", token);

        request.set.status = 200;
        return { token };
    })
    .error({ UNAUTHORIZED: Error })
    .onError(({ error, set }) => {
        console.log("🚨 Erro inesperado:", error.message);
        set.status = 401;
        return { message: error.message };
    });
