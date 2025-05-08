import { createResource } from "@/actions/rag-database";
import { findRelevantContent } from "@/lib/ai/embedding/rag-database";
import { dashscope } from "@/lib/ai/providers/dashscope";
import { streamText, tool, type UIMessage } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export interface PostRequestBody {
  messages: UIMessage[];
}

export async function POST(req: Request) {
  const { messages } = (await req.json()) as PostRequestBody;

  const result = streamText({
    model: dashscope("qwen-plus"),
    system: `You are a helpful assistant. Check your knowledge base before answering any questions.
    Only respond to questions using information from tool calls.`,
    messages,
    tools: {
      addResource: tool({
        description: `add a resource to your knowledge base.
          If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
        parameters: z.object({
          content: z
            .string()
            .describe("the content or resource to add to the knowledge base"),
        }),
        execute: async ({ content }) => createResource({ content }),
      }),
      getInformation: tool({
        description: `get information from knowledge base to answer the latest question from user.`,
        parameters: z.object({
          question: z.string().describe("the users question"),
        }),
        execute: async ({ question }) => findRelevantContent(question),
      }),
    },
  });

  return result.toDataStreamResponse();
}
