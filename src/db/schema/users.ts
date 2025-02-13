import { pgTable, text, serial } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    phone: text('phone').notNull(),
    username: text('username').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    teacherCode: text('teacher_code'),
    userType: text('user_type').notNull()
});
