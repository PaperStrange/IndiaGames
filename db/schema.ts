import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const notebooks = sqliteTable('notebooks', { owner: text('owner').primaryKey(), content: text('content').notNull(), updatedAt: integer('updated_at').notNull() });
export const documents = sqliteTable('documents', { id: text('id').primaryKey(), owner: text('owner').notNull(), name: text('name').notNull(), createdAt: integer('created_at').notNull() });
export const companionLimits = sqliteTable('companion_limits', { owner: text('owner').primaryKey(), windowStart: integer('window_start').notNull(), count: integer('count').notNull() });
