"use client";

import { cn } from "@/lib/utils";
import { CopyButton } from "./ui/copy-button";

type RegistryListProps = {
  className?: string;
};

export default function RegistryList({
  className,
  ...props
}: React.ComponentProps<"div"> & RegistryListProps) {
  return (
    <div
      id="registry-list"
      className={cn("bg-muted py-16", className)}
      {...props}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">
          Registry 服务列表
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* 文本生成演示 */}
          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">文本生成组件演示</h3>
            <p className="text-muted-foreground mb-4">
              基于 Dashscope AI 提供商的文本生成功能实现，最简版本，包含 API
              端点和 React 组件。
              <a
                href="https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/app/api/v1/generate-text/route.ts"
                target="_blank"
                className="underline underline-offset-1"
              >
                后端代码 ↗
              </a>
              和
              <a
                href="https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/components/generate-text-demo.tsx"
                target="_blank"
                className="underline underline-offset-1"
              >
                前端组件 ↗
              </a>
            </p>
            <div className="bg-muted group relative rounded-md p-3">
              <code className="text-muted-foreground text-sm">
                pnpm dlx shadcn@latest add
                https://ai-super-agent-yupi-nextjs.hsawana9.com/r/nextjs-generate-text-api-and-component-for-dashscrop-ai-provider.json
              </code>
              <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                <CopyButton value="pnpm dlx shadcn@latest add https://ai-super-agent-yupi-nextjs.hsawana9.com/r/nextjs-generate-text-api-and-component-for-dashscrop-ai-provider.json" />
              </div>
            </div>
          </div>

          {/* 阿里云百炼 AI 提供商 */}
          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">阿里云百炼 AI 提供商</h3>
            <p className="text-muted-foreground mb-4">
              为 AI SDK 设置阿里云百炼 AI 提供商，添加模型提供者到库中。
              <a
                href="https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/lib/ai/providers/dashscope.ts"
                target="_blank"
                className="underline underline-offset-1"
              >
                调用函数 ↗
              </a>
            </p>
            <div className="bg-muted group relative rounded-md p-3">
              <code className="text-muted-foreground text-sm">
                pnpm dlx shadcn@latest add
                https://ai-super-agent-yupi-nextjs.hsawana9.com/r/dashscrop-ai-provider.json
              </code>
              <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                <CopyButton value="pnpm dlx shadcn@latest add https://ai-super-agent-yupi-nextjs.hsawana9.com/r/dashscrop-ai-provider.json" />
              </div>
            </div>
          </div>

          {/* Sealos AI 提供商 */}
          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <a href="" target="_blank"></a>
            <h3 className="mb-4 text-xl font-semibold">Sealos AI 提供商</h3>
            <p className="text-muted-foreground mb-4">
              为 AI SDK 设置 Sealos AI 提供商，添加模型提供者到库中。
              <a
                href="https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/lib/ai/providers/sealos.ts"
                target="_blank"
                className="underline underline-offset-1"
              >
                调用函数 ↗
              </a>
            </p>
            <div className="bg-muted group relative rounded-md p-3">
              <code className="text-muted-foreground text-sm">
                pnpm dlx shadcn@latest add
                http://localhost:3000/r/sealos-ai-provider.json
              </code>
              <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                <CopyButton value="pnpm dlx shadcn@latest add http://localhost:3000/r/sealos-ai-provider.json" />
              </div>
            </div>
          </div>

          {/* 聊天机器人组件 */}
          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">聊天机器人组件</h3>
            <p className="text-muted-foreground mb-4">
              完整的聊天机器人实现，包含 UI 组件和 API 端点。基于 Vercel AI SDK
              构建，可无缝集成到 NextJS 应用中。
              <a
                href="https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/app/api/v1/chat-bot/route.ts"
                target="_blank"
                className="underline underline-offset-1"
              >
                后端代码 ↗
              </a>
              和
              <a
                href="https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/components/chat-bot.tsx"
                target="_blank"
                className="underline underline-offset-1"
              >
                前端组件 ↗
              </a>
            </p>
            <div className="bg-muted group relative rounded-md p-3">
              <code className="text-muted-foreground text-sm">
                pnpm dlx shadcn@latest add
                https://ai-super-agent-yupi-nextjs.hsawana9.com/r/nextjs-chat-bot-component-and-api.json
              </code>
              <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                <CopyButton value="pnpm dlx shadcn@latest add https://ai-super-agent-yupi-nextjs.hsawana9.com/r/nextjs-chat-bot-component-and-api.json" />
              </div>
            </div>
          </div>
          {/* 聊天机器人中间件组件 */}
          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">聊天机器人中间件组件</h3>
            <p className="text-muted-foreground mb-4">
              高级聊天机器人实现，支持LLM中间件功能，包含UI组件、API端点和中间件处理器，用于增强AI交互。
              <a
                href="https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/lib/ai/llm-middleware/dashscope.ts"
                target="_blank"
                className="underline underline-offset-1"
              >
                中间件处理器 ↗
              </a>
              、
              <a
                href="https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/app/api/v1/chat-bot-with-middleware/route.ts"
                target="_blank"
                className="underline underline-offset-1"
              >
                后端代码 ↗
              </a>
              和
              <a
                href="https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/components/chat-bot-with-middleware.tsx"
                target="_blank"
                className="underline underline-offset-1"
              >
                前端组件 ↗
              </a>
            </p>
            <div className="bg-muted group relative rounded-md p-3">
              <code className="text-muted-foreground text-sm">
                pnpm dlx shadcn@latest add
                https://ai-super-agent-yupi-nextjs.hsawana9.com/r/nextjs-chat-bot-with-middleware.json
              </code>
              <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                <CopyButton value="pnpm dlx shadcn@latest add https://ai-super-agent-yupi-nextjs.hsawana9.com/r/nextjs-chat-bot-with-middleware.json" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
