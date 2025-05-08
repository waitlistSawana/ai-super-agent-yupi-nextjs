/**
 * Rag
 *
 * @see https://ai-sdk.dev/docs/guides/rag-chatbot - RAG Chatbot Guide from AI SDK
 */

import { embed, embedMany } from "ai";
import { dashscope } from "../providers/dashscope";
import { db } from "@/server/db";
import { cosineDistance, gt, desc, sql } from "drizzle-orm";
import { embeddings } from "@/server/db/schema";

/**
 * Generate chunks from input
 *
 * This function will take an input string and split it by periods, filtering out any empty items.
 */
const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split(".")
    .filter((i) => i !== "");
};

export const generateEmbeddings = async (
  value: string,
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = generateChunks(value);
  // Embed the chunks
  const { embeddings, values, usage } = await embedMany({
    model: dashscope.textEmbeddingModel("text-embedding-v2"),
    values: chunks,
    maxRetries: 2,
    // Abort after 15 second
    abortSignal: AbortSignal.timeout(1000 * 15),
  });

  return embeddings.map((e, i) => {
    const c = values[i] ?? chunks[i];

    if (!c) {
      throw new Error("Error: value of embedding is empty, please try again.");
    }

    return {
      content: c,
      embedding: e,
    };
  });
};

/**
 * generate a single embedding from an input string
 */
export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\\n", " ");
  const { embedding } = await embed({
    model: dashscope.textEmbeddingModel("text-embedding-v2"),
    value: input,
  });
  return embedding;
};

/**
 * embeds the user’s query, searches the database for similar items, then returns relevant items
 */
export const findRelevantContent = async (userQuery: string) => {
  const userQueryEmbedding = await generateEmbedding(userQuery);
  console.log({ userQueryEmbedding_source: userQuery });
  // calculate the similarity between the user's query and the embeddings
  // Convert cosine distance to similarity score: 1 minus cosine distance gives a value where higher means more similar (range typically -1 to 1)
  const similarity = sql<number>`1 - (${cosineDistance(
    embeddings.embedding,
    userQueryEmbedding,
  )})`;
  // find similar items with database query
  const similarGuides = await db
    .select({ content: embeddings.content, similarity: similarity })
    .from(embeddings)
    .where(gt(similarity, 0.5))
    .orderBy((t) => desc(t.similarity))
    .limit(4);
  console.log({ similarGuides });
  // if not similar items found, return
  if (similarGuides.length === 0) {
    return [
      {
        content:
          "No relevant content found. Politely inform the user that you are unable to answer the question. (with user's language)",
        similarity: 0,
      },
    ];
  }
  // return items
  return similarGuides;
};

/**
 * Drizzle Schema Example
 */
// export const resources = createTable(
//   "resource",
//   (d) => ({
//     id: d.uuid().primaryKey().notNull().defaultRandom(),
//     content: d.text().notNull(),
//     createdAt: d
//       .timestamp({ withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
//   }),
//   (t) => [index("resource_created_at_idx").on(t.createdAt)],
// );

// export const embeddings = createTable(
//   "embedding",
//   (d) => ({
//     id: d.uuid().primaryKey().notNull().defaultRandom(),
//     resourceId: d
//       .uuid()
//       .references(() => resources.id, { onDelete: "cascade" }),
//     content: d.text().notNull(),
//     // pgVector plugin must be installed to use vector type
//     // Guide: https://orm.drizzle.team/docs/guides/vector-similarity-search or https://github.com/pgvector/pgvector
//     // It works for me with Postgres Container which is built with
//     // scripts of ./start-database.sh, runing at powershell on Windows 11:
//     // 1. open container terminal, or open by local terminal: `docker exec -it [DB_CONTAINER_NAME] bash`
//     // 2. install postgre and tools: `apt-get update && apt-get install -y postgresql-17-pgvector && apt-get install postgresql-server-dev-17 && apt-get install -y git && apt-get install -y build-essential && apt-get install -y make`
//     // 3. install pgvector: `git clone https://github.com/pgvector/pgvector.git && cd pgvector && make && make install`
//     // 4. open drizzle-studio: `pnpm db:studio`
//     // 5. open SQL console, and run following scripts:
//     // - install pgvector extension: `CREATE EXTENSION IF NOT EXISTS vector;`
//     // - check pgvector: `SELECT * FROM pg_extension WHERE extname = 'vector';`
//     embedding: d.vector({ dimensions: 1536 }).notNull(),
//   }),
//   (t) => [
//     // index using hnsw, for faster similarity search
//     // https://github.com/pgvector/pgvector?tab=readme-ov-file#hnsw
//     index("embedding_idx").using("hnsw", t.embedding.op("vector_cosine_ops")),
//     foreignKey({
//       columns: [t.resourceId],
//       foreignColumns: [resources.id],
//       name: "embedding_resource_id_fk",
//     }).onDelete("cascade"),
//   ],
// );
