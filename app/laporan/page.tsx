import Link from "next/link";
import {
  FiArrowLeft,
  FiDollarSign,
  FiUsers,
  FiCheckCircle,
  FiXCircle,
  FiTrendingDown,
  FiTrendingUp,
  FiArrowUpRight,
  FiArrowDownRight,
} from "react-icons/fi";

export default function LaporanPublikPage() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content pb-20">
      {/* Top Navbar */}
      <div className="navbar bg-base-200 border-b border-base-300 px-6 py-3">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Laporan Transparansi Kas</h1>
            <p className="text-xs text-base-content/60">
              Keluarga Besar Iskandar — Dapat diakses publik
            </p>
          </div>
          <Link
            href="/"
            className="btn btn-sm btn-neutral font-semibold rounded-lg"
          >
            <FiArrowLeft className="w-4 h-4 mr-1" />
            Kembali
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 mt-8 space-y-8">
        {/* 3-Column Metric Cards (Replace Stats for 100% predictable neat layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-200 border border-base-300 shadow-sm">
            <div className="card-body p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-base-content/60 uppercase tracking-wider">
                  Total Saldo Kas &amp; Bank
                </span>
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                  <FiDollarSign className="w-5 h-5 text-primary-content" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-primary">
                Rp 4.250.000
              </p>
              <p className="text-xs font-semibold text-accent mt-2 flex items-center gap-1">
                <FiArrowUpRight className="w-4 h-4" />
                + Rp 1.200.000 bulan ini
              </p>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300 shadow-sm">
            <div className="card-body p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-base-content/60 uppercase tracking-wider">
                  Pemasukan Bulan Ini
                </span>
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                  <FiTrendingUp className="w-5 h-5 text-secondary-content" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-secondary">
                Rp 1.500.000
              </p>
              <p className="text-xs font-semibold text-secondary mt-2 flex items-center gap-1">
                <FiArrowUpRight className="w-4 h-4" />
                Dari iuran &amp; setoran kas
              </p>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300 shadow-sm">
            <div className="card-body p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-base-content/60 uppercase tracking-wider">
                  Pengeluaran Bulan Ini
                </span>
                <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                  <FiTrendingDown className="w-5 h-5 text-accent-content" />
                </div>
              </div>
              <p className="text-3xl font-extrabold">Rp 750.000</p>
              <p className="text-xs font-semibold text-error mt-2 flex items-center gap-1">
                <FiArrowDownRight className="w-4 h-4" />
                Bukti struk terlampir di bawah
              </p>
            </div>
          </div>
        </div>

        {/* Status Setoran Bulanan per KK */}
        <div className="card bg-base-200 border border-base-300 shadow-md">
          <div className="card-body p-6">
            <div className="border-b border-base-300 pb-4 mb-2">
              <h2 className="card-title text-lg font-bold">
                Status Setoran per Keluarga
              </h2>
              <p className="text-xs text-base-content/60">
                Catatan partisipasi iuran bulanan (Nominal per bulan: Rp 100.000)
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra w-full text-sm">
                <thead className="bg-base-300 text-base-content font-bold">
                  <tr>
                    <th className="py-3 px-4">Nama Keluarga</th>
                    <th className="py-3 px-4 text-center">Agu 2026</th>
                    <th className="py-3 px-4 text-center">Jul 2026</th>
                    <th className="py-3 px-4 text-center">Jun 2026</th>
                    <th className="py-3 px-4 text-right">Total Terkumpul</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-semibold py-3 px-4">
                      Keluarga Budi Iskandar
                    </td>
                    <td className="text-center">
                      <span className="badge badge-primary font-medium gap-1">
                        <FiCheckCircle className="w-3.5 h-3.5" />
                        Rp 100.000
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="badge badge-primary font-medium gap-1">
                        <FiCheckCircle className="w-3.5 h-3.5" />
                        Rp 100.000
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="badge badge-primary font-medium gap-1">
                        <FiCheckCircle className="w-3.5 h-3.5" />
                        Rp 100.000
                      </span>
                    </td>
                    <td className="text-right font-bold py-3 px-4">
                      Rp 300.000
                    </td>
                  </tr>

                  <tr>
                    <td className="font-semibold py-3 px-4">
                      Keluarga Andi Iskandar
                    </td>
                    <td className="text-center">
                      <span className="badge badge-error font-medium gap-1 text-error-content">
                        <FiXCircle className="w-3.5 h-3.5" />
                        Belum Setor
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="badge badge-primary font-medium gap-1">
                        <FiCheckCircle className="w-3.5 h-3.5" />
                        Rp 150.000
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="badge badge-primary font-medium gap-1">
                        <FiCheckCircle className="w-3.5 h-3.5" />
                        Rp 100.000
                      </span>
                    </td>
                    <td className="text-right font-bold py-3 px-4">
                      Rp 250.000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Riwayat Transaksi Terbaru */}
        <div className="card bg-base-200 border border-base-300 shadow-md">
          <div className="card-body p-6">
            <div className="border-b border-base-300 pb-4 mb-2">
              <h2 className="card-title text-lg font-bold">
                Riwayat Pengeluaran &amp; Transaksi
              </h2>
              <p className="text-xs text-base-content/60">
                Catatan penggunaan dana kas keluarga beserta keterangan
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra w-full text-sm">
                <thead className="bg-base-300 text-base-content font-bold">
                  <tr>
                    <th className="py-3 px-4">Tanggal</th>
                    <th className="py-3 px-4">Kategori</th>
                    <th className="py-3 px-4">Keterangan</th>
                    <th className="py-3 px-4">Pocket</th>
                    <th className="py-3 px-4 text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4">01 Agu 2026</td>
                    <td className="py-3 px-4">
                      <span className="badge badge-neutral font-medium">
                        Sewa Tempat
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      DP Sewa Villa untuk Acara Keluarga di Puncak
                    </td>
                    <td className="py-3 px-4 font-medium">Bank</td>
                    <td className="py-3 px-4 text-right font-bold text-error">
                      - Rp 750.000
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">28 Jul 2026</td>
                    <td className="py-3 px-4">
                      <span className="badge badge-neutral font-medium">
                        Konsumsi
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      Pembelian snack dan kopi untuk rapat panitia rekreasi
                    </td>
                    <td className="py-3 px-4 font-medium">Cash</td>
                    <td className="py-3 px-4 text-right font-bold text-error">
                      - Rp 120.000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
