import { FiFileText, FiDownload, FiFile } from "react-icons/fi";

export default function ExportLaporanPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold">Export Laporan Keuangan</h1>
        <p className="text-sm text-base-content/70">
          Unduh dokumen pertanggungjawaban kas keluarga dalam format PDF atau Excel
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-error flex items-center justify-center">
                  <FiFileText className="w-6 h-6 text-error-content" />
                </div>
                <span className="badge badge-error font-bold text-xs uppercase text-error-content">
                  PDF DOKUMEN
                </span>
              </div>
              <h2 className="card-title mt-4">Laporan Rekap Kas Bulanan</h2>
              <p className="text-sm text-base-content/80 mt-2">
                Format siap cetak berisi ringkasan saldo awal, total pemasukan, total pengeluaran, saldo akhir, dan status partisipasi KK.
              </p>
            </div>

            <div className="card-actions mt-6 pt-4 border-t border-base-300">
              <button className="btn btn-primary w-full font-semibold">
                <FiDownload className="w-4 h-4 mr-1.5" />
                Generate Dokumen PDF
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <FiFile className="w-6 h-6 text-accent-content" />
                </div>
                <span className="badge badge-accent font-bold text-xs uppercase text-accent-content">
                  XLSX SPREADSHEET
                </span>
              </div>
              <h2 className="card-title mt-4">Data Mentah Transaksi</h2>
              <p className="text-sm text-base-content/80 mt-2">
                Unduh seluruh tabel riwayat setoran iuran dan mutasi pengeluaran kas dalam bentuk spreadsheet untuk olah data mandiri.
              </p>
            </div>

            <div className="card-actions mt-6 pt-4 border-t border-base-300">
              <button className="btn btn-secondary w-full font-semibold">
                <FiDownload className="w-4 h-4 mr-1.5" />
                Export ke Excel / CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
