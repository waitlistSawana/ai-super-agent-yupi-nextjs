# AI Super Agent - NextJS Version

*English | [中文](./README.zh-CN.md)*

<div align="center">
  <img src="https://img.shields.io/badge/React-19-blue" alt="React 19" />
  <img src="https://img.shields.io/badge/Next.js-15-black" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-38bdf8" alt="TailwindCSS 4" />
  <img src="https://img.shields.io/badge/Shadcn%20UI-latest-black" alt="Shadcn UI" />
</div>

## Overview

This project is a NextJS implementation of the AI Super Agent project from [CodeFather.cn](https://www.codefather.cn/course/1915010091721236482?shareCode=ic0a3g). It aims to experiment with and build various functional modules of AI SDK, exploring and validating different AI capability integration solutions through practical implementation.

While the original project uses Java and [Spring AI](https://spring.io/projects/spring-ai) for the backend, this version leverages Next.js 15 API routes, tRPC, and Drizzle ORM/Prisma to achieve similar functionality with a modern JavaScript stack.

## Features

- **Text Generation**: Basic text generation capabilities using AI models
- **Chatbot**: Interactive conversational AI interface
- **Middleware Support**: Custom middleware for AI request processing
- **Structured Output**: Generate structured data from AI responses
- **Persistence**: Chat history persistence with both file system and database options
- **Multiple AI Providers**: Support for various AI providers including:
  - Alibaba Cloud Dashscope
  - Alibaba Lingji
  - Deepseek
  - Sealos
  - OpenRouter

## Tech Stack

This project was bootstrapped with [create-t3-app](https://create.t3.gg/), a modern full-stack development toolkit.

### Frontend

- React 19
- Next.js 15 (App Router)
- TailwindCSS 4
- Shadcn UI Component Library

### Backend

- Next.js 15 API Routes
- tRPC
- Drizzle ORM / Prisma

## Project Structure

```
/src
  /app - Next.js application routes
  /components - React components
  /lib - Utility functions
  /server - Server-side code
  /styles - Global styles
```

## Getting Started

### Prerequisites

- Node.js (18.x or higher)
- pnpm (recommended)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs.git
   cd ai-super-agent-yupi-nextjs
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env and add your API keys
   # DASHSCOPE_API_KEY=your_api_key_here
   ```

4. Start the development server
   ```bash
   pnpm dev
   ```

## Using Shadcn UI Registry

This project supports Shadcn UI Registry for quickly adding AI components and functions to your project:

```bash
# Initialize Shadcn UI
pnpm dlx shadcn@latest init

# Add Alibaba Cloud Dashscope AI provider
pnpm dlx shadcn@latest add https://ai-super-agent-yupi-nextjs.hsawana9.com/r/dashscrop-ai-provider.json

# Add text generation API and component
pnpm dlx shadcn@latest add https://ai-super-agent-yupi-nextjs.hsawana9.com/r/nextjs-generate-text-api-and-component-for-dashscrop-ai-provider.json
```

## Available Services

- **Generate Text**: Basic text generation with AI
- **Chatbot**: Interactive AI chat interface
- **Chatbot with Middleware**: Enhanced chatbot with request/response processing
- **Object Generation Notification**: Structured data generation with notifications
- **Chat Persistence**: Chat history saved to file system
- **Chat Database Persistence**: Chat history saved to database

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgements

- [CodeFather.cn](https://www.codefather.cn/) for the original AI Super Agent course
- [Vercel AI SDK](https://sdk.vercel.ai/) for AI integration tools
- [Shadcn UI](https://ui.shadcn.com/) for the component library