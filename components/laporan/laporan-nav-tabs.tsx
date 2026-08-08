"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiCreditCard, FiCpu } from "react-icons/fi";

export function LaporanNavTabs() {
  const pathname = usePathname();
  const isOverview = pathname === "/laporan";
  const isTransaksi = pathname.startsWith("/laporan/transaksi");

  const isChat = pathname.startsWith("/laporan/chat");

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-base-300 pb-4">
      <div>
        <h1 className="text-base sm:text-lg font-bold flex items-center gap-2">
          {isOverview ? (
            <>
              <FiGrid className="w-5 h-5 text-primary shrink-0" />
              <span>Ringkasan Kas Keluarga</span>
            </>
          ) : isTransaksi ? (
            <>
              <FiCreditCard className="w-5 h-5 text-primary shrink-0" />
              <span>Daftar Transaksi Kas Publik</span>
            </>
          ) : (
            <>
              <FiCpu className="w-5 h-5 text-primary shrink-0" />
              <span>Tanya Pocky (Asisten AI)</span>
            </>
          )}
        </h1>
        <p className="text-xs text-base-content/70">
          {isOverview
            ? "Transparansi uang kas keluarga ISPOCKET, mudah dibaca oleh seluruh anggota keluarga."
            : isTransaksi
            ? "Daftar lengkap riwayat pemasukan dan pengeluaran kas beserta bukti foto struk."
            : "Tanyakan apa saja seputar kas dan keuangan keluarga kepada asisten pintar Pocky."}
        </p>
      </div>

      <div className="flex w-full sm:w-auto overflow-x-auto bg-base-200 p-1 rounded-xl border border-base-300 shrink-0">
        <Link
          href="/laporan"
          className={`flex flex-1 sm:flex-none justify-center items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
            isOverview
              ? "bg-primary text-primary-content shadow-sm"
              : "text-base-content/70 hover:text-base-content hover:bg-base-300/50"
          }`}
        >
          <FiGrid className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Ringkasan Kas</span>
          <span className="sm:hidden">Ringkasan</span>
        </Link>
        <Link
          href="/laporan/transaksi"
          className={`flex flex-1 sm:flex-none justify-center items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
            isTransaksi
              ? "bg-primary text-primary-content shadow-sm"
              : "text-base-content/70 hover:text-base-content hover:bg-base-300/50"
          }`}
        >
          <FiCreditCard className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Daftar Transaksi</span>
          <span className="sm:hidden">Transaksi</span>
        </Link>
        <Link
          href="/laporan/chat"
          className={`flex flex-1 sm:flex-none justify-center items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
            pathname.startsWith("/laporan/chat")
              ? "bg-primary text-primary-content shadow-sm"
              : "text-base-content/70 hover:text-base-content hover:bg-base-300/50"
          }`}
        >
          <FiCpu className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Tanya Pocky (AI)</span>
          <span className="sm:hidden">Tanya AI</span>
        </Link>
      </div>
    </div>
  );
}
