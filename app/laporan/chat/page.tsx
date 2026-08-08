import { Metadata } from "next";
import { ChatView } from "@/components/chat/chat-view";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { LaporanNavTabs } from "@/components/laporan/laporan-nav-tabs";

export const metadata: Metadata = {
  title: "Tanya Pocky (Publik) | ISPOCKET",
  description: "Tanyakan apa saja tentang kas keluarga kepada Pocky.",
};

export default function PublicChatPage() {
  return (
    <PublicNavbar>
      <main className="max-w-6xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col h-[calc(100dvh-4.5rem)] max-h-[calc(100dvh-4.5rem)] overflow-hidden">
        <LaporanNavTabs />
        
        <div className="flex-1 overflow-hidden mt-4 lg:mt-6 min-h-0 -mx-4 md:mx-0">
          <ChatView isAdmin={false} />
        </div>
      </main>
    </PublicNavbar>
  );
}
