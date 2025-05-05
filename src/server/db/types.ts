/**
 * Types for the database.
 */

import type { chats, messages, posts } from "./schema";

export type Post = typeof posts.$inferSelect;
export type PostInsert = typeof posts.$inferInsert;

export type Chat = typeof chats.$inferSelect;
export type ChatInsert = typeof chats.$inferInsert;

export type Message = typeof messages.$inferSelect;
export type MessageInsert = typeof messages.$inferInsert;
