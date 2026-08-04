"use client";

import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FiFileText,
  FiPrinter,
  FiDownload,
  FiCalendar,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiFolder,
  FiCheckCircle,
  FiAlertCircle,
  FiImage,
  FiEye,
} from "react-icons/fi";
import { generateLaporanPDF } from "@/lib/utils/export-pdf";
import { generateLaporanExcel } from "@/lib/utils/export-excel";
import {
  TransaksiDetailModal,
  TransaksiDetailItem,
} from "@/components/transaksi/transaksi-detail-modal";

export interface LaporanPocketItem {
  pocket_id: string;
  nama_pocket: string;
  saldo_awal: number;
  saldo: number;
}

export interface LaporanStatusKKItem {
  keluarga_id: string;
  nama_keluarga: string;
  nominal_setor: number;
  nominal_wajib: number;
  status: "Lunas" | "Kurang" | "Belum Bayar";
}

export interface LaporanTransaksiItem {
  id: string;
  tanggal: string;
  jenis: "masuk" | "keluar";
  nominal: number;
  keterangan?: string;
  bukti_url?: string[];
  pocket: {
    id: string;
    nama_pocket: string;
  };
}

interface LaporanViewProps {
  currentBulanStr: string; // e.g. "2026-08"
  currentTahunStr: string; // e.g. "2026"
  listPocket: LaporanPocketItem[];
  listStatusKK: LaporanStatusKKItem[];
  listTransaksi: LaporanTransaksiItem[];
  totalIuranPeriode: number;
  totalTransaksiMasukPeriode: number;
  totalPengeluaranPeriode: number;
  isPublic?: boolean;
}

export function LaporanView({
  currentBulanStr,
  currentTahunStr,
  listPocket,
  listStatusKK,
  listTransaksi,
  totalIuranPeriode,
  totalTransaksiMasukPeriode,
  totalPengeluaranPeriode,
  isPublic = false,
}: LaporanViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [modeFilter, setModeFilter] = useState<"bulan" | "tahun">("bulan");
  const [selectedBulan, setSelectedBulan] = useState(currentBulanStr);
  const [selectedTahun, setSelectedTahun] = useState(currentTahunStr);

  const [detailData, setDetailData] = useState<TransaksiDetailItem | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Perhitungan Ringkasan Kas
  const totalPemasukan = useMemo(() => {
    return totalIuranPeriode + totalTransaksiMasukPeriode;
  }, [totalIuranPeriode, totalTransaksiMasukPeriode]);

  const saldoBersih = useMemo(() => {
    return totalPemasukan - totalPengeluaranPeriode;
  }, [totalPemasukan, totalPengeluaranPeriode]);

  // Persentase Kelancaran Setoran Iuran KK
  const kelancaranKK = useMemo(() => {
    if (!listStatusKK || listStatusKK.length === 0) return 0;
    const lunasCount = listStatusKK.filter((k) => k.status === "Lunas").length;
    return Math.round((lunasCount / listStatusKK.length) * 100);
  }, [listStatusKK]);

  const handleFilterBulanChange = (val: string) => {
    setSelectedBulan(val);
    const params = new URLSearchParams(searchParams.toString());
    params.set("bulan", val);
    params.delete("tahun");
    router.push(`?${params.toString()}`);
  };

  const handleFilterTahunChange = (val: string) => {
    setSelectedTahun(val);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tahun", val);
    params.delete("bulan");
    router.push(`?${params.toString()}`);
  };

  const periodeLabelFormatted = useMemo(() => {
    if (modeFilter === "bulan") {
      const [y, m] = selectedBulan.split("-");
      const date = new Date(parseInt(y, 10), parseInt(m, 10) - 1, 1);
      return date.toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      });
    }
    return `Tahun ${selectedTahun}`;
  }, [modeFilter, selectedBulan, selectedTahun]);

  // Format data untuk exporter PDF & Excel
  const exportDataFormatted = useMemo(() => {
    return {
      periodeLabel: periodeLabelFormatted,
      totalPemasukan,
      totalPengeluaran: totalPengeluaranPeriode,
      saldoBersih,
      listPocket: listPocket.map((p) => ({
        nama_pocket: p.nama_pocket,
        saldo: p.saldo,
      })),
      statusIuran: listStatusKK.map((s) => ({
        nama_keluarga: s.nama_keluarga,
        nominal_setor: s.nominal_setor,
        status: s.status,
      })),
      listTransaksi: listTransaksi.map((t) => ({
        tanggal: t.tanggal,
        jenis: t.jenis,
        pocket: t.pocket?.nama_pocket || "-",
        keterangan: t.keterangan || "",
        nominal: t.nominal,
      })),
    };
  }, [
    periodeLabelFormatted,
    totalPemasukan,
    totalPengeluaranPeriode,
    saldoBersih,
    listPocket,
    listStatusKK,
    listTransaksi,
  ]);

  const handleExportPDF = () => {
    generateLaporanPDF(exportDataFormatted);
  };

  const handleExportExcel = () => {
    generateLaporanExcel(exportDataFormatted);
  };

  return (
    <div className="space-y-6">
      {/* Header & Export Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FiFileText className="w-7 h-7 text-primary" />
            Laporan Transparansi Kas Keluarga
          </h1>
          <p className="text-sm text-base-content/70">
            Laporan pertanggungjawaban kas transparan untuk seluruh anggota
            keluarga
          </p>
        </div>

        {/* Buttons Export PDF & Excel */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPDF}
            className="btn btn-sm btn-primary font-semibold shadow-xs gap-1.5"
          >
            <FiPrinter className="w-4 h-4" />
            Cetak PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="btn btn-sm btn-outline border-base-300 font-semibold gap-1.5"
          >
            <FiDownload className="w-4 h-4 text-success" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Filter Toolbar Card */}
      <div className="card bg-base-200 border border-base-300 shadow-xs">
        <div className="card-body p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setModeFilter("bulan")}
              className={`btn btn-xs sm:btn-sm font-bold ${
                modeFilter === "bulan" ? "btn-primary" : "btn-ghost"
              }`}
            >
              Laporan Bulanan
            </button>
            <button
              onClick={() => setModeFilter("tahun")}
              className={`btn btn-xs sm:btn-sm font-bold ${
                modeFilter === "tahun" ? "btn-primary" : "btn-ghost"
              }`}
            >
              Laporan Tahunan
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <FiCalendar className="w-4 h-4 text-primary shrink-0" />
            {modeFilter === "bulan" ? (
              <input
                type="month"
                value={selectedBulan}
                onChange={(e) => handleFilterBulanChange(e.target.value)}
                className="input input-bordered input-sm font-semibold text-xs sm:text-sm"
              />
            ) : (
              <select
                value={selectedTahun}
                onChange={(e) => handleFilterTahunChange(e.target.value)}
                className="select select-bordered select-sm font-semibold text-xs sm:text-sm bg-base-100"
              >
                <option value="2026">Tahun 2026</option>
                <option value="2025">Tahun 2025</option>
                <option value="2027">Tahun 2027</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Executive Summary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pemasukan */}
        <div className="card bg-base-200 border border-base-300 shadow-xs">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-base-content/70">
                Pemasukan Kas Periode Ini
              </span>
              <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                <FiTrendingUp className="w-4 h-4" />
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-primary mt-2">
              Rp {totalPemasukan.toLocaleString("id-ID")}
            </h2>
            <p className="text-[11px] text-base-content/60 font-medium">
              Iuran: Rp {totalIuranPeriode.toLocaleString("id-ID")} | Kas Umum:
              Rp {totalTransaksiMasukPeriode.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* Pengeluaran */}
        <div className="card bg-base-200 border border-base-300 shadow-xs">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-base-content/70">
                Pengeluaran Periode Ini
              </span>
              <div className="w-8 h-8 rounded-lg bg-error/15 text-error flex items-center justify-center">
                <FiTrendingDown className="w-4 h-4" />
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-error mt-2">
              Rp {totalPengeluaranPeriode.toLocaleString("id-ID")}
            </h2>
            <p className="text-[11px] text-base-content/60 font-medium">
              Beban operasional &amp; belanja acara
            </p>
          </div>
        </div>

        {/* Saldo Bersih */}
        <div className="card bg-base-200 border border-base-300 shadow-xs">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-base-content/70">
                Saldo Kas Bersih Periode
              </span>
              <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                <FiDollarSign className="w-4 h-4" />
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-primary mt-2">
              Rp {saldoBersih.toLocaleString("id-ID")}
            </h2>
            <p className="text-[11px] text-base-content/60 font-medium">
              Selisih Pemasukan - Pengeluaran
            </p>
          </div>
        </div>

        {/* Kelancaran Setoran Keluarga */}
        <div className="card bg-base-200 border border-base-300 shadow-xs">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-base-content/70">
                Kelancaran Setoran Keluarga
              </span>
              <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                <FiCheckCircle className="w-4 h-4" />
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-primary mt-2">
              {kelancaranKK}%
            </h2>
            <p className="text-[11px] text-base-content/60 font-medium">
              Keluarga yang sudah lunas iuran
            </p>
          </div>
        </div>
      </div>

      {/* Grid Rekap Pocket & Status Iuran Keluarga */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rekap Saldo Pocket */}
        <div className="card bg-base-200 border border-base-300 shadow-lg">
          <div className="card-body p-5">
            <h3 className="font-bold text-base flex items-center gap-2 border-b border-base-300 pb-3">
              <FiFolder className="w-5 h-5 text-primary" />
              Saldo Per Pocket / Akun
            </h3>
            <div className="space-y-3 pt-2">
              {listPocket.map((p) => (
                <div
                  key={p.pocket_id}
                  className="flex items-center justify-between p-3 rounded-xl bg-base-100 border border-base-300"
                >
                  <span className="font-bold text-sm">{p.nama_pocket}</span>
                  <span className="font-extrabold text-primary text-base">
                    Rp {Number(p.saldo || 0).toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabel Status Setoran Iuran Keluarga */}
        <div className="lg:col-span-2 card bg-base-200 border border-base-300 shadow-lg">
          <div className="card-body p-5">
            <h3 className="font-bold text-base flex items-center gap-2 border-b border-base-300 pb-3">
              <FiCheckCircle className="w-5 h-5 text-primary" />
              Status Setoran Iuran Keluarga ({periodeLabelFormatted})
            </h3>

            <div className="overflow-x-auto pt-2">
              <table className="table table-sm w-full text-xs">
                <thead className="bg-base-300 text-base-content font-bold">
                  <tr>
                    <th className="text-left">Nama Keluarga</th>
                    <th className="text-left">Nominal Setor</th>
                    <th className="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {listStatusKK.map((s) => (
                    <tr key={s.keluarga_id}>
                      <td className="text-left font-bold text-sm">
                        {s.nama_keluarga}
                      </td>
                      <td className="text-left font-extrabold text-primary">
                        Rp {Number(s.nominal_setor).toLocaleString("id-ID")}
                      </td>
                      <td className="text-left">
                        <span
                          className={`badge badge-xs font-semibold ${
                            s.status === "Lunas"
                              ? "badge-success text-success-content"
                              : s.status === "Kurang"
                                ? "badge-warning text-warning-content"
                                : "badge-error text-error-content"
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel Detail Transaksi Kas Periode Ini */}
      <div className="card bg-base-200 border border-base-300 shadow-xl">
        <div className="card-body p-5 space-y-3">
          <h3 className="font-bold text-base flex items-center gap-2 border-b border-base-300 pb-3">
            <FiFileText className="w-5 h-5 text-primary" />
            Catatan Transaksi Kas ({periodeLabelFormatted})
          </h3>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-xs">
              <thead className="bg-base-300 text-base-content font-bold">
                <tr>
                  <th>Tanggal</th>
                  <th>Jenis</th>
                  <th>Pocket</th>
                  <th>Keterangan</th>
                  <th className="text-center">Bukti Transaksi</th>
                  <th className="text-right">Nominal</th>
                </tr>
              </thead>
              <tbody>
                {listTransaksi.length > 0 ? (
                  listTransaksi.map((t) => {
                    const isMasuk = t.jenis === "masuk";
                    const hasBukti = t.bukti_url && t.bukti_url.length > 0;
                    return (
                      <tr key={t.id}>
                        <td className="font-medium whitespace-nowrap">
                          {new Date(t.tanggal).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td>
                          <span
                            className={`badge badge-xs font-semibold ${
                              isMasuk
                                ? "badge-success text-success-content"
                                : "badge-error text-error-content"
                            }`}
                          >
                            {isMasuk ? "Masuk" : "Keluar"}
                          </span>
                        </td>
                        <td className="font-semibold text-primary">
                          {t.pocket?.nama_pocket || "-"}
                        </td>
                        <td className="max-w-xs truncate font-medium">
                          {t.keterangan || "-"}
                        </td>
                        <td className="text-center">
                          {hasBukti ? (
                            <button
                              onClick={() => {
                                setDetailData(t);
                                setIsDetailOpen(true);
                              }}
                              className="badge badge-primary badge-sm font-semibold gap-1"
                            >
                              <FiImage className="w-3 h-3" />
                              {t.bukti_url?.length} Foto
                            </button>
                          ) : (
                            <span className="text-base-content/40 italic">
                              Tanpa Bukti
                            </span>
                          )}
                        </td>
                        <td
                          className={`text-right font-extrabold text-sm ${
                            isMasuk ? "text-primary" : "text-error"
                          }`}
                        >
                          {isMasuk ? "+" : "-"} Rp{" "}
                          {Number(t.nominal).toLocaleString("id-ID")}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-6 text-base-content/60"
                    >
                      Belum ada catatan transaksi pada periode ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Lightbox / Detail Modal */}
      <TransaksiDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        data={detailData}
      />
    </div>
  );
}
