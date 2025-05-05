# AI 超级智能体 - NextJS 版本

<div align="center">
  <img src="https://img.shields.io/badge/React-19-blue" alt="React 19" />
  <img src="https://img.shields.io/badge/Next.js-15-black" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-38bdf8" alt="TailwindCSS 4" />
  <img src="https://img.shields.io/badge/Shadcn%20UI-latest-black" alt="Shadcn UI" />
</div>

*[English](./README.md) | 中文*

## 概述

本项目是 [CodeFather.cn](https://www.codefather.cn/course/1915010091721236482?shareCode=ic0a3g) 的 AI 超级智能体项目的 NextJS 实现版本。它旨在实验和构建 AI SDK 的各种功能模块，通过实际实现来探索和验证不同的 AI 能力集成解决方案。

原项目使用 Java 和 [Spring AI](https://spring.io/projects/spring-ai) 作为后端，而本版本利用 Next.js 15 API 路由、tRPC 和 Drizzle ORM/Prisma 来实现类似功能，采用现代 JavaScript 技术栈。

## 功能特性

- **文本生成**：使用 AI 模型的基本文本生成能力
- **聊天机器人**：交互式 AI 对话界面
- **中间件支持**：用于 AI 请求处理的自定义中间件
- **结构化输出**：从 AI 响应生成结构化数据
- **持久化**：聊天历史持久化，支持文件系统和数据库选项
- **多 AI 提供商**：支持多种 AI 提供商，包括：
  - 阿里云 Dashscope
  - 阿里灵积
  - Deepseek
  - Sealos
  - OpenRouter

## 技术栈

本项目使用 [create-t3-app](https://create.t3.gg/) 引导创建，这是一个现代全栈开发工具集。

### 前端

- React 19
- Next.js 15 (App Router)
- TailwindCSS 4
- Shadcn UI 组件库

### 后端

- Next.js 15 API 路由
- tRPC
- Drizzle ORM / Prisma

## 项目结构

```
/src
  /app - Next.js 应用路由
  /components - React 组件
  /lib - 工具函数
  /server - 服务端代码
  /styles - 全局样式
```

## 快速开始

### 前置条件

- Node.js (18.x 或更高)
- pnpm (推荐)

### 安装

1. 克隆仓库
   ```bash
   git clone https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs.git
   cd ai-super-agent-yupi-nextjs
   ```

2. 安装依赖
   ```bash
   pnpm install
   ```

3. 设置环境变量
   ```bash
   cp .env.example .env
   # 编辑 .env 并添加你的 API 密钥
   # DASHSCOPE_API_KEY=your_api_key_here
   ```

4. 启动开发服务器
   ```bash
   pnpm dev
   ```

## 使用 Shadcn UI Registry

本项目支持 Shadcn UI Registry，可以快速添加 AI 组件和功能到你的项目中：

```bash
# 初始化 Shadcn UI
pnpm dlx shadcn@latest init

# 添加阿里云 Dashscope AI 提供商
pnpm dlx shadcn@latest add https://ai-super-agent-yupi-nextjs.hsawana9.com/r/dashscrop-ai-provider.json

# 添加文本生成 API 和组件
pnpm dlx shadcn@latest add https://ai-super-agent-yupi-nextjs.hsawana9.com/r/nextjs-generate-text-api-and-component-for-dashscrop-ai-provider.json
```

## 可用服务

- **生成文本**：使用 AI 的基本文本生成
- **聊天机器人**：交互式 AI 聊天界面
- **带中间件的聊天机器人**：带有请求/响应处理的增强型聊天机器人
- **对象生成通知**：带通知的结构化数据生成
- **聊天持久化**：聊天历史保存到文件系统
- **聊天数据库持久化**：聊天历史保存到数据库

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 许可证

本项目是开源的，基于 MIT 许可证。

## 致谢

- [CodeFather.cn](https://www.codefather.cn/) 提供原始 AI 超级智能体课程
- [Vercel AI SDK](https://sdk.vercel.ai/) 提供 AI 集成工具
- [Shadcn UI](https://ui.shadcn.com/) 提供组件库