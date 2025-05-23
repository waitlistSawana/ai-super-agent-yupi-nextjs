/**
 * generateText Route
 *
 * @author Sawana Huang
 *
 * @see https://sdk.vercel.ai/docs/ai-sdk-core/generating-text
 * @see https://sdk.vercel.ai/cookbook/rsc/generate-text
 */
import { generateText } from "ai";
import { NextResponse, type NextRequest } from "next/server";

import { sealos } from "@/lib/ai/providers/sealos";

export interface GenerateTextPostRequestBody {
  prompt: string;
}
export interface GenerateTextPostSuccessResponse {
  message: string;
  text: string;
}

export async function POST(request: NextRequest) {
  const { prompt } = (await request.json()) as GenerateTextPostRequestBody;

  const result = await generateText({
    model: sealos("deepseek-chat-0324"),
    system: "You are a helpful assistant.",
    prompt: prompt,
  });

  const text = result.text;

  return NextResponse.json(
    { message: "success", text: text } as GenerateTextPostSuccessResponse,
    {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
