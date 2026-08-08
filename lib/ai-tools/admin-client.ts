"use client";

import { createTool } from "react-agent-js";
import { baseAgentTools as publicTools } from "./client";
import { createClient } from "@/utils/supabase/client";

// Import Server Actions langsung
import { createKeluarga, updateKeluarga, deleteKeluarga } from "@/lib/actions/keluarga-actions";
import { createIuran, deleteIuran } from "@/lib/actions/iuran-actions";
import { createTransaksi, updateTransaksi, deleteTransaksi, transferSaldo } from "@/lib/actions/transaksi-actions";
import { createConfiguration, deleteConfiguration } from "@/lib/actions/config-actions";
import { createPocket, updatePocket, deletePocket } from "@/lib/actions/pocket-actions";

export const adminAgentTools = [
  ...publicTools,
  
  // --- KELUARGA ---
  createTool(
    "create_keluarga",
    "Menambahkan keluarga baru ke dalam kas. Berikan 1 string nama_keluarga.",
    async (nama: string) => {
      const formData = new FormData();
      formData.append("nama_keluarga", nama);
      const res = await createKeluarga(formData);
      return JSON.stringify(res);
    }
  ),
  createTool(
    "update_keluarga",
    "Mengubah nama keluarga. Berikan parameter dalam bentuk JSON string: {\"nama_lama\": \"...\", \"nama_baru\": \"...\"}",
    async (query: string) => {
      try {
        const args = JSON.parse(query);
        const supabase = createClient();
        const { data } = await supabase.from("keluarga").select("id").ilike("nama_keluarga", args.nama_lama).single();
        if (!data) return JSON.stringify({ error: `Keluarga ${args.nama_lama} tidak ditemukan.` });
        
        const formData = new FormData();
        formData.append("nama_keluarga", args.nama_baru);
        const res = await updateKeluarga(data.id, formData);
        return JSON.stringify(res);
      } catch(e: any) { return JSON.stringify({error: "Parameter harus JSON valid"}) }
    }
  ),
  createTool(
    "delete_keluarga",
    "Menghapus keluarga dari kas. Berikan 1 string nama_keluarga.",
    async (nama: string) => {
      const supabase = createClient();
      const { data } = await supabase.from("keluarga").select("id").ilike("nama_keluarga", nama).single();
      if (!data) return JSON.stringify({ error: `Keluarga ${nama} tidak ditemukan.` });
      
      const res = await deleteKeluarga(data.id);
      return JSON.stringify(res);
    }
  ),
  
  // --- POCKET ---
  createTool(
    "create_pocket",
    "Membuat dompet (pocket) baru. Berikan parameter dalam bentuk JSON string: {\"nama_pocket\": \"...\", \"saldo_awal\": 100000}",
    async (query: string) => {
      try {
        const args = JSON.parse(query);
        const formData = new FormData();
        formData.append("nama_pocket", args.nama_pocket);
        formData.append("saldo_awal", String(args.saldo_awal));
        const res = await createPocket(formData);
        return JSON.stringify(res);
      } catch(e: any) { return JSON.stringify({error: "Parameter harus JSON valid"}) }
    }
  ),
  createTool(
    "update_pocket",
    "Mengubah dompet (pocket). Berikan parameter dalam bentuk JSON string: {\"nama_lama\": \"...\", \"nama_baru\": \"...\", \"saldo_awal\": 100000}",
    async (query: string) => {
      try {
        const args = JSON.parse(query);
        const supabase = createClient();
        const { data } = await supabase.from("pocket").select("id").ilike("nama_pocket", args.nama_lama).single();
        if (!data) return JSON.stringify({ error: `Pocket ${args.nama_lama} tidak ditemukan.` });
        
        const formData = new FormData();
        formData.append("nama_pocket", args.nama_baru);
        formData.append("saldo_awal", String(args.saldo_awal));
        const res = await updatePocket(data.id, formData);
        return JSON.stringify(res);
      } catch(e: any) { return JSON.stringify({error: "Parameter harus JSON valid"}) }
    }
  ),
  createTool(
    "delete_pocket",
    "Menghapus dompet (pocket). Berikan 1 string nama_pocket.",
    async (nama: string) => {
      const supabase = createClient();
      const { data } = await supabase.from("pocket").select("id").ilike("nama_pocket", nama).single();
      if (!data) return JSON.stringify({ error: `Pocket ${nama} tidak ditemukan.` });
      
      const res = await deletePocket(data.id);
      return JSON.stringify(res);
    }
  ),
  
  // --- IURAN ---
  createTool(
    "create_iuran",
    "Mencatat setoran iuran baru. Berikan parameter dalam bentuk JSON string: {\"nama_keluarga\": \"...\", \"nominal\": 100000, \"tanggal_setor\": \"YYYY-MM-DD\", \"nama_pocket\": \"...\", \"keterangan\": \"...\"}",
    async (query: string) => {
      try {
        const args = JSON.parse(query);
        const supabase = createClient();
        
        const { data: kelData } = await supabase.from("keluarga").select("id").ilike("nama_keluarga", args.nama_keluarga).single();
        if (!kelData) return JSON.stringify({ error: `Keluarga ${args.nama_keluarga} tidak ditemukan.` });
        
        const { data: pockData } = await supabase.from("pocket").select("id").ilike("nama_pocket", args.nama_pocket).single();
        if (!pockData) return JSON.stringify({ error: `Pocket ${args.nama_pocket} tidak ditemukan.` });
        
        const formData = new FormData();
        formData.append("keluarga_id", kelData.id);
        formData.append("nominal", String(args.nominal));
        formData.append("tanggal_setor", args.tanggal_setor);
        formData.append("pocket_id", pockData.id);
        if (args.keterangan) formData.append("keterangan", args.keterangan);
        
        const res = await createIuran(formData);
        return JSON.stringify(res);
      } catch(e: any) { return JSON.stringify({error: "Parameter harus JSON valid"}) }
    }
  ),
  createTool(
    "delete_iuran",
    "Membatalkan/menghapus iuran terakhir dari sebuah keluarga pada periode tertentu. Berikan parameter dalam bentuk JSON string: {\"nama_keluarga\": \"...\", \"periode\": \"YYYY-MM\"}",
    async (query: string) => {
      try {
        const args = JSON.parse(query);
        const supabase = createClient();
        const { data: kelData } = await supabase.from("keluarga").select("id").ilike("nama_keluarga", args.nama_keluarga).single();
        if (!kelData) return JSON.stringify({ error: `Keluarga ${args.nama_keluarga} tidak ditemukan.` });
        
        const { data: iuranData } = await supabase.from("iuran").select("id").eq("keluarga_id", kelData.id).eq("periode", args.periode).order("created_at", { ascending: false }).limit(1).single();
        if (!iuranData) return JSON.stringify({ error: `Iuran keluarga ${args.nama_keluarga} periode ${args.periode} tidak ditemukan.` });
        
        const res = await deleteIuran(iuranData.id);
        return JSON.stringify(res);
      } catch(e: any) { return JSON.stringify({error: "Parameter harus JSON valid"}) }
    }
  ),

  // --- TRANSAKSI ---
  createTool(
    "create_transaksi",
    "Mencatat transaksi masuk/keluar. Berikan parameter dalam bentuk JSON string: {\"jenis\": \"masuk|keluar\", \"kategori\": \"...\", \"nominal\": 100000, \"tanggal\": \"YYYY-MM-DD\", \"nama_pocket\": \"...\", \"keterangan\": \"...\"}",
    async (query: string) => {
      try {
        const args = JSON.parse(query);
        const supabase = createClient();
        const { data: pockData } = await supabase.from("pocket").select("id").ilike("nama_pocket", args.nama_pocket).single();
        if (!pockData) return JSON.stringify({ error: `Pocket ${args.nama_pocket} tidak ditemukan.` });
        
        const formData = new FormData();
        formData.append("jenis", args.jenis);
        formData.append("kategori", args.kategori);
        formData.append("nominal", String(args.nominal));
        formData.append("tanggal", args.tanggal);
        formData.append("pocket_id", pockData.id);
        if (args.keterangan) formData.append("keterangan", args.keterangan);
        
        const res = await createTransaksi(formData);
        return JSON.stringify(res);
      } catch(e: any) { return JSON.stringify({error: "Parameter harus JSON valid"}) }
    }
  ),
  createTool(
    "transfer_saldo",
    "Transfer saldo antar pocket. Berikan parameter dalam bentuk JSON string: {\"dari_pocket\": \"...\", \"ke_pocket\": \"...\", \"nominal\": 100000, \"tanggal\": \"YYYY-MM-DD\", \"keterangan\": \"...\"}",
    async (query: string) => {
      try {
        const args = JSON.parse(query);
        const supabase = createClient();
        
        const { data: dariData } = await supabase.from("pocket").select("id").ilike("nama_pocket", args.dari_pocket).single();
        if (!dariData) return JSON.stringify({ error: `Pocket asal ${args.dari_pocket} tidak ditemukan.` });
        
        const { data: keData } = await supabase.from("pocket").select("id").ilike("nama_pocket", args.ke_pocket).single();
        if (!keData) return JSON.stringify({ error: `Pocket tujuan ${args.ke_pocket} tidak ditemukan.` });
        
        const formData = new FormData();
        formData.append("sumber_pocket_id", dariData.id);
        formData.append("tujuan_pocket_id", keData.id);
        formData.append("nominal", String(args.nominal));
        formData.append("tanggal", args.tanggal);
        if (args.keterangan) formData.append("keterangan", args.keterangan);
        
        const res = await transferSaldo(formData);
        return JSON.stringify(res);
      } catch(e: any) { return JSON.stringify({error: "Parameter harus JSON valid"}) }
    }
  ),
  createTool(
    "delete_transaksi",
    "Menghapus transaksi terakhir di suatu pocket dengan kategori tertentu. Berikan JSON string: {\"nama_pocket\": \"...\", \"kategori\": \"...\"}",
    async (query: string) => {
      try {
        const args = JSON.parse(query);
        const supabase = createClient();
        const { data: pockData } = await supabase.from("pocket").select("id").ilike("nama_pocket", args.nama_pocket).single();
        if (!pockData) return JSON.stringify({ error: `Pocket ${args.nama_pocket} tidak ditemukan.` });
        
        const { data: txData } = await supabase.from("transaksi").select("id").eq("pocket_id", pockData.id).ilike("kategori", `%${args.kategori}%`).order("created_at", { ascending: false }).limit(1).single();
        if (!txData) return JSON.stringify({ error: `Transaksi kategori ${args.kategori} di pocket ${args.nama_pocket} tidak ditemukan.` });
        
        const res = await deleteTransaksi(txData.id);
        return JSON.stringify(res);
      } catch(e: any) { return JSON.stringify({error: "Parameter harus JSON valid"}) }
    }
  ),
  
  // --- KONFIGURASI ---
  createTool(
    "create_konfigurasi",
    "Membuat aturan nominal iuran wajib baru. Berikan parameter dalam bentuk JSON string: {\"nominal_iuran_bulanan\": 100000, \"berlaku_mulai\": \"YYYY-MM-DD\"}",
    async (query: string) => {
      try {
        const args = JSON.parse(query);
        const formData = new FormData();
        formData.append("nominal_iuran_bulanan", String(args.nominal_iuran_bulanan));
        formData.append("berlaku_mulai", args.berlaku_mulai);
        const res = await createConfiguration(formData);
        return JSON.stringify(res);
      } catch(e: any) { return JSON.stringify({error: "Parameter harus JSON valid"}) }
    }
  ),
  createTool(
    "delete_konfigurasi",
    "Menghapus konfigurasi (aturan iuran) terakhir yang dibuat. (tidak perlu argumen, isi string sembarang misal 'hapus')",
    async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.from("configuration").select("id").order("created_at", { ascending: false }).limit(1).single();
        if (!data) return JSON.stringify({ error: `Tidak ada konfigurasi untuk dihapus.` });
        
        const res = await deleteConfiguration(data.id);
        return JSON.stringify(res);
      } catch(e: any) { return JSON.stringify({error: e.message}) }
    }
  )
];
