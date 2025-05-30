import { ChatInterface } from "@/components/messaging/chat-interface";

export default function MessagingPage() {
  return (
    <div className="container mx-auto h-full flex flex-col overflow-hidden">
      <h1 className="text-3xl font-bold mb-6 tracking-tight">Messages</h1>
      <div className="w-full overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
}
