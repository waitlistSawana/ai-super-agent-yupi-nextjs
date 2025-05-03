/**
 * comprehensive chatbot component
 *
 * @description: comprehensive chatbot component, following the document of AI SDK
 *
 * @see https://ai-sdk.dev/docs/ai-sdk-ui/chatbot
 *
 * @author Sawana Huang <hsawana9@gmail.com>
 * @date 2025-05-03
 *
 */

"use client";

import { cn } from "@/lib/utils";

import { useChat } from "@ai-sdk/react";

type ChatBotWithMiddlewareProps = {
  className?: string;
};

export default function ChatBotWithMiddleware({
  className,
  ...props
}: React.ComponentProps<"div"> & ChatBotWithMiddlewareProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    stop,
    error,
    reload,
  } = useChat({
    // API endpoint Default /api/chat
    api: "/api/v1/chat-bot-with-middleware",
    // Throttle the messages and data updates to 50ms:
    experimental_throttle: 50,
    // Event Callbacks:
    // https://ai-sdk.dev/docs/ai-sdk-ui/chatbot#event-callbacks
    onFinish: (message, { usage, finishReason }) => {
      console.log("Finished streaming message:", message);
      console.log("Token usage:", usage);
      console.log("Finish reason:", finishReason);
    },
    onError: (error) => {
      console.error("An error occurred:", error);
    },
    onResponse: (response) => {
      console.log("Received HTTP response from server:", response);
      // You can throw error here to trigger the onError callback
    },
    // Custom headers, body, and credentials
    headers: {
      Authorization: "Bear your_token",
    },
    body: {
      key_use_chatbot: "key of useChatbot",
    },
    credentials: "same-origin",
  });

  return (
    <div className={cn("", className)} {...props}>
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
        </div>
      ))}

      {(status === "submitted" || status === "streaming") && (
        <div>
          {status === "submitted" && "loading... "}
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}

      {error && (
        <div>
          <div>An error occurred.</div>
          <button type="button" onClick={() => reload()}>
            Retry
          </button>
        </div>
      )}

      <form
        onSubmit={(event) => {
          handleSubmit(event, {
            // Custom body fieds per request
            body: {
              key_handle_submit: "key of handleSubmit",
            },
          });
        }}
      >
        <input
          name="prompt"
          value={input}
          placeholder="Type your message here..."
          onChange={handleInputChange}
          disabled={status !== "ready" || error != null}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
