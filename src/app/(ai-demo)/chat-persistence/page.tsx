import { createChat } from "@/lib/ai/persistence/chat-store";
import { redirect } from "next/navigation";

export default async function ChatPersistencePage() {
  // create a new chat
  const id = await createChat();
  // redirect to chat page
  redirect(`/chat-persistence/${id}`);
}
