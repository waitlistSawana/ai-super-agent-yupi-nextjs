"use client";

import type { GenerateTextPostSuccessResponse } from "@/app/api/v1/generate-text/route";
import { cn } from "@/lib/utils";
import { useState } from "react";

type GenerateTextPageComponentProps = {
  className?: string;
};

export default function GenerateTextPageComponent({
  className,
  ...props
}: React.ComponentProps<"div"> & GenerateTextPageComponentProps) {
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
            console.error("生成文本时发生错误:", error);
            setGeneration("抱歉，生成文本时出现错误，请稍后重试");
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
