import { FiPlus, FiSearch } from "react-icons/fi";

export default function IuranPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Catatan Setoran Iuran</h1>
          <p className="text-sm text-base-content/70">
            Daftar pembayaran iuran bulanan per Kepala Keluarga
          </p>
        </div>
        <button className="btn btn-primary font-semibold">
          <FiPlus className="w-4 h-4 mr-1" />
          Catat Setoran Baru
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
                placeholder="Cari nama KK..."
                className="input input-bordered input-sm w-full pl-10"
              />
            </div>

            <select className="select select-bordered select-sm font-medium">
              <option>Periode: Agustus 2026</option>
              <option>Periode: Juli 2026</option>
              <option>Periode: Juni 2026</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-base-content/70">
              Total Terkumpul Bulan Ini:
            </span>
            <span className="badge badge-primary badge-lg font-bold">
              Rp 1.200.000
            </span>
          </div>
        </div>
      </div>

      {/* Table Setoran Iuran */}
      <div className="card bg-base-200 shadow-xl border border-base-300">
        <div className="card-body p-0 overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-base-300 text-base-content font-bold">
              <tr>
                <th>Nama KK</th>
                <th className="text-center">Periode</th>
                <th className="text-center">Tanggal Setor</th>
                <th className="text-center">Metode</th>
                <th className="text-center">Pocket</th>
                <th className="text-right">Nominal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold">Keluarga Budi Iskandar</td>
                <td className="text-center">
                  <span className="badge badge-neutral font-medium text-xs">
                    2026-08
                  </span>
                </td>
                <td className="text-center text-base-content/80">01 Agu 2026</td>
                <td className="text-center">
                  <span className="badge badge-outline text-xs font-semibold">
                    Transfer Bank
                  </span>
                </td>
                <td className="text-center font-medium">Bank</td>
                <td className="text-right font-extrabold text-primary">
                  + Rp 100.000
                </td>
              </tr>

              <tr>
                <td className="font-bold">Keluarga Cici Iskandar</td>
                <td className="text-center">
                  <span className="badge badge-neutral font-medium text-xs">
                    2026-08
                  </span>
                </td>
                <td className="text-center text-base-content/80">02 Agu 2026</td>
                <td className="text-center">
                  <span className="badge badge-outline text-xs font-semibold">
                    Tunai (Cash)
                  </span>
                </td>
                <td className="text-center font-medium">Cash</td>
                <td className="text-right font-extrabold text-primary">
                  + Rp 100.000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
