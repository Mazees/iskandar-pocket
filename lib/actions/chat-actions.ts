"use server";

import { generateGeminiResponse } from "@/services/gemini-web";

/**
 * Server Action sebagai penghubung LLM Provider untuk react-agent-js
 * Akan dipanggil langsung dari klien.
 */
export async function llmProviderAction(messages: any[]) {
  try {
    // Batasi history maksimal 10 pesan terakhir (5 interaksi bolak-balik) agar tidak boros token
    const MAX_HISTORY = 10;
    
    // Pesan index 0 selalu SYSTEM_PROMPT dari react-agent-js
    const systemMessage = messages[0];
    let chatHistory = messages.slice(1);
    
    // Jika history terlalu panjang, potong ambil yang paling baru saja
    if (chatHistory.length > MAX_HISTORY) {
      chatHistory = chatHistory.slice(-MAX_HISTORY);
    }
    
    // Gabungkan kembali
    const limitedMessages = [systemMessage, ...chatHistory];

    // Karena Gemini Web RPC Engine yang di-port oleh user menerima prompt berupa satu string panjang,
    // kita perlu merangkai array messages (history + instruksi saat ini) menjadi string.
    const promptStr = limitedMessages
      .map((m) => {
        const prefix = m.role.toUpperCase() === "SYSTEM" ? "SYSTEM INSTRUCTION" : m.role.toUpperCase();
        return `${prefix}:\n${m.content}`;
      })
      .join("\n\n---\n\n");

    const response = await generateGeminiResponse(promptStr);
    return response;
  } catch (error: any) {
    console.error("LLM Provider Error:", error);
    throw new Error(error.message || "Gagal memanggil Gemini Web");
  }
}
