// circuitSteps.ts
import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, integer, real, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { circuits } from './circuits';

export const circuitSteps = pgTable('circuit_steps', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  circuitId: text('circuit_id')
    .references(() => circuits.id, { onDelete: 'cascade' })
    .notNull(),
  
  order: integer('order').notNull(),
  duration: real('duration').notNull(),
  restTime: real('rest_time').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const circuitStepsRelations = relations(circuitSteps, ({ one }) => ({
  circuit: one(circuits, {
    fields: [circuitSteps.circuitId],
    references: [circuits.id],
  })
}));
