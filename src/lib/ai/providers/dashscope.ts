/**
 * 阿里云百炼 AI 提供商 for AI SDK
 *
 * @author Sawana Huang
 * @date 2025-04-25
 *
 * @description 基于 OpenAI 兼容的 API 实现
 *
 * @see https://bailian.console.aliyun.com/?tab=api#/api/?type=model&url=https%3A%2F%2Fhelp.aliyun.com%2Fdocument_detail%2F2833609.html&renderType=iframe
 * @see https://sdk.vercel.ai/providers/openai-compatible-providers/custom-providers
 *
 * IMPORTANT:
 * - The model ids should be defined manually
 * - Model id types: chat, completion, embedding, and image
 * - Add "DASHSCOPE_API_KEY" in your .env file
 */

/**
 * Set up the base URL and environment variable name
 */
export const DASHSCOPE_BASE_URL =
  "https://dashscope.aliyuncs.com/compatible-mode/v1";
export const DASHSCOPE_ENVIRONMENT_VARIABLE_NAME = "DASHSCOPE_API_KEY";

/**
 * 1. Define chat model IDs and settings
 * example-chat-settings.ts
 *
 */
import { type OpenAICompatibleChatSettings } from "@ai-sdk/openai-compatible";

export type DashscopeChatModelId =
  | "qwen-plus"
  | "qwen-turbo"
  | "deepseek-v3"
  | "deepseek-r1"
  | (string & {});

export interface DashscopeChatSettings extends OpenAICompatibleChatSettings {
  // Specific settings
  dashscope?: string;
}

export type DashscopeCompletionModelId = string & {};

export interface DashscopeCompletionSettings
  extends OpenAICompatibleChatSettings {
  // Specific settings
  dashscope?: string;
}

export type DashscopeEmbeddingModelId = string & {};

export interface DashscopeEmbeddingSettings
  extends OpenAICompatibleChatSettings {
  // Specific settings
  dashscope?: string;
}

export type DashscopeImageModelId = string & {};

export interface DashscopeImageSettings extends OpenAICompatibleChatSettings {
  // Specific settings
  dashscope?: string;
}

/**
 * 2. Main provider implementation
 * example-provider.ts
 */
import type {
  LanguageModelV1,
  EmbeddingModelV1,
  ImageModelV1,
} from "@ai-sdk/provider";
import {
  OpenAICompatibleChatLanguageModel,
  OpenAICompatibleCompletionLanguageModel,
  OpenAICompatibleEmbeddingModel,
  OpenAICompatibleImageModel,
} from "@ai-sdk/openai-compatible";
import {
  type FetchFunction,
  loadApiKey,
  withoutTrailingSlash,
} from "@ai-sdk/provider-utils";
// Import your model id and settings here.

interface DashscopeProviderSettings {
  /**
Example API key.
*/
  apiKey?: string;
  /**
Base URL for the API calls.
*/
  baseURL?: string;
  /**
Custom headers to include in the requests.
*/
  headers?: Record<string, string>;
  /**
Optional custom url query parameters to include in request urls.
*/
  queryParams?: Record<string, string>;
  /**
Custom fetch implementation. You can use it as a middleware to intercept requests,
or to provide a custom fetch implementation for e.g. testing.
*/
  fetch?: FetchFunction;
}

interface DashscopeProvider {
  /**
Creates a model for text generation.
*/
  (
    modelId: DashscopeChatModelId,
    settings?: DashscopeChatSettings,
  ): LanguageModelV1;

  /**
Creates a chat model for text generation.
*/
  chatModel(
    modelId: DashscopeChatModelId,
    settings?: DashscopeChatSettings,
  ): LanguageModelV1;

  /**
Creates a completion model for text generation.
*/
  completionModel(
    modelId: DashscopeCompletionModelId,
    settings?: DashscopeCompletionSettings,
  ): LanguageModelV1;

  /**
Creates a text embedding model for text generation.
*/
  textEmbeddingModel(
    modelId: DashscopeEmbeddingModelId,
    settings?: DashscopeEmbeddingSettings,
  ): EmbeddingModelV1<string>;

  /**
Creates an image model for image generation.
*/
  imageModel(
    modelId: DashscopeImageModelId,
    settings?: DashscopeImageSettings,
  ): ImageModelV1;
}

function createDashscope(
  options: DashscopeProviderSettings = {},
): DashscopeProvider {
  const baseURL = withoutTrailingSlash(options.baseURL ?? DASHSCOPE_BASE_URL);
  const getHeaders = () => ({
    Authorization: `Bearer ${loadApiKey({
      apiKey: options.apiKey,
      environmentVariableName: DASHSCOPE_ENVIRONMENT_VARIABLE_NAME,
      description: "Dashscope API key",
    })}`,
    ...options.headers,
  });

  interface CommonModelConfig {
    provider: string;
    url: ({ path }: { path: string }) => string;
    headers: () => Record<string, string>;
    fetch?: FetchFunction;
  }

  const getCommonModelConfig = (modelType: string): CommonModelConfig => ({
    provider: `example.${modelType}`,
    url: ({ path }) => {
      const url = new URL(`${baseURL}${path}`);
      if (options.queryParams) {
        url.search = new URLSearchParams(options.queryParams).toString();
      }
      return url.toString();
    },
    headers: getHeaders,
    fetch: options.fetch,
  });

  const createChatModel = (
    modelId: DashscopeChatModelId,
    settings: DashscopeChatSettings = {},
  ) => {
    return new OpenAICompatibleChatLanguageModel(modelId, settings, {
      ...getCommonModelConfig("chat"),
      defaultObjectGenerationMode: "tool",
    });
  };

  const createCompletionModel = (
    modelId: DashscopeCompletionModelId,
    settings: DashscopeCompletionSettings = {},
  ) =>
    new OpenAICompatibleCompletionLanguageModel(
      modelId,
      settings,
      getCommonModelConfig("completion"),
    );

  const createTextEmbeddingModel = (
    modelId: DashscopeEmbeddingModelId,
    settings: DashscopeEmbeddingSettings = {},
  ) =>
    new OpenAICompatibleEmbeddingModel(
      modelId,
      settings,
      getCommonModelConfig("embedding"),
    );

  const createImageModel = (
    modelId: DashscopeImageModelId,
    settings: DashscopeImageSettings = {},
  ) =>
    new OpenAICompatibleImageModel(
      modelId,
      settings,
      getCommonModelConfig("image"),
    );

  const provider = (
    modelId: DashscopeChatModelId,
    settings?: DashscopeChatSettings,
  ) => createChatModel(modelId, settings);

  provider.completionModel = createCompletionModel;
  provider.chatModel = createChatModel;
  provider.textEmbeddingModel = createTextEmbeddingModel;
  provider.imageModel = createImageModel;

  return provider;
}

// Export default instance
const dashscope = createDashscope();

/**
 * 3. Public exports
 * index.ts
 */
export type { DashscopeProvider, DashscopeProviderSettings };
export { createDashscope, dashscope };
