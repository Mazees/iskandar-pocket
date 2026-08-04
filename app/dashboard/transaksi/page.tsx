import { FiPlus, FiSearch, FiArrowDownLeft, FiImage } from "react-icons/fi";

export default function TransaksiPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Transaksi Kas &amp; Bank</h1>
          <p className="text-sm text-base-content/70">
            Catatan pengeluaran operasional dan penerimaan umum
          </p>
        </div>
        <button className="btn btn-primary font-semibold">
          <FiPlus className="w-4 h-4 mr-1" />
          Catat Transaksi Baru
        </button>
      </div>

      {/* Filter Toolbar in DaisyUI Card */}
      <div className="card bg-base-200 border border-base-300 shadow-sm">
        <div className="card-body p-4 flex-row flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/50">
                <FiSearch className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Cari keterangan..."
                className="input input-bordered input-sm w-full pl-10"
              />
            </div>

            <select className="select select-bordered select-sm font-medium">
              <option>Semua Kategori</option>
              <option>Sewa Tempat</option>
              <option>Konsumsi</option>
              <option>Transportasi</option>
              <option>Sumbangan</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-base-content/70">
              Total Keluar Bulan Ini:
            </span>
            <span className="badge badge-error badge-lg font-bold text-error-content">
              Rp 750.000
            </span>
          </div>
        </div>
      </div>

      {/* Table Transaksi */}
      <div className="card bg-base-200 shadow-xl border border-base-300">
        <div className="card-body p-0 overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-base-300 text-base-content font-bold">
              <tr>
                <th>Tanggal</th>
                <th className="text-center">Jenis</th>
                <th>Kategori</th>
                <th>Keterangan</th>
                <th className="text-center">Pocket</th>
                <th className="text-center">Bukti</th>
                <th className="text-right">Nominal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-base-content/80">01 Agu 2026</td>
                <td className="text-center">
                  <span className="badge badge-error font-bold gap-1 text-error-content">
                    <FiArrowDownLeft className="w-3.5 h-3.5" />
                    Keluar
                  </span>
                </td>
                <td>
                  <span className="badge badge-neutral font-medium text-xs">
                    Sewa Tempat
                  </span>
                </td>
                <td className="font-medium">
                  DP Sewa Villa untuk Acara Keluarga di Puncak
                </td>
                <td className="text-center font-medium">Bank</td>
                <td className="text-center">
                  <button className="btn btn-xs btn-outline">
                    <FiImage className="w-3.5 h-3.5 mr-1" />1 Struk
                  </button>
                </td>
                <td className="text-right font-extrabold text-error">
                  - Rp 750.000
                </td>
              </tr>

              <tr>
                <td className="text-base-content/80">28 Jul 2026</td>
                <td className="text-center">
                  <span className="badge badge-error font-bold gap-1 text-error-content">
                    <FiArrowDownLeft className="w-3.5 h-3.5" />
                    Keluar
                  </span>
                </td>
                <td>
                  <span className="badge badge-neutral font-medium text-xs">
                    Konsumsi
                  </span>
                </td>
                <td className="font-medium">
                  Pembelian snack dan kopi untuk rapat panitia
                </td>
                <td className="text-center font-medium">Cash</td>
                <td className="text-center">
                  <button className="btn btn-xs btn-outline">
                    <FiImage className="w-3.5 h-3.5 mr-1" />2 Struk
                  </button>
                </td>
                <td className="text-right font-extrabold text-error">
                  - Rp 120.000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
