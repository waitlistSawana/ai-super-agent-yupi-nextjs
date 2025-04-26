/**
 * Sealos AI 提供商 for AI SDK
 *
 * @author Sawana Huang
 * @date 2025-04-25
 *
 * @description 基于 OpenAI 兼容的 API 实现
 *
 * @see https://sealos.run/docs/guides/ai-proxy
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
export const SEALOS_BASE_URL = "https://aiproxy.hzh.sealos.run/v1";
export const SEALOS_ENVIRONMENT_VARIABLE_NAME = "SEALOS_API_KEY";

/**
 * 1. Define chat model IDs and settings
 * example-chat-settings.ts
 *
 */
import { type OpenAICompatibleChatSettings } from "@ai-sdk/openai-compatible";

export type SealosChatModelId =
  | "deepseek-chat"
  | "deepseek-chat-0324"
  | "deepseek-reasoner"
  | (string & {});

export interface SealosChatSettings extends OpenAICompatibleChatSettings {
  // Specific settings
  sealos?: string;
}

export type SealosCompletionModelId = string & {};

export interface SealosCompletionSettings extends OpenAICompatibleChatSettings {
  // Specific settings
  sealos?: string;
}

export type SealosEmbeddingModelId = string & {};

export interface SealosEmbeddingSettings extends OpenAICompatibleChatSettings {
  // Specific settings
  sealos?: string;
}

export type SealosImageModelId = string & {};

export interface SealosImageSettings extends OpenAICompatibleChatSettings {
  // Specific settings
  sealos?: string;
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

interface SealosProviderSettings {
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

interface SealosProvider {
  /**
Creates a model for text generation.
*/
  (modelId: SealosChatModelId, settings?: SealosChatSettings): LanguageModelV1;

  /**
Creates a chat model for text generation.
*/
  chatModel(
    modelId: SealosChatModelId,
    settings?: SealosChatSettings,
  ): LanguageModelV1;

  /**
Creates a completion model for text generation.
*/
  completionModel(
    modelId: SealosCompletionModelId,
    settings?: SealosCompletionSettings,
  ): LanguageModelV1;

  /**
Creates a text embedding model for text generation.
*/
  textEmbeddingModel(
    modelId: SealosEmbeddingModelId,
    settings?: SealosEmbeddingSettings,
  ): EmbeddingModelV1<string>;

  /**
Creates an image model for image generation.
*/
  imageModel(
    modelId: SealosImageModelId,
    settings?: SealosImageSettings,
  ): ImageModelV1;
}

function createSealos(options: SealosProviderSettings = {}): SealosProvider {
  const baseURL = withoutTrailingSlash(options.baseURL ?? SEALOS_BASE_URL);
  const getHeaders = () => ({
    Authorization: `Bearer ${loadApiKey({
      apiKey: options.apiKey,
      environmentVariableName: SEALOS_ENVIRONMENT_VARIABLE_NAME,
      description: "Sealos API key",
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
    modelId: SealosChatModelId,
    settings: SealosChatSettings = {},
  ) => {
    return new OpenAICompatibleChatLanguageModel(modelId, settings, {
      ...getCommonModelConfig("chat"),
      defaultObjectGenerationMode: "tool",
    });
  };

  const createCompletionModel = (
    modelId: SealosCompletionModelId,
    settings: SealosCompletionSettings = {},
  ) =>
    new OpenAICompatibleCompletionLanguageModel(
      modelId,
      settings,
      getCommonModelConfig("completion"),
    );

  const createTextEmbeddingModel = (
    modelId: SealosEmbeddingModelId,
    settings: SealosEmbeddingSettings = {},
  ) =>
    new OpenAICompatibleEmbeddingModel(
      modelId,
      settings,
      getCommonModelConfig("embedding"),
    );

  const createImageModel = (
    modelId: SealosImageModelId,
    settings: SealosImageSettings = {},
  ) =>
    new OpenAICompatibleImageModel(
      modelId,
      settings,
      getCommonModelConfig("image"),
    );

  const provider = (
    modelId: SealosChatModelId,
    settings?: SealosChatSettings,
  ) => createChatModel(modelId, settings);

  provider.completionModel = createCompletionModel;
  provider.chatModel = createChatModel;
  provider.textEmbeddingModel = createTextEmbeddingModel;
  provider.imageModel = createImageModel;

  return provider;
}

// Export default instance
const sealos = createSealos();

/**
 * 3. Public exports
 * index.ts
 */
export type { SealosProvider, SealosProviderSettings };
export { createSealos, sealos };
