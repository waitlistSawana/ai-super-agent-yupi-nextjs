import ChatBot from "@/components/chat-bot";

export default function ChatBotPage() {
  return (
    <div id="ChatbotPage" className="max-w-4xl py-20">
      <div className="py-10 text-center">
        <h1 className="text-3xl font-bold">Welcome to Chatbot Paage</h1>
        <p>FIll input, click submit, then try out the demo.</p>
      </div>

      <ChatBot />
    </div>
  );
}
