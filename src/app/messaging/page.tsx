import { ChatInterface } from "@/components/messaging/chat-interface";
import { Suspense } from "react";

export default function MessagingPage() {
  return (
    <div className="container mx-auto h-full flex flex-col overflow-hidden">
      <h1 className="text-3xl font-bold mb-6 tracking-tight">Messages</h1>
      <div className="w-full overflow-hidden">
        <Suspense fallback={<div className="flex items-center justify-center h-[70vh]"><div className="h-8 w-8 rounded-full border-4 border-t-transparent border-accent animate-spin"></div></div>}>
          <ChatInterface />
        </Suspense>
      </div>
    </div>
  );
}
