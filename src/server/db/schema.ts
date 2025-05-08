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

/**
 * RAG
 */

/**
 * 保存下来的文档资源
 */
export const resources = createTable(
  "resource",
  (d) => ({
    id: d.uuid().primaryKey().notNull().defaultRandom(),
    content: d.text().notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("resource_created_at_idx").on(t.createdAt)],
);

/**
 * Embeddings
 */
export const embeddings = createTable(
  "embedding",
  (d) => ({
    id: d.uuid().primaryKey().notNull().defaultRandom(),
    resourceId: d
      .uuid()
      .references(() => resources.id, { onDelete: "cascade" }),
    content: d.text().notNull(),
    // pgVector plugin must be installed to use vector type
    // Guide: https://orm.drizzle.team/docs/guides/vector-similarity-search or https://github.com/pgvector/pgvector
    // It works for me with Postgres Container which is built with
    // scripts of ./start-database.sh, runing at powershell on Windows 11:
    // 1. open container terminal, or open by local terminal: `docker exec -it [DB_CONTAINER_NAME] bash`
    // 2. install postgre and tools: `apt-get update && apt-get install -y postgresql-17-pgvector && apt-get install postgresql-server-dev-17 && apt-get install -y git && apt-get install -y build-essential && apt-get install -y make`
    // 3. install pgvector: `git clone https://github.com/pgvector/pgvector.git && cd pgvector && make && make install`
    // 4. open drizzle-studio: `pnpm db:studio`
    // 5. open SQL console, and run following scripts:
    // - install pgvector extension: `CREATE EXTENSION IF NOT EXISTS vector;`
    // - check pgvector: `SELECT * FROM pg_extension WHERE extname = 'vector';`
    embedding: d.vector({ dimensions: 1536 }).notNull(),
  }),
  (t) => [
    // index using hnsw, for faster similarity search
    // https://github.com/pgvector/pgvector?tab=readme-ov-file#hnsw
    index("embedding_idx").using("hnsw", t.embedding.op("vector_cosine_ops")),
    foreignKey({
      columns: [t.resourceId],
      foreignColumns: [resources.id],
      name: "embedding_resource_id_fk",
    }).onDelete("cascade"),
  ],
);
