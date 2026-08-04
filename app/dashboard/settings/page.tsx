import { FiSettings, FiEdit2, FiShield } from "react-icons/fi";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Pengaturan Sistem Kas</h1>
        <p className="text-sm text-base-content/70">
          Konfigurasi nominal iuran bulanan dan histori kebijakan keuangan
        </p>
      </div>

      <div className="card bg-base-200 shadow-xl border border-base-300">
        <div className="card-body p-6">
          <div className="flex items-center justify-between border-b border-base-300 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <FiSettings className="w-5 h-5 text-primary-content" />
              </div>
              <div>
                <h2 className="card-title text-lg">
                  Nominal Iuran Bulanan per KK
                </h2>
                <p className="text-xs text-base-content/70">
                  Nominal standar yang berlaku untuk setiap Kepala Keluarga
                </p>
              </div>
            </div>
            <button className="btn btn-sm btn-primary font-semibold">
              <FiEdit2 className="w-4 h-4 mr-1" />
              Ubah Nominal
            </button>
          </div>

          <div className="py-4 bg-base-300 rounded-xl px-4 my-2 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-base-content/70 uppercase tracking-wider">
                Nominal Aktif Saat Ini
              </p>
              <p className="text-3xl font-extrabold text-primary mt-1">
                Rp 100.000{" "}
                <span className="text-sm font-normal text-base-content/70">
                  / bulan
                </span>
              </p>
            </div>
            <div className="text-right">
              <span className="badge badge-neutral font-semibold text-xs">
                Berlaku sejak: 01 Agu 2026
              </span>
            </div>
          </div>

          <div className="pt-2">
            <h3 className="font-bold text-sm mb-3">
              Riwayat Perubahan Nominal
            </h3>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full text-sm">
                <thead className="bg-base-300 text-base-content font-bold">
                  <tr>
                    <th>Tanggal Berlaku</th>
                    <th>Nominal</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium">01 Agustus 2026</td>
                    <td className="font-bold text-primary">Rp 100.000</td>
                    <td>
                      <span className="badge badge-success font-semibold text-white">
                        Aktif
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl border border-base-300">
        <div className="card-body flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <FiShield className="w-5 h-5 text-secondary-content" />
            </div>
            <div>
              <h3 className="card-title text-base">Keamanan Akun Admin</h3>
              <p className="text-xs text-base-content/70">
                Dikelola melalui sistem autentikasi Supabase Auth
              </p>
            </div>
          </div>
          <button className="btn btn-sm btn-outline font-medium">
            Kelola Password
          </button>
        </div>
      </div>
    </div>
  );
}
