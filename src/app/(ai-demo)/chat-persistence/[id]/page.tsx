import ChatBotPersistence from "@/components/chat-bot-persistence";
import { listChats, loadChat } from "@/lib/ai/persistence/chat-store";

export default async function ChatPersistenceIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // get the chat ID from the URL
  const { id } = await params;
  // load the chat messages
  const messages = await loadChat(id);

  // list all chats
  const chats = await listChats();

  return (
    <div id="ChatPersistenceIdPage" className="max-w-4xl py-20">
      <div>
        <a href="/chat-persistence">New Chat</a>
        <div className="chat-list">
          {chats && chats.length > 0 ? (
            chats.map((chatId) => (
              <div key={chatId} className="chat-item">
                <a href={`/chat-persistence/${chatId}`}>
                  {`chat ${chatId}`}
                  {chatId === id ? " (current)" : " →"}
                </a>
              </div>
            ))
          ) : (
            <div className="no-chats">chat history not found</div>
          )}
        </div>
      </div>

      <h1>Current:</h1>
      <ChatBotPersistence id={id} initialMessages={messages} />
    </div>
  );
}
