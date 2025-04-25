/**
 * generateText compoent
 *
 * @author Sawana Huang
 *
 * @see https://sdk.vercel.ai/cookbook/rsc/generate-text
 *
 * @example use it in your component
 * import GenerateTextDemo from "@/components/generate-text-demo";
 * 
 * <GenerateTextDemo />
 */
"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

import type { GenerateTextPostSuccessResponse } from "@/app/api/v1/generate-text/route";

type GenerateTextDemoProps = {
  className?: string;
};

export default function GenerateTextDemo({
  className,
  ...props
}: React.ComponentProps<"div"> & GenerateTextDemoProps) {
  const [generation, setGeneration] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={cn(className)} {...props}>
      <div
        onClick={async () => {
          setIsLoading(true);

          try {
            const response = await fetch("/api/v1/generate-text", {
              method: "POST",
              body: JSON.stringify({
                prompt: "Why is the sky blue?",
              }),
            });
            const json =
              (await response.json()) as GenerateTextPostSuccessResponse;
            setGeneration(json.text);
          } catch (error) {
            console.error("Error generating text:", error);
            setGeneration("Unable to generate text at the moment. Please refresh and try again.");
          } finally {
            setIsLoading(false);
          }
        }}
      >
        Generate
      </div>

      {isLoading ? "Loading..." : generation}
    </div>
  );
}
