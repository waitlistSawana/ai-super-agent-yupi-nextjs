/**
 * Object Generation
 *
 * @see https://ai-sdk.dev/docs/ai-sdk-ui/object-generation
 */

import { notificationSchema } from "@/lib/ai/object-generation/schema";
import { dashscope } from "@/lib/ai/providers/dashscope";
import { streamObject } from "ai";
import { type NextRequest } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// export interface PostRequestBody {
//   message: string;
// }

export async function POST(request: NextRequest) {
  const context = (await request.json()) as string | undefined;

  console.log({ context });

  const result = streamObject({
    model: dashscope("qwen-plus"),
    schema: notificationSchema,
    prompt:
      `Generate 3 notifications for a messages app in this context:` + context,
  });

  return result.toTextStreamResponse();
}
