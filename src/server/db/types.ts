/**
 * Types for the database.
 */

import type { z } from "zod";
import { type chats, type messages, type posts, resources } from "./schema";
import { createInsertSchema } from "drizzle-zod";

export type Post = typeof posts.$inferSelect;
export type PostInsert = typeof posts.$inferInsert;

export type Chat = typeof chats.$inferSelect;
export type ChatInsert = typeof chats.$inferInsert;

export type Message = typeof messages.$inferSelect;
export type MessageInsert = typeof messages.$inferInsert;

/**
 * RAG
 */

export const ResourceInsertSchema = createInsertSchema(resources)
  .extend({})
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });
export type Resource = typeof resources.$inferSelect;
export type ResourceInsert = z.infer<typeof ResourceInsertSchema>;
