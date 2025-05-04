import { generateId, type Message } from "ai";

import { existsSync, mkdirSync } from "fs";
import { readdir, readFile, writeFile } from "fs/promises";
import path from "path";

/**
 * Local chat store
 */

export async function createChat(): Promise<string> {
  // generate a unique chat ID
  const id = generateId();
  // create an empty chat file
  await writeFile(getChatFile(id), "[]");
  return id;
}

function getChatFile(id: string): string {
  const chatDir = path.join(process.cwd(), ".chats");
  if (!existsSync(chatDir)) mkdirSync(chatDir, { recursive: true });
  return path.join(chatDir, `${id}.json`);
}

export async function listChats(): Promise<string[]> {
  const chatDir = path.join(process.cwd(), ".chats");
  // if chatDir not exists, return empty array
  if (!existsSync(chatDir)) return [];
  // read all files in chatDir
  const files = await readdir(chatDir);
  // filter out non-json files
  return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => path.basename(file, ".json"));
}

export async function loadChat(id: string): Promise<Message[]> {
  return JSON.parse(await readFile(getChatFile(id), "utf8")) as Message[];
}

export async function saveChat({
  id,
  messages,
}: {
  id: string;
  messages: Message[];
}): Promise<void> {
  const content = JSON.stringify(messages, null, 2);
  await writeFile(getChatFile(id), content);
}
