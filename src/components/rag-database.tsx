"use client";

import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";

interface RAGDatabaseProps {
  className?: string;
}

export default function RAGDatabase({
  className,
  ...props
}: React.ComponentProps<"div"> & RAGDatabaseProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/v1/rag-database",
    maxSteps: 5,
    onFinish: (messages) => {
      console.log({
        createdAt: messages.createdAt,
        parts: messages.parts,
      });
    },
  });

  return (
    <div
      className={cn(
        "stretch mx-auto flex w-full max-w-md flex-col py-24",
        className,
      )}
      {...props}
    >
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div>
              <div className="font-bold">{m.role}</div>
              <p>
                {m.content.length > 0 ? (
                  m.content
                ) : (
                  <span className="font-light italic">
                    {[
                      "calling tool: ",
                      m?.parts.map((p) => p.type).join(", "),
                      m.parts.map((p) => {
                        return p.type === "tool-invocation"
                          ? p.toolInvocation.toolName
                          : "";
                      }),
                    ].join("")}
                  </span>
                )}
              </p>
              <pre className="text-xs">{JSON.stringify(m.parts, null, 2)}</pre>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
