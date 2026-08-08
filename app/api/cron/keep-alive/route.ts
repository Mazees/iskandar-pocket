import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic"; // Memastikan route tidak di-cache oleh Next.js

export async function GET(request: Request) {
  try {
    // Verifikasi Secret Token untuk keamanan (hanya Vercel yang boleh panggil endpoint ini)
    const authHeader = request.headers.get("authorization");
    if (
      process.env.CRON_SECRET &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createClient();

    // Query sangat ringan, hanya meminta 1 row dari tabel configuration untuk memancing aktivitas
    const { data, error } = await supabase
      .from("configuration")
      .select("id")
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows returned, which is fine (the db is still alive)
      throw error;
    }

    return NextResponse.json(
      { success: true, message: "Database keep-alive ping successful", timestamp: new Date().toISOString() },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Keep-alive error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
