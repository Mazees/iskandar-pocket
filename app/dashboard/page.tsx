import Link from "next/link";
import {
  FiDollarSign,
  FiUsers,
  FiTrendingDown,
  FiPlus,
  FiCreditCard,
  FiArrowUpRight,
  FiArrowDownRight,
  FiCheckCircle,
  FiXCircle,
  FiCalendar,
} from "react-icons/fi";

export default function DashboardOverviewPage() {
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
            <FiDollarSign className="w-8 h-8" />
          </div>
          <div className="stat-title">Total Saldo Kas &amp; Bank</div>
          <div className="stat-value text-primary">Rp 4.250.000</div>
          <div className="stat-desc flex items-center gap-1 text-accent font-semibold mt-1">
            <FiArrowUpRight className="w-4 h-4" />
            + Rp 1.200.000 bulan ini
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FiUsers className="w-8 h-8" />
          </div>
          <div className="stat-title">Partisipasi Iuran (Agustus)</div>
          <div className="stat-value text-secondary">12 / 15 KK</div>
          <div className="stat-desc">3 KK belum setor bulan berjalan</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <FiTrendingDown className="w-8 h-8" />
          </div>
          <div className="stat-title">Pengeluaran Bulan Ini</div>
          <div className="stat-value text-accent">Rp 750.000</div>
          <div className="stat-desc flex items-center gap-1 text-error font-semibold mt-1">
            <FiArrowDownRight className="w-4 h-4" />
            Sewa Tempat &amp; Konsumsi
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
                Ringkasan Bulan Ini (Agustus 2026)
              </h2>
              <p className="text-xs text-base-content/70">
                Status pembayaran iuran bulanan per Kepala Keluarga pada bulan berjalan
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
                  <th>Nama KK</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Tanggal Setor</th>
                  <th className="text-right">Nominal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-bold">Keluarga Budi Iskandar</td>
                  <td className="text-center">
                    <span className="badge badge-primary font-semibold gap-1">
                      <FiCheckCircle className="w-3.5 h-3.5" />
                      Sudah Setor
                    </span>
                  </td>
                  <td className="text-center text-base-content/80">
                    01 Agu 2026
                  </td>
                  <td className="text-right font-extrabold text-primary">
                    100K
                  </td>
                </tr>

                <tr>
                  <td className="font-bold">Keluarga Cici Iskandar</td>
                  <td className="text-center">
                    <span className="badge badge-primary font-semibold gap-1">
                      <FiCheckCircle className="w-3.5 h-3.5" />
                      Sudah Setor
                    </span>
                  </td>
                  <td className="text-center text-base-content/80">
                    02 Agu 2026
                  </td>
                  <td className="text-right font-extrabold text-primary">
                    100K
                  </td>
                </tr>

                <tr>
                  <td className="font-bold">Keluarga Andi Iskandar</td>
                  <td className="text-center">
                    <span className="badge badge-error font-semibold gap-1 text-error-content">
                      <FiXCircle className="w-3.5 h-3.5" />
                      Belum Setor
                    </span>
                  </td>
                  <td className="text-center text-base-content/80">-</td>
                  <td className="text-right font-bold text-base-content/50">
                    0
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2. Ringkasan Tahun Ini (12 Bulan + Total) */}
      <div className="card bg-base-200 shadow-xl border border-base-300">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="card-title text-lg flex items-center gap-2">
                <FiUsers className="w-5 h-5 text-secondary" />
                Ringkasan Tahun Ini (2026)
              </h2>
              <p className="text-xs text-base-content/70">
                Rekapitulasi partisipasi iuran tahunan dari Januari hingga Desember per Kepala Keluarga
              </p>
            </div>
            <span className="badge badge-secondary font-bold">
              Tahun Aktif: 2026
            </span>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="table table-zebra w-full text-xs sm:text-sm">
              <thead className="bg-base-300 text-base-content font-bold">
                <tr>
                  <th className="min-w-44">Nama KK</th>
                  <th className="text-center">Jan</th>
                  <th className="text-center">Feb</th>
                  <th className="text-center">Mar</th>
                  <th className="text-center">Apr</th>
                  <th className="text-center">Mei</th>
                  <th className="text-center">Jun</th>
                  <th className="text-center">Jul</th>
                  <th className="text-center">Agu</th>
                  <th className="text-center">Sep</th>
                  <th className="text-center">Okt</th>
                  <th className="text-center">Nov</th>
                  <th className="text-center">Des</th>
                  <th className="text-right font-extrabold text-primary">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-bold">Keluarga Budi</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center font-bold text-primary">100K</td>
                  <td className="text-center font-bold text-primary">100K</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-right font-extrabold text-primary">
                    200K
                  </td>
                </tr>

                <tr>
                  <td className="font-bold">Keluarga Andi</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center font-bold text-primary">150K</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-right font-extrabold text-primary">
                    150K
                  </td>
                </tr>

                <tr>
                  <td className="font-bold">Keluarga Cici</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center font-bold text-primary">100K</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-center">-</td>
                  <td className="text-right font-extrabold text-primary">
                    100K
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Saldo per Dompet / Pocket & Transaksi Terbaru */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="space-y-4 mt-2">
              <div className="flex items-center justify-between p-4 rounded-xl bg-base-300">
                <div>
                  <p className="font-bold">Cash (Tunai Bendahara)</p>
                  <p className="text-xs text-base-content/70">
                    Uang fisik di tangan
                  </p>
                </div>
                <p className="text-lg font-extrabold text-primary">
                  Rp 1.050.000
                </p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-base-300">
                <div>
                  <p className="font-bold">Bank / E-Wallet</p>
                  <p className="text-xs text-base-content/70">
                    Rekening Resmi Kas
                  </p>
                </div>
                <p className="text-lg font-extrabold text-primary">
                  Rp 3.200.000
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaksi Terbaru (Card with Table Zebra) */}
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
                  <tr>
                    <td>
                      <p className="font-semibold">
                        DP Sewa Villa untuk Acara Keluarga
                      </p>
                      <p className="text-xs text-base-content/70">
                        01 Agu 2026 &bull; Sewa Tempat
                      </p>
                    </td>
                    <td className="text-right font-bold text-error">
                      - Rp 750.000
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="font-semibold">
                        Setoran Iuran Keluarga Budi (Agustus)
                      </p>
                      <p className="text-xs text-base-content/70">
                        01 Agu 2026 &bull; Iuran
                      </p>
                    </td>
                    <td className="text-right font-bold text-accent">
                      + Rp 100.000
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
