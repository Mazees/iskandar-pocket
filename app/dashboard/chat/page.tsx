import { ChatView } from "@/components/chat/chat-view";

export const metadata = {
  title: "Pocky — Asisten ISPOCKET",
  description: "Tanya Pocky mengenai kas keluarga",
};

export default function ChatPage() {
  return (
    <div className="-mx-6 -my-6 lg:-mx-8 lg:-my-8 h-[calc(100vh-8rem)]">
      <ChatView isAdmin={true} />
    </div>
  );
}
