/**
 * Chat API for Persistence
 *
 * @see https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-message-persistence
 */

import { saveChat } from "@/lib/ai/persistence/chat-store";
import { CHAT_MESSAGE_SERVER_PREFIX } from "@/lib/ai/persistence/config";
import { dashscope } from "@/lib/ai/providers/dashscope";
import {
  appendResponseMessages,
  createIdGenerator,
  streamText,
  type UIMessage,
} from "ai";

export interface PostRequestBody {
  id: string;
  messages: UIMessage[];
}

export async function POST(req: Request) {
  const { messages, id } = (await req.json()) as PostRequestBody;

  const result = streamText({
    model: dashscope("qwen-turbo"),
    messages,
    // store messages
    async onFinish({ response }) {
      await saveChat({
        id,
        messages: appendResponseMessages({
          // history messages
          messages,
          // response messages
          responseMessages: response.messages,
        }),
      });
    },
    // id format for server-side messages:
    experimental_generateMessageId: createIdGenerator({
      prefix: CHAT_MESSAGE_SERVER_PREFIX,
      size: 16,
    }),
  });

  return result.toDataStreamResponse();
}
