"use server";

import { generateGeminiResponse } from "@/services/gemini-web";

/**
 * Server Action sebagai penghubung LLM Provider untuk react-agent-js
 * Akan dipanggil langsung dari klien.
 */
export async function llmProviderAction(messages: any[]) {
  try {
    // Karena Gemini Web RPC Engine yang di-port oleh user menerima prompt berupa satu string panjang,
    // kita perlu merangkai array messages (history + instruksi saat ini) menjadi string.
    const promptStr = messages
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
