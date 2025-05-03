/**
 * 阿里云 智能体调用
 *
 * TODO
 *
 * @author Sawana Huang
 * @date 2025-04-26
 *
 * @see https://bailian.console.aliyun.com/?tab=api#/api/?type=app&url=https%3A%2F%2Fhelp.aliyun.com%2Fdocument_detail%2F2846133.html
 */

import * as z from "zod";

/**
 * Successful response schema
 */
export const OutputSchema = z.object({
  finish_reason: z.string(),
  session_id: z.string(),
  text: z.string(),
});
export type Output = z.infer<typeof OutputSchema>;

export const ModelSchema = z.object({
  output_tokens: z.number(),
  model_id: z.string(),
  input_tokens: z.number(),
});
export type Model = z.infer<typeof ModelSchema>;

export const UsageSchema = z.object({
  models: z.array(ModelSchema),
});
export type Usage = z.infer<typeof UsageSchema>;

export const DashscopeBotResponseSchema = z.object({
  output: OutputSchema,
  usage: UsageSchema,
  request_id: z.string(),
});
export type DashscopeBotResponse = z.infer<typeof DashscopeBotResponseSchema>;

/**
 * Failed response schema
 */
export const DashscopeBotErrorSchema = z.object({
  request_id: z.string(),
  code: z.string(),
  message: z.string(),
});
export type DashscopeBotError = z.infer<typeof DashscopeBotErrorSchema>;

/**
 *
 */
