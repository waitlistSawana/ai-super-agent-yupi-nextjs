// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { foreignKey, index, pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `ai-super-agent-yupi-nextjs_${name}`,
);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("post_name_idx").on(t.name)],
);

/**
 * User Table Schema
 */
// export const users = createTable(
//   "user",
//   (d) => ({
//     id: d.uuid().primaryKey().notNull().defaultRandom(),
//     createdAt: d
//       .timestamp({ withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
//   }),
//   (t) => [index("created_at_idx").on(t.createdAt)],
// );

export const chats = createTable(
  "chat",
  (d) => ({
    id: d.uuid().primaryKey().notNull().defaultRandom(),
    title: d.text().notNull().default("Untitiled Chat"),
    visibility: d
      .varchar({ enum: ["public", "private"] })
      .notNull()
      .default("private"),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("chat_created_at_idx").on(t.createdAt)],
);

export const messages = createTable(
  "message",
  (d) => ({
    id: d.varchar({ length: 64 }).primaryKey().notNull(),
    chatId: d.uuid().notNull(),
    role: d.varchar().notNull(),
    content: d.text().notNull(),
    parts: d.json().notNull(),
    attachments: d.json(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }),
  (t) => [
    index("message_created_at_idx").on(t.createdAt),
    foreignKey({
      columns: [t.chatId],
      foreignColumns: [chats.id],
      name: "message_chat_id_fk",
    }),
  ],
);
