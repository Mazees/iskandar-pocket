import Link from "next/link";
import {
  FiUsers,
  FiTrendingDown,
  FiTrendingUp,
  FiPlus,
  FiCreditCard,
  FiArrowUpRight,
  FiArrowDownRight,
  FiCheckCircle,
  FiXCircle,
  FiCalendar,
} from "react-icons/fi";
import { MdAccountBalanceWallet } from "react-icons/md";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardOverviewPage() {
  const supabase = await createClient();

  // 1. Ambil data dari 5 View dan 1 Tabel Transaksi Terakhir
  const { data: listPocket } = await supabase
    .from("v_saldo_pocket")
    .select("*");

  const { data: statusBulanIni } = await supabase
    .from("v_status_iuran_bulan_ini")
    .select("*");

  const { data: statusTahunIni } = await supabase
    .from("v_status_iuran_tahun_ini")
    .select("*");

  const { data: rekapBulanIni } = await supabase
    .from("v_rekap_bulan_ini")
    .select("*")
    .single();

  const { data: rekapTahunIni } = await supabase
    .from("v_rekap_tahun_ini")
    .select("*")
    .single();

  const { data: transaksiTerakhir } = await supabase
    .from("transaksi")
    .select("*")
    .order("tanggal", { ascending: false })
    .limit(5);

  // 2. Hitung statistik kartu atas (aman dari TS error & null)
  const totalSaldo =
    (listPocket as any[])?.reduce(
      (acc, item) => acc + Number(item.saldo || 0),
      0,
    ) ?? 0;
  const totalPemasukanBulanIni = Number(
    (rekapBulanIni as any)?.total_pemasukan ?? 0,
  );
  const totalPengeluaran = Number(
    (rekapBulanIni as any)?.total_pengeluaran ?? 0,
  );

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Ringkasan Keuangan</h1>
          <p className="text-sm text-base-content/70">
            Pantau arus kas masuk dari iuran dan pengeluaran operasional
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/iuran"
            className="btn btn-primary font-semibold"
          >
            <FiPlus className="w-4 h-4 mr-1" />
            Catat Iuran Baru
          </Link>
          <Link
            href="/dashboard/transaksi"
            className="btn btn-secondary font-semibold"
          >
            <FiCreditCard className="w-4 h-4 mr-1" />
            Catat Pengeluaran
          </Link>
        </div>
      </div>

      {/* DaisyUI Stats Component (Responsive: vertical on mobile, horizontal on lg) */}
      <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-200 border border-base-300">
        <div className="stat">
          <div className="stat-figure text-primary">
            <MdAccountBalanceWallet className="w-8 h-8" />
          </div>
          <div className="stat-title">Total Saldo Kas</div>
          <div className="stat-value text-primary">
            Rp {totalSaldo.toLocaleString("id-ID")}
          </div>
          <div className="stat-desc">
            Gabungan seluruh dompet kas &amp; rekening
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
            <FiTrendingUp className="w-8 h-8" />
          </div>
          <div className="stat-title">Pemasukan Bulan Ini</div>
          <div className="stat-value text-primary">
            Rp {totalPemasukanBulanIni.toLocaleString("id-ID")}
          </div>
          <div className="stat-desc">Total setoran iuran &amp; kas masuk</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
            <FiTrendingDown className="w-8 h-8" />
          </div>
          <div className="stat-title">Pengeluaran Bulan Ini</div>
          <div className="stat-value text-primary">
            Rp {totalPengeluaran.toLocaleString("id-ID")}
          </div>
          <div className="stat-desc">
            Total pengeluaran operasional &amp; acara
          </div>
        </div>
      </div>

      {/* 1. Ringkasan Bulan Ini */}
      <div className="card bg-base-200 shadow-xl border border-base-300">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="card-title text-lg flex items-center gap-2">
                <FiCalendar className="w-5 h-5 text-primary" />
                Status Setoran Bulan Ini
              </h2>
              <p className="text-xs text-base-content/70">
                Status pembayaran iuran bulanan per Keluarga pada bulan ini
              </p>
            </div>
            <Link
              href="/dashboard/iuran"
              className="btn btn-sm btn-outline font-semibold"
            >
              Lihat Seluruh Iuran &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="table table-zebra w-full text-sm">
              <thead className="bg-base-300 text-base-content font-bold">
                <tr>
                  <th>Nama Keluarga</th>
                  <th className="text-center">Status</th>
                  <th className="text-right">Nominal Setor</th>
                </tr>
              </thead>
              <tbody>
                {statusBulanIni && statusBulanIni.length > 0 ? (
                  (statusBulanIni as any[]).map((item) => (
                    <tr key={item.keluarga_id}>
                      <td className="font-bold">{item.nama_keluarga}</td>
                      <td className="text-center">
                        {item.sudah_setor ? (
                          <span className="badge badge-primary font-semibold gap-1">
                            <FiCheckCircle className="w-3.5 h-3.5" />
                            Sudah Setor
                          </span>
                        ) : (
                          <span className="badge badge-error font-semibold gap-1 text-error-content">
                            <FiXCircle className="w-3.5 h-3.5" />
                            Belum Setor
                          </span>
                        )}
                      </td>
                      <td className="text-right font-extrabold text-primary">
                        Rp{" "}
                        {Number(item.total_setor_bulan_ini || 0).toLocaleString(
                          "id-ID",
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="text-center py-6 text-base-content/60"
                    >
                      Belum ada data keluarga di database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2. Ringkasan Tahun Ini (Opsi 1: Progres Setoran Responsive) */}
      <div className="card bg-base-200 shadow-xl border border-base-300">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="card-title text-lg flex items-center gap-2">
                <FiUsers className="w-5 h-5 text-secondary" />
                Rekap Tahunan per Keluarga
              </h2>
              <p className="text-xs text-base-content/70">
                Rekapitulasi partisipasi iuran tahun berjalan dari Januari
                hingga Desember
              </p>
            </div>
            <span className="badge badge-secondary font-bold">
              Tahun Aktif: {new Date().getFullYear()}
            </span>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="table table-zebra w-full text-sm">
              <thead className="bg-base-300 text-base-content font-bold">
                <tr>
                  <th>Nama Keluarga</th>
                  <th className="text-center">Progres Setoran</th>
                  <th className="text-center">Status Tahunan</th>
                  <th className="text-right">Total Terkumpul</th>
                </tr>
              </thead>
              <tbody>
                {statusTahunIni && statusTahunIni.length > 0 ? (
                  (statusTahunIni as any[]).map((item) => (
                    <tr key={item.keluarga_id}>
                      <td className="font-bold">{item.nama_keluarga}</td>
                      <td className="text-center">
                        <span className="badge badge-neutral font-semibold">
                          {item.jumlah_bulan_setor || 0} / 12 Bulan
                        </span>
                      </td>
                      <td className="text-center">
                        {item.lunas_setahun ? (
                          <span className="badge badge-success font-semibold text-success-content gap-1">
                            <FiCheckCircle className="w-3.5 h-3.5" />
                            Lunas Setahun
                          </span>
                        ) : (
                          <span className="badge badge-warning font-semibold text-warning-content gap-1">
                            Berjalan
                          </span>
                        )}
                      </td>
                      <td className="text-right font-extrabold text-primary">
                        Rp{" "}
                        {Number(item.total_setor_tahun_ini || 0).toLocaleString(
                          "id-ID",
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-6 text-base-content/60"
                    >
                      Belum ada data rekap tahunan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Saldo per Dompet / Pocket & Transaksi Terbaru */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rincian Saldo Dompet */}
        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <h2 className="card-title">Rincian Saldo Dompet</h2>
              <Link
                href="/dashboard/pocket"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Kelola Pocket &rarr;
              </Link>
            </div>

            <div className="space-y-3 mt-2">
              {listPocket && listPocket.length > 0 ? (
                (listPocket as any[]).map((pocket) => (
                  <div
                    key={pocket.pocket_id}
                    className="flex flex-col items-left justify-between p-4 rounded-xl bg-base-300 border border-base-100"
                  >
                    <p className="font-bold">{pocket.nama_pocket}</p>
                    <p className="text-base font-extrabold text-primary">
                      Rp {Number(pocket.saldo || 0).toLocaleString("id-ID")}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-base-content/60 py-4 text-center">
                  Belum ada pocket terdaftar.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Transaksi Terbaru */}
        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <h2 className="card-title">Transaksi Terakhir</h2>
              <Link
                href="/dashboard/transaksi"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Lihat Semua &rarr;
              </Link>
            </div>

            <div className="overflow-x-auto mt-2">
              <table className="table table-zebra w-full text-sm">
                <tbody>
                  {transaksiTerakhir && transaksiTerakhir.length > 0 ? (
                    (transaksiTerakhir as any[]).map((tx) => (
                      <tr key={tx.id}>
                        <td>
                          <p className="font-semibold">{tx.keterangan}</p>
                          <p className="text-xs text-base-content/70">
                            {tx.tanggal} &bull;{" "}
                            <span className="capitalize">{tx.jenis}</span>
                          </p>
                        </td>
                        <td
                          className={`text-right font-bold ${
                            tx.jenis === "masuk" ? "text-success" : "text-error"
                          }`}
                        >
                          {tx.jenis === "masuk" ? "+ " : "- "}
                          Rp {Number(tx.nominal || 0).toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={2}
                        className="text-center py-6 text-base-content/60"
                      >
                        Belum ada riwayat transaksi.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
