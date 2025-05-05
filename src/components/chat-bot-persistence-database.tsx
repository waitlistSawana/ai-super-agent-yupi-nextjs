/**
 * Chat Component for Database Persistence
 *
 * @see https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-message-persistence
 */

"use client";

import { CHAT_MESSAGE_CLIENT_PREFIX } from "@/lib/ai/persistence/config";
import { type Message, useChat } from "@ai-sdk/react";
import { createIdGenerator } from "ai";

export default function ChatBotPersistenceDatabase({
  id,
  initialMessages,
}: { id?: string | undefined; initialMessages?: Message[] } = {}) {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/v1/chat-persistence-database",
    // use the provided chat ID
    id,
    // initial messages if provided
    initialMessages,
    // send id and createdAt for each message
    sendExtraMessageFields: true,
    // id format for client-side messages:
    generateId: createIdGenerator({
      prefix: CHAT_MESSAGE_CLIENT_PREFIX,
      size: 16,
    }),
  });

  // simplified rendering code, extend as needed:
  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="Type your message here..."
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
