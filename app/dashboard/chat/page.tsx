import { ChatView } from "@/components/chat/chat-view";

export const metadata = {
  title: "Pocky — Asisten ISPOCKET",
  description: "Tanya Pocky mengenai kas keluarga",
};

export default function ChatPage() {
  return (
    <div className="w-full h-[calc(100vh-8rem)] lg:h-[calc(100vh-9.5rem)]">
      <ChatView />
    </div>
  );
}
