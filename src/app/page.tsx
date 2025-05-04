import RegistryList from "@/components/registry-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            AI 超级智能体{" "}
            <span className="text-[hsl(280,100%,70%)]">NextJS</span> 版
          </h1>
          <p className="text-center leading-10">
            学习自编程导航
            <a
              href="https://www.codefather.cn/course/1915010091721236482?shareCode=ic0a3g"
              target="_blank"
              className="underline underline-offset-2"
            >
              {" "}
              AI超级智能体 ↗{" "}
            </a>
            项目，原项目后端技术栈为 JAVA 和{" "}
            <a
              target="_blank"
              className="underline underline-offset-2"
              href="https://spring.io/projects/spring-ai"
            >
              Spring AI ↗
            </a>{" "}
            。
            <br />
            支持 Shadcn UI Registry 快速注册组件和函数，
            <a href="#registry-list" className="underline underline-offset-2">
              在此查看 Registry 服务列表
            </a>
            。本项目代码已{" "}
            <a
              href="https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs"
              target="_blank"
              className="underline underline-offset-2"
            >
              Github 开源 ↗
            </a>
          </p>
          {/* Author */}
          <div className="flex flex-col items-center justify-center gap-3">
            <div>Made with ❤ by Sawana Huang</div>
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20"
                asChild
              >
                <a
                  href="https://github.com/waitlistSawana"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  GitHub
                </a>
              </Button>

              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20"
                asChild
              >
                <a
                  href="https://x.com/HSawana9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                  X
                </a>
              </Button>

              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20"
                asChild
              >
                <a
                  href="https://okjk.co/zBiAcn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  即刻
                </a>
              </Button>

              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20"
                asChild
              >
                <a
                  href="https://www.codefather.cn/user/1857029075076202498?shareCode=ic0a3g"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                  </svg>
                  编程导航
                </a>
              </Button>

              {/* <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20"
                asChild
              >
                <a
                  href="https://space.bilibili.com/121931019"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4z" />
                    <path d="M6 9h12v6H6V9z" />
                  </svg>
                  Bilibili
                </a>
              </Button> */}

              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20"
                asChild
              >
                <a
                  href="mailto:hsawana9@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  邮件
                </a>
              </Button>
            </div>
          </div>

          {/* Page Link Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/generate-text"
              // target="_blank"
            >
              <h3 className="text-2xl font-bold">Generate Text →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/chat-bot"
              // target="_blank"
            >
              <h3 className="text-2xl font-bold">Chatbot →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/chat-bot-with-middleware"
              // target="_blank"
            >
              <h3 className="text-2xl font-bold">Chatbot with Middleware →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/object-generation-notification"
              // target="_blank"
            >
              <h3 className="text-2xl font-bold">
                Object Generation Notification →
              </h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/chat-persistence"
              // target="_blank"
            >
              <h3 className="text-2xl font-bold">Chat Persistence →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* 文档 */}
      <div className="bg-background py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-3xl font-bold tracking-tight">
            Registry 使用引导
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h3 className="text-2xl font-semibold">快速开始</h3>
            <p className="text-muted-foreground">
              在 NextJS（或其他 React 框架）项目中使用我定制好的 AI
              组件和封装函数，类型安全、通过 T3 Stack 的类型和 Eslint
              检验。只需几个简单的步骤，向你的项目中注入写好的代码 - 就像
              <a
                href="https://ui.shadcn.com/docs"
                target="_blank"
                className="underline underline-offset-1"
              >
                {" "}
                Shadcn UI ↗{" "}
              </a>
              一样。
            </p>

            <div className="bg-muted my-6 overflow-hidden rounded-lg border">
              <div className="bg-muted flex items-center gap-2 border-b px-4 py-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-muted-foreground text-sm">终端</span>
              </div>
              <div className="p-4">
                <pre className="overflow-x-auto">
                  <code className="text-muted-foreground text-sm">
                    {`# 初始化 Shadcn UI
pnpm dlx shadcn@latest init

# 增加阿里云百炼 ai 提供商
pnpm dlx shadcn@latest add https://ai-super-agent-yupi-nextjs.hsawana9.com/r/dashscrop-ai-provider.json

# 增加文本生成功能
pnpm dlx shadcn@latest add https://ai-super-agent-yupi-nextjs.hsawana9.com/r/nextjs-generate-text-api-and-component-for-dashscrop-ai-provider.json`}
                  </code>
                </pre>
              </div>
            </div>

            <h3 className="text-2xl font-semibold">环境配置</h3>
            <p className="text-muted-foreground">
              在项目根目录创建 .env 文件，添加必要的环境变量：
            </p>

            <div className="bg-muted my-6 overflow-hidden rounded-lg border">
              <div className="p-4">
                <pre className="overflow-x-auto">
                  <code className="text-muted-foreground text-sm">
                    {`DASHSCOPE_API_KEY=your_api_key_here`}
                  </code>
                </pre>
              </div>
            </div>

            <h3 className="text-2xl font-semibold">使用组件</h3>
            <p className="text-muted-foreground">
              在你的页面中导入并使用文本生成组件：
            </p>

            <div className="bg-muted my-6 overflow-hidden rounded-lg border">
              <div className="p-4">
                <pre className="overflow-x-auto">
                  <code className="text-muted-foreground text-sm">
                    {`import GenerateTextDemo from "@/components/generate-text-demo";

export default function YourPage() {
  return (
    <div>
      <h1>AI 文本生成示例</h1>
      <GenerateTextDemo />
    </div>
  );
}`}
                  </code>
                </pre>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://ui.shadcn.com/docs/installation"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
              >
                查看 Shadcn UI 的更多框架支持
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Registry 服务列表 */}
      <RegistryList />
    </>
  );
}
