"use server";

import { createClient } from "@/utils/supabase/server";

/**
 * TOOLS UNTUK ASISTEN AI
 * ----------------------
 * Kumpulan fungsi yang bisa dipanggil oleh AI (react-agent-js) untuk
 * mendapatkan konteks keuangan keluarga dari database Supabase.
 */

// 1. Tool: Cek Saldo Kas (Dompet/Rekening)
export async function tool_get_saldo_kas() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("v_saldo_pocket")
      .select("nama_pocket, saldo");

    if (error) throw error;
    
    const totalSemua = data.reduce((acc, curr) => acc + Number(curr.saldo), 0);
    
    return JSON.stringify({
      status: "success",
      total_kas_keseluruhan: totalSemua,
      rincian_dompet: data,
    });
  } catch (err: any) {
    return JSON.stringify({ status: "error", message: err.message });
  }
}

// 2. Tool: Cek Laporan Status Iuran Seluruh Keluarga per Periode
export async function tool_get_iuran_periode(periode: string) {
  try {
    const supabase = await createClient();
    
    // Validasi format periode YYYY-MM
    if (!/^\d{4}-\d{2}$/.test(periode)) {
      return JSON.stringify({ status: "error", message: "Format periode harus YYYY-MM (contoh: 2026-08)" });
    }
    
    // Ambil semua keluarga
    const { data: keluargaList, error: kelError } = await supabase.from("keluarga").select("id, nama_keluarga");
    if (kelError) throw kelError;
    
    // Ambil iuran pada periode tersebut
    const { data: iuranList, error: iuranError } = await supabase
      .from("iuran")
      .select("keluarga_id, nominal")
      .eq("periode", periode);
    if (iuranError) throw iuranError;

    // Jumlahkan nominal per keluarga
    const mapIuran = new Map();
    iuranList.forEach(i => {
      mapIuran.set(i.keluarga_id, (mapIuran.get(i.keluarga_id) || 0) + i.nominal);
    });

    const result = keluargaList.map(k => {
      const nominal = mapIuran.get(k.id) || 0;
      return {
        id_keluarga: k.id,
        nama_keluarga: k.nama_keluarga,
        nominal_dibayar: nominal,
        status: nominal > 0 ? "Lunas" : "Belum Bayar"
      };
    });

    return JSON.stringify({
      status: "success",
      periode: periode,
      total_keluarga: result.length,
      jumlah_lunas: result.filter(r => r.status === "Lunas").length,
      jumlah_belum_bayar: result.filter(r => r.status === "Belum Bayar").length,
      daftar_iuran: result,
    });
  } catch (err: any) {
    return JSON.stringify({ status: "error", message: err.message });
  }
}

// 4. Tool: Cek Riwayat Transaksi Terakhir (Limit 10)
export async function tool_get_transaksi_terakhir(limit = 10) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("transaksi")
      .select(`
        tanggal, 
        jenis, 
        nominal, 
        keterangan,
        pocket:pocket_id (nama_pocket)
      `)
      .order("tanggal", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    return JSON.stringify({
      status: "success",
      riwayat_transaksi: data,
    });
  } catch (err: any) {
    return JSON.stringify({ status: "error", message: err.message });
  }
}

// 5. Tool: Cek Riwayat Setoran Iuran Terakhir (Limit 10)
export async function tool_get_iuran_terakhir(limit = 10) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("iuran")
      .select(`
        periode,
        tanggal_setor,
        nominal,
        keluarga:keluarga_id (nama_keluarga),
        pocket:pocket_id (nama_pocket)
      `)
      .order("tanggal_setor", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    return JSON.stringify({
      status: "success",
      riwayat_iuran: data,
    });
  } catch (err: any) {
    return JSON.stringify({ status: "error", message: err.message });
  }
}

// 6. Tool: Cek Aturan Nominal Wajib Bulanan Saat Ini
export async function tool_get_info_nominal_wajib() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("configuration")
      .select("nominal_iuran_bulanan")
      .order("berlaku_mulai", { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;

    return JSON.stringify({
      status: "success",
      nominal_iuran_wajib_per_bulan: data.nominal_iuran_bulanan,
    });
  } catch (err: any) {
    return JSON.stringify({ status: "error", message: err.message });
  }
}

// 7. Tool: Laporan Transaksi per Periode (Bulan/Tahun)
export async function tool_get_laporan_transaksi_periode(periode: string) {
  try {
    const supabase = await createClient();
    let startDate = "";
    let endDate = "";

    if (periode.length === 4) {
      startDate = `${periode}-01-01`;
      endDate = `${periode}-12-31`;
    } else if (periode.length === 7) {
      const [year, month] = periode.split("-");
      startDate = `${periode}-01`;
      const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
      endDate = `${periode}-${lastDay}`;
    } else {
      return JSON.stringify({ status: "error", message: "Format periode harus YYYY atau YYYY-MM" });
    }

    const { data, error } = await supabase
      .from("transaksi")
      .select("tanggal, jenis, nominal, keterangan")
      .gte("tanggal", startDate)
      .lte("tanggal", endDate);

    if (error) throw error;

    const totalMasuk = data.filter(d => d.jenis === "masuk").reduce((acc, curr) => acc + curr.nominal, 0);
    const totalKeluar = data.filter(d => d.jenis === "keluar").reduce((acc, curr) => acc + curr.nominal, 0);

    return JSON.stringify({
      status: "success",
      periode: periode,
      total_transaksi_masuk: totalMasuk,
      total_transaksi_keluar: totalKeluar,
      detail_transaksi: data,
    });
  } catch (err: any) {
    return JSON.stringify({ status: "error", message: err.message });
  }
}

// 8. Tool: Riwayat Iuran Spesifik per Keluarga
export async function tool_get_riwayat_iuran_per_keluarga(nama_keluarga: string) {
  try {
    const supabase = await createClient();
    
    // Cari ID keluarga berdasarkan nama (case-insensitive search / LIKE)
    const { data: keluargaData, error: kelError } = await supabase
      .from("keluarga")
      .select("id, nama_keluarga")
      .ilike("nama_keluarga", `%${nama_keluarga}%`);
      
    if (kelError) throw kelError;
    if (!keluargaData || keluargaData.length === 0) {
      return JSON.stringify({ status: "not_found", message: `Keluarga dengan nama mirip '${nama_keluarga}' tidak ditemukan.` });
    }

    // Ambil riwayat iuran untuk keluarga-keluarga yang cocok
    const keluargaIds = keluargaData.map(k => k.id);
    const { data: iuranData, error: iuranError } = await supabase
      .from("iuran")
      .select("periode, tanggal_setor, nominal, keluarga:keluarga_id (nama_keluarga)")
      .in("keluarga_id", keluargaIds)
      .order("periode", { ascending: false });

    if (iuranError) throw iuranError;

    return JSON.stringify({
      status: "success",
      keluarga_ditemukan: keluargaData.map(k => k.nama_keluarga),
      riwayat_pembayaran: iuranData,
    });
  } catch (err: any) {
    return JSON.stringify({ status: "error", message: err.message });
  }
}

// 9. Tool: Mendapatkan daftar semua keluarga
export async function tool_get_list_keluarga() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("keluarga")
      .select("nama_keluarga")
      .order("nama_keluarga", { ascending: true });

    if (error) throw error;

    return JSON.stringify({
      status: "success",
      total_keluarga: data.length,
      daftar_keluarga: data.map((k) => k.nama_keluarga),
    });
  } catch (err: any) {
    return JSON.stringify({ status: "error", message: err.message });
  }
}
