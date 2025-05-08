/**
 * Rag Database
 *
 * @see https://ai-sdk.dev/docs/guides/rag-chatbot#update-server-action -- update server action
 */

"use server";

import { generateEmbeddings } from "@/lib/ai/embedding/rag-database";
import { db } from "@/server/db";
import { embeddings as embeddingsTable, resources } from "@/server/db/schema";
import { ResourceInsertSchema, type ResourceInsert } from "@/server/db/types";

export const createResource = async (input: ResourceInsert) => {
  try {
    const { content } = ResourceInsertSchema.parse(input);

    const [resource] = await db
      .insert(resources)
      .values({ content })
      .returning();

    if (!resource) throw new Error("Error, please try again.");

    const embeddings = await generateEmbeddings(content);
    await db.insert(embeddingsTable).values(
      embeddings.map((embedding) => ({
        resourceId: resource.id,
        embedding: embedding.embedding,
        content: embedding.content,
      })),
    );

    return "Resource successfully created and embedded.";
  } catch (e) {
    if (e instanceof Error)
      return e.message.length > 0 ? e.message : "Error, please try again.";
  }
};
