import ChatBotPersistenceDatabase from "@/components/chat-bot-persistence-database";
import { listChats, loadChat } from "@/lib/ai/persistence/chat-store-database";

export default async function ChatPersistenceIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // get the chat ID from the URL
  const { id } = await params;
  // load the chat messages
  const messages = await loadChat(id);
  // list all chat
  const chats = await listChats();

  return (
    <div id="ChatPersistenceIdPage" className="max-w-4xl py-20">
      <div>
        <a href="/chat-persistence-database">New Chat</a>
        <div className="chat-list">
          {chats && chats.length > 0 ? (
            chats.map((chatId) => (
              <div key={chatId} className="chat-item">
                <a href={`/chat-persistence-database/${chatId}`}>
                  {`chat: ${chatId}`}
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
      <ChatBotPersistenceDatabase id={id} initialMessages={messages} />
    </div>
  );
}
