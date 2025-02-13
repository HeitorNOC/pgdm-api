import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, real, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { circuitSteps } from './circuitSteps';

export const circuits = pgTable('circuits', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  duration: real('duration').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const circuitsRelations = relations(circuits, ({ many }) => ({
  circuitSteps: many(circuitSteps),
}));