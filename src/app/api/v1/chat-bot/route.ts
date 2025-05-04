/**
 * server route for comprehensive chatbot component
 *
 * @description: build server route for comprehensive chatbot component, following the document of AI SDK
 *
 * @see https://ai-sdk.dev/docs/ai-sdk-ui/chatbot
 *
 * @author Sawana Huang <hsawana9@gmail.com>
 * @date 2025-05-03
 *
 */

import { dashscope } from "@/lib/ai/providers/dashscope";
import { streamText, type UIMessage } from "ai";
import { type NextRequest } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export interface PostRequestBody {
  messages: UIMessage[];
}
export interface PostSuccessResponse {
  message: string;
}

export async function POST(request: NextRequest) {
  const {
    messages,
    // custom fields
    key_use_chatbot,
    key_handle_submit,
  } = (await request.json()) as PostRequestBody & {
    // custom fields
    key_use_chatbot: string;
    key_handle_submit: string;
  };

  // custom fields
  console.log({ key_use_chatbot, key_handle_submit });

  const result = streamText({
    // You can use any model you want.
    // see: https://ai-sdk.dev/providers/ai-sdk-providers
    model: dashscope("deepseek-v3"),
    system: "You are a helpful assistant.",
    messages,
  });

  return result.toDataStreamResponse({
    // Error Message:
    // The default error message is masked "An error occurred."
    // You can forward error messages or send custome messages.
    getErrorMessage: (error) => {
      if (error == null) {
        return "unknown error";
      }
      if (typeof error === "string") {
        return error;
      }
      if (error instanceof Error) {
        return error.message;
      }
      return JSON.stringify(error);
    },
    // Usage Information
    sendUsage: true,
    // Reasoning:
    // https://ai-sdk.dev/docs/ai-sdk-ui/chatbot#reasoning
    sendReasoning: true,
    // Source
    // https://ai-sdk.dev/docs/ai-sdk-ui/chatbot#sources
    // some providers response include sources
    // eg. Perplexity, Google generative AI
    sendSources: true,
  });
}
