import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
} from "react-icons/fi";

export default function KeluargaPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Daftar Kepala Keluarga</h1>
          <p className="text-sm text-base-content/70">
            Kelola data keluarga peserta iuran kas
          </p>
        </div>
        <button className="btn btn-primary font-semibold">
          <FiPlus className="w-4 h-4 mr-1" />
          Tambah Keluarga Baru
        </button>
      </div>

      {/* Filter & Search Bar in DaisyUI Card */}
      <div className="card bg-base-200 border border-base-300 shadow-sm">
        <div className="card-body p-4 flex-row flex-wrap items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/50">
              <FiSearch className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Cari nama keluarga..."
              className="input input-bordered input-sm w-full pl-10"
            />
          </div>
          <div className="text-xs font-semibold text-base-content/70">
            Total Terdaftar:{" "}
            <span className="text-base-content font-bold">15 Keluarga</span>
          </div>
        </div>
      </div>

      {/* Table Data Keluarga (DaisyUI Table Zebra inside Card) */}
      <div className="card bg-base-200 shadow-xl border border-base-300">
        <div className="card-body p-0 overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-base-300 text-base-content font-bold">
              <tr>
                <th>Nama Keluarga</th>
                <th className="text-center w-36">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary text-primary-content font-bold flex items-center justify-center text-xs">
                      KB
                    </div>
                    <div>
                      <p className="font-bold">Keluarga Budi Iskandar</p>
                      <p className="text-xs text-base-content/70">
                        Terdaftar sejak Jan 2026
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="btn btn-xs btn-outline">
                      <FiEdit2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="btn btn-xs btn-error btn-outline">
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-secondary text-secondary-content font-bold flex items-center justify-center text-xs">
                      KA
                    </div>
                    <div>
                      <p className="font-bold">Keluarga Andi Iskandar</p>
                      <p className="text-xs text-base-content/70">
                        Terdaftar sejak Jan 2026
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="btn btn-xs btn-outline">
                      <FiEdit2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="btn btn-xs btn-error btn-outline">
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
