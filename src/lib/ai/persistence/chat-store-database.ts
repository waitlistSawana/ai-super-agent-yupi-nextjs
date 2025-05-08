/**
 * Database chat store
 *
 * We use drizle and build our project with T3 stack.
 * There is a drizzle schema example at the end of this file.
 *
 * It's good to follow the T3 stack who builds incredable
 * scripts to set up your databse at local with Docker Destop
 *
 * Or, you can set up your drizzle orm and connet to database
 * with your own way.
 *
 * Cache loaded data with next/cache, which is built-in functions
 * of Next.js.
 * deprecated cache: It allow us to cache the results of expensive database queries.
 * You can build it yourself by connect a KV store.
 *
 * @see https://orm.drizzle.team/ - Drizzle ORM documentation
 * @see https://create.t3.gg/ - T3 Stack documentation
 * @see https://nextjs.org/docs/app/api-reference/functions/unstable_cache - Next.js cache documentation
 *
 * @author Sawana Huang <<hsawana9@gmail.com>>
 * @date 2025-05-04
 */

// Force this module to be used only on server-side
import "server-only";

import { type Message } from "ai";

import { db } from "@/server/db";
import { chats, messages as messagesSchema } from "@/server/db/schema";
import type { ChatInsert } from "@/server/db/types";

/**
 * Creates a new chat session in the database.
 *
 * This function inserts a new chat record into the database with default values
 * and returns the generated unique identifier for the chat. The function handles
 * authentication internally (placeholder for auth logic).
 *
 * @async
 * @function createChat
 * @returns {Promise<string>} A promise that resolves to the unique ID of the newly created chat
 * @throws {Error} Throws an error if the chat creation fails
 */
export async function createChat(): Promise<string> {
  // Your auth logic here
  // ...

  // create new chat
  const [insertedChat] = await db
    .insert(chats)
    .values({} as ChatInsert)
    .returning({
      id: chats.id,
    });
  const id = insertedChat?.id;

  if (!id) {
    throw new Error("Failed to create chat");
  }

  return id;
}

/**
 * Retrieves a list of all chat IDs from the database.
 *
 * This function queries the database for all chat sessions and returns their IDs.
 * Results are cached using Next.js's unstable_cache to improve performance,
 *
 * @async
 * @function listChats
 * @returns {Promise<string[]>} A promise that resolves to an array of chat IDs
 */
export async function listChats(): Promise<string[]> {
  const chats = await db.query.chats.findMany({
    orderBy: (chats, { asc }) => [asc(chats.createdAt)],
  });

  return chats.map((chat) => chat.id);
}

/**
 * Loads all messages for a specific chat from the database.
 *
 * This function retrieves all messages associated with the provided chat ID,
 * ordered by creation time. Results are cached using Next.js's unstable_cache
 * with a revalidation period of 10 minutes to improve performance for
 * frequently accessed chats.
 *
 * @async
 * @function loadChat
 * @param {string} id - The unique identifier of the chat to load
 * @returns {Promise<Message[]>} A promise that resolves to an array of Message objects
 */
export async function loadChat(id: string): Promise<Message[]> {
  const messages = await db.query.messages.findMany({
    where: (messages, { eq }) => eq(messages.chatId, id),
    orderBy: (messages, { asc }) => [asc(messages.createdAt)],
  });

  return messages.map((message) => ({
    id: message.id,
    role: message.role,
    content: message.content,
    parts: message.parts,
    attachments: message.attachments,
    createdAt: message.createdAt,
  })) as Message[];
}

/**
 * Saves new messages to a specific chat in the database.
 *
 * This function compares the provided messages with existing messages in the database
 * and only inserts messages that don't already exist. This prevents duplicate messages
 * and optimizes database operations.
 *
 * @async
 * @function saveChat
 * @param {Object} params - The parameters object
 * @param {string} params.id - The unique identifier of the chat to save messages to
 * @param {Message[]} params.messages - The array of messages to save
 * @returns {Promise<void>} A promise that resolves when the operation is complete
 */

export async function saveChat({
  id,
  messages,
}: {
  id: string;
  messages: Message[];
}): Promise<void> {
  // history messages
  const historyMessages = await loadChat(id);

  // compare messages get diff messages
  const existingMessageIds = new Set(
    historyMessages.map((message) => message.id),
  );
  const newMessages = messages.filter(
    (message) => !existingMessageIds.has(message.id),
  );
  // write to database
  await db.insert(messagesSchema).values([
    ...newMessages.map((message) => ({
      id: message.id,
      chatId: id,
      role: message.role,
      content: message.content,
      parts: message.parts,
      attachments: message.experimental_attachments,
      createdAt:
        message.createdAt instanceof Date
          ? message.createdAt
          : new Date(message.createdAt ?? Date.now()),
    })),
  ]);
}

/**
 * Drizzle Schema
 */

// export const chats = createTable(
//   "chat",
//   (d) => ({
//     id: d.uuid().primaryKey().notNull().defaultRandom(),
//     title: d.text().notNull().default("Untitiled Chat"),
//     visibility: d
//       .varchar({ enum: ["public", "private"] })
//       .notNull()
//       .default("private"),
//     createdAt: d
//       .timestamp({ withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
//   }),
//   (t) => [index("chat_created_at_idx").on(t.createdAt)],
// );

// export const messages = createTable(
//   "message",
//   (d) => ({
//     id: d.varchar({ length: 64 }).primaryKey().notNull(),
//     chatId: d.uuid().notNull(),
//     role: d.varchar().notNull(),
//     content: d.text().notNull(),
//     parts: d.json().notNull(),
//     attachments: d.json(),
//     createdAt: d
//       .timestamp({ withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//   }),
//   (t) => [
//     index("message_created_at_idx").on(t.createdAt),
//     foreignKey({
//       columns: [t.chatId],
//       foreignColumns: [chats.id],
//       name: "message_chat_id_fk",
//     }),
//   ],
// );
