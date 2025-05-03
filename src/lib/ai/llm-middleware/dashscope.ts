/**
 * Language model middleware
 *
 * Language model middleware is a way to enhance the behavior
 * of language models by intercepting and modifying the calls
 * to the language model.
 *
 * build with dashscope
 *
 * @see https://ai-sdk.dev/docs/ai-sdk-ui/chatbot
 * @see https://ai-sdk.dev/docs/ai-sdk-core/middleware
 *
 * @author Sawana Huang <hsawana9@gmail.com>
 * @date 2025-05-03
 *
 */
import { dashscope } from "@/lib/ai/providers/dashscope";

import {
  wrapLanguageModel,
  extractReasoningMiddleware,
  simulateStreamingMiddleware,
  defaultSettingsMiddleware,
  type LanguageModelV1Middleware,
  type LanguageModelV1StreamPart,
} from "ai";

/**
 * Built-in Middlewares
 *
 */

/**
 * Extract Reasoning Middleware
 *
 * Some providers and models expose reasoning information
 * in the generated text using special tags,
 * e.g. <think> and </think>.
 */
const extractReasoningModel = wrapLanguageModel({
  model: dashscope("deepseek-r1"),
  middleware: extractReasoningMiddleware({ tagName: "think" }),
});

/**
 * Simulate Streaming Middleware
 *
 * Be used to simulate streaming behavior with responses from non-streaming language models
 */
const simulateStreamingModel = wrapLanguageModel({
  model: dashscope("deepseek-v3"),
  middleware: simulateStreamingMiddleware(),
});

/**
 * Default Settings Middleware
 *
 * Apply default settings to a language model.
 */
const defaultSettingsModel = wrapLanguageModel({
  model: dashscope("deepseek-v3"),
  middleware: defaultSettingsMiddleware({
    settings: {
      temperature: 0.5,
      maxTokens: 800,
      // note: use providerMetadata instead of providerOptions here:
      providerMetadata: { openai: { store: false } },
    },
  }),
});

/**
 * Implementing Language Model Middleware
 *
 * customize your own middleware
 *
 * - `transformParams`: Modify the parameters of the language model call.
 * - `wrapGenerate`: wrap the doGenerate function.
 * - `wrapStream`: wrap the doStream function.
 *
 * you can modify the paramers, call the languaage moel,
 * and modify the result. in other words, you can do someting
 * before and after the language model call.
 *
 * following are examples from ai adk
 */

/**
 * Logging Middleware
 */
const loggingMiddleware: LanguageModelV1Middleware = {
  wrapGenerate: async ({ doGenerate, params }) => {
    console.log("doGenerate called");
    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    const result = await doGenerate();

    console.log("doGenerate finished");
    console.log(`generated text: ${result.text}`);

    return result;
  },

  wrapStream: async ({ doStream, params }) => {
    console.log("doStream called");
    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    const { stream, ...rest } = await doStream();

    let generatedText = "";

    const transformStream = new TransformStream<
      LanguageModelV1StreamPart,
      LanguageModelV1StreamPart
    >({
      transform(chunk, controller) {
        if (chunk.type === "text-delta") {
          generatedText += chunk.textDelta;
        }

        controller.enqueue(chunk);
      },

      flush() {
        console.log("doStream finished");
        console.log(`generated text: ${generatedText}`);
      },
    });

    return {
      stream: stream.pipeThrough(transformStream),
      ...rest,
    };
  },
};

const loggingModel = wrapLanguageModel({
  model: dashscope("deepseek-v3"),
  middleware: loggingMiddleware,
});

/**
 * Guardrails
 */
const GuardrailMiddleware: LanguageModelV1Middleware = {
  wrapGenerate: async ({ doGenerate }) => {
    const { text, ...rest } = await doGenerate();

    // filtering approach, e.g. for PII or other sensitive information:
    const cleanedText = text?.replace(/badword/g, "<REDACTED>");

    return { text: cleanedText, ...rest };
  },

  // here you would implement the guardrail logic for streaming
  // Note: streaming guardrails are difficult to implement, because
  // you do not know the full content of the stream until it's finished.
};

const GuardrailModel = wrapLanguageModel({
  model: dashscope("deepseek-v3"),
  middleware: GuardrailMiddleware,
});

/**
 * Public API
 */
export {
  // built-in middlewares
  extractReasoningModel,
  simulateStreamingModel,
  defaultSettingsModel,
  // custom middlewares
  loggingModel,
  GuardrailModel,
};
