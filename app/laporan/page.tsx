import Link from "next/link";
import {
  FiArrowLeft,
  FiDollarSign,
  FiUsers,
  FiCheckCircle,
  FiXCircle,
  FiTrendingDown,
} from "react-icons/fi";

export default function LaporanPublikPage() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content pb-16">
      {/* DaisyUI Navbar */}
      <div className="navbar bg-base-300 shadow-sm px-6">
        <div className="navbar-start">
          <div>
            <h1 className="text-xl font-bold">Laporan Transparansi Kas</h1>
            <p className="text-xs text-base-content/70">
              Keluarga Besar Iskandar — Dapat diakses publik
            </p>
          </div>
        </div>
        <div className="navbar-end">
          <Link href="/" className="btn btn-sm btn-neutral font-medium">
            <FiArrowLeft className="w-4 h-4 mr-1" />
            Kembali
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 mt-8 space-y-8">
        {/* DaisyUI Stats Component (Responsive: vertical on mobile, horizontal on lg) */}
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-200 border border-base-300">
          <div className="stat">
            <div className="stat-figure text-primary">
              <FiDollarSign className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Saldo Kas</div>
            <div className="stat-value text-primary">Rp 4.250.000</div>
            <div className="stat-desc">Akumulasi dompet Cash &amp; Bank</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FiUsers className="w-8 h-8" />
            </div>
            <div className="stat-title">Partisipasi Bulan Ini</div>
            <div className="stat-value text-secondary">12 / 15 KK</div>
            <div className="stat-desc">80% keluarga telah menyetor</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-accent">
              <FiTrendingDown className="w-8 h-8" />
            </div>
            <div className="stat-title">Pengeluaran Bulan Ini</div>
            <div className="stat-value text-accent">Rp 750.000</div>
            <div className="stat-desc">Keterangan &amp; bukti terlampir di bawah</div>
          </div>
        </div>

        {/* Status Setoran Bulanan per KK */}
        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title">
              Status Setoran per Kepala Keluarga
            </h2>
            <p className="text-xs text-base-content/70">
              Catatan partisipasi iuran bulanan (Nominal per bulan: Rp 100.000)
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="table table-zebra w-full text-sm">
                <thead className="bg-base-300 text-base-content font-bold">
                  <tr>
                    <th>Nama Keluarga</th>
                    <th className="text-center">Agu 2026</th>
                    <th className="text-center">Jul 2026</th>
                    <th className="text-center">Jun 2026</th>
                    <th className="text-right">Total Terkumpul</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-semibold">Keluarga Budi Iskandar</td>
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
                    <td className="text-right font-bold">Rp 300.000</td>
                  </tr>

                  <tr>
                    <td className="font-semibold">Keluarga Andi Iskandar</td>
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
                    <td className="text-right font-bold">Rp 250.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Riwayat Transaksi Terbaru */}
        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title">
              Riwayat Pengeluaran &amp; Transaksi
            </h2>
            <p className="text-xs text-base-content/70">
              Catatan penggunaan dana kas keluarga beserta keterangan
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="table table-zebra w-full text-sm">
                <thead className="bg-base-300 text-base-content font-bold">
                  <tr>
                    <th>Tanggal</th>
                    <th>Kategori</th>
                    <th>Keterangan</th>
                    <th>Pocket</th>
                    <th className="text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>01 Agu 2026</td>
                    <td>
                      <span className="badge badge-neutral font-medium">
                        Sewa Tempat
                      </span>
                    </td>
                    <td>DP Sewa Villa untuk Acara Keluarga di Puncak</td>
                    <td className="font-medium">Bank</td>
                    <td className="text-right font-bold text-error">
                      - Rp 750.000
                    </td>
                  </tr>
                  <tr>
                    <td>28 Jul 2026</td>
                    <td>
                      <span className="badge badge-neutral font-medium">
                        Konsumsi
                      </span>
                    </td>
                    <td>Pembelian snack dan kopi untuk rapat panitia rekreasi</td>
                    <td className="font-medium">Cash</td>
                    <td className="text-right font-bold text-error">
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
