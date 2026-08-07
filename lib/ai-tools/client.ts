"use client";

import { createTool } from "react-agent-js";
import {
  tool_get_saldo_kas,
  tool_get_tunggakan_bulan_ini,
  tool_get_lunas_bulan_ini,
  tool_get_transaksi_terakhir,
  tool_get_iuran_terakhir,
  tool_get_info_nominal_wajib,
  tool_get_laporan_transaksi_periode,
  tool_get_riwayat_iuran_per_keluarga,
} from "./server";

export const agentTools = [
  createTool(
    "get_saldo_kas",
    "Mendapatkan total uang kas keluarga saat ini dan rincian saldo per dompet (rekening/cash).",
    async () => await tool_get_saldo_kas()
  ),
  createTool(
    "get_keluarga_nunggak",
    "Mendapatkan daftar nama keluarga yang BELUM bayar/menunggak iuran bulan ini.",
    async () => await tool_get_tunggakan_bulan_ini()
  ),
  createTool(
    "get_keluarga_lunas",
    "Mendapatkan daftar nama keluarga yang SUDAH lunas membayar iuran bulan ini.",
    async () => await tool_get_lunas_bulan_ini()
  ),
  createTool(
    "get_transaksi_umum",
    "Mendapatkan riwayat pengeluaran atau pemasukan umum terakhir.",
    async () => await tool_get_transaksi_terakhir()
  ),
  createTool(
    "get_iuran_terakhir",
    "Mendapatkan riwayat setoran iuran terakhir dari anggota keluarga.",
    async () => await tool_get_iuran_terakhir()
  ),
  createTool(
    "get_info_nominal_wajib",
    "Mendapatkan info besaran nominal iuran yang wajib dibayarkan oleh tiap keluarga per bulannya.",
    async () => await tool_get_info_nominal_wajib()
  ),
  createTool(
    "get_laporan_transaksi_periode",
    "Mendapatkan total uang masuk, keluar, dan rincian transaksi berdasarkan periode (format YYYY-MM untuk bulan tertentu, atau YYYY untuk tahun).",
    async (periode: string) => await tool_get_laporan_transaksi_periode(periode)
  ),
  createTool(
    "get_riwayat_iuran_per_keluarga",
    "Mencari tahu apakah keluarga tertentu sudah bayar iuran atau menunggak dengan melihat riwayat pembayaran mereka. Parameter: nama keluarga.",
    async (nama: string) => await tool_get_riwayat_iuran_per_keluarga(nama)
  ),
];
