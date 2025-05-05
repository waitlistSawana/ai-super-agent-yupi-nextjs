"use client";

import { cn } from "@/lib/utils";
import { CopyButton } from "./ui/copy-button";
import { cva } from "class-variance-authority";

/**
 * Registry card item type definition
 */
type RegistryCardItem = {
  /** Title of the registry card */
  title: string;
  /** Description of the registry card */
  description: string;
  /** Links to related resources */
  links: Array<{
    /** Link text */
    text: string;
    /** Link URL */
    url: string;
  }>;
  /** Installation command */
  installCommand: string;
};

/**
 * Registry list options type definition
 */
type RegistryListOptions = {
  /** Title of the registry list section */
  title: string;
  /** Registry card items */
  items: RegistryCardItem[];
};

/**
 * Registry list component props
 */
type RegistryListProps = {
  /** Additional class names */
  className?: string;
  /** Custom registry options */
  options?: RegistryListOptions;
};

/**
 * Default registry options
 */
const defaultOptions: RegistryListOptions = {
  title: "Registry 服务列表",
  items: [
    {
      title: "文本生成组件演示",
      description:
        "基于 Dashscope AI 提供商的文本生成功能实现，最简版本，包含 API 端点和 React 组件。",
      links: [
        {
          text: "后端代码",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/app/api/v1/generate-text/route.ts",
        },
        {
          text: "前端组件",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/components/generate-text-demo.tsx",
        },
      ],
      installCommand:
        "pnpm dlx shadcn@latest add https://ai-super-agent-yupi-nextjs.hsawana9.com/r/nextjs-generate-text-api-and-component-for-dashscrop-ai-provider.json",
    },
    {
      title: "阿里云百炼 AI 提供商",
      description: "为 AI SDK 设置阿里云百炼 AI 提供商，添加模型提供者到库中。",
      links: [
        {
          text: "调用函数",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/lib/ai/providers/dashscope.ts",
        },
      ],
      installCommand:
        "pnpm dlx shadcn@latest add https://ai-super-agent-yupi-nextjs.hsawana9.com/r/dashscrop-ai-provider.json",
    },
    {
      title: "Sealos AI 提供商",
      description: "为 AI SDK 设置 Sealos AI 提供商，添加模型提供者到库中。",
      links: [
        {
          text: "调用函数",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/lib/ai/providers/sealos.ts",
        },
      ],
      installCommand:
        "pnpm dlx shadcn@latest add http://localhost:3000/r/sealos-ai-provider.json",
    },
    {
      title: "聊天机器人组件",
      description:
        "完整的聊天机器人实现，包含 UI 组件和 API 端点。基于 Vercel AI SDK 构建，可无缝集成到 NextJS 应用中。",
      links: [
        {
          text: "后端代码",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/app/api/v1/chat-bot/route.ts",
        },
        {
          text: "前端组件",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/components/chat-bot.tsx",
        },
      ],
      installCommand:
        "pnpm dlx shadcn@latest add https://ai-super-agent-yupi-nextjs.hsawana9.com/r/nextjs-chat-bot-component-and-api.json",
    },
    {
      title: "聊天机器人中间件组件",
      description:
        "高级聊天机器人实现，支持LLM中间件功能，包含UI组件、API端点和中间件处理器，用于增强AI交互。",
      links: [
        {
          text: "中间件处理器",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/lib/ai/llm-middleware/dashscope.ts",
        },
        {
          text: "后端代码",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/app/api/v1/chat-bot-with-middleware/route.ts",
        },
        {
          text: "前端组件",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/components/chat-bot-with-middleware.tsx",
        },
      ],
      installCommand:
        "pnpm dlx shadcn@latest add https://ai-super-agent-yupi-nextjs.hsawana9.com/r/nextjs-chat-bot-with-middleware.json",
    },
    {
      title: "对象生成通知组件",
      description:
        "基于 Vercel AI SDK 的对象生成功能实现，用于生成结构化通知对象，包含 Schema 定义、UI 组件和 API 端点。",
      links: [
        {
          text: "Schema 定义",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/lib/ai/object-generation/schema.ts",
        },
        {
          text: "后端代码",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/app/api/v1/object-generation/notification/route.ts",
        },
        {
          text: "前端组件",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/components/object-generation-notification.tsx",
        },
      ],
      installCommand:
        "pnpm dlx shadcn@latest add https://ai-super-agent-yupi-nextjs.hsawana9.com/r/nextjs-object-generation-notification.json",
    },
    {
      title: "聊天持久化组件（文件系统）",
      description:
        "基于本地文件系统的聊天消息持久化实现，包含UI组件、API端点和文件存储工具。适合开发环境和演示使用，无需数据库即可保存聊天历史。",
      links: [
        {
          text: "存储工具",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/lib/ai/persistence/chat-store.ts",
        },
        {
          text: "后端代码",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/app/api/v1/chat-persistence/route.ts",
        },
        {
          text: "前端组件",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/components/chat-bot-persistence.tsx",
        },
        {
          text: "聊天页面",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/app/(ai-demo)/chat-persistence/[id]/page.tsx",
        },
      ],
      installCommand:
        "pnpm dlx shadcn@latest add https://ai-super-agent-yupi-nextjs.hsawana9.com/r/nextjs-chat-persistence-local.json",
    },
    {
      title: "聊天持久化组件（数据库）",
      description:
        "基于数据库的聊天消息持久化实现，使用Drizzle ORM进行数据存储，包含UI组件、API端点和数据库存储工具。适合生产环境使用，通过缓存机制提升性能。",
      links: [
        {
          text: "存储工具",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/lib/ai/persistence/chat-store-database.ts",
        },
        {
          text: "后端代码",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/app/api/v1/chat-persistence-database/route.ts",
        },
        {
          text: "前端组件",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/components/chat-bot-persistence-database.tsx",
        },
        {
          text: "聊天页面",
          url: "https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs/blob/main/src/app/(ai-demo)/chat-persistence-database/[id]/page.tsx",
        },
      ],
      installCommand:
        "pnpm dlx shadcn@latest add https://ai-super-agent-yupi-nextjs.hsawana9.com/r/nextjs-chat-persistence-database.json",
    },
  ],
};

/**
 * Card styles using cva for variant management
 */
const cardStyles = cva("bg-card rounded-lg border p-6 shadow-sm", {
  variants: {
    variant: {
      default: "",
      highlight: "border-primary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Registry List Component
 *
 * Displays a list of registry services with their descriptions and installation commands
 *
 * @param props - Component props including className and custom options
 * @returns Registry list component
 */
export default function RegistryList({
  className,
  options = defaultOptions,
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
          {options.title}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {options.items.map((item, index) => (
            <div key={"registry-item:" + index} className={cardStyles()}>
              <h3 className="mb-4 text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground mb-4">
                {item.description}
                {item.links.map((link, linkIndex) => (
                  <span key={linkIndex}>
                    {linkIndex > 0 && (
                      <>{linkIndex === item.links.length - 1 ? "和" : "、"}</>
                    )}
                    <a
                      key={linkIndex}
                      href={link.url}
                      target="_blank"
                      className="underline underline-offset-1"
                    >
                      {link.text} ↗
                    </a>
                  </span>
                ))}
              </p>
              <div className="bg-muted group relative rounded-md p-3">
                <code className="text-muted-foreground text-sm">
                  {item.installCommand}
                </code>
                <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <CopyButton value={item.installCommand} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
