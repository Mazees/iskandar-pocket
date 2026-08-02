import { FiPlus, FiRefreshCw, FiDollarSign, FiCreditCard } from "react-icons/fi";

export default function PocketPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dompet Pocket (Cash &amp; Bank)</h1>
          <p className="text-sm text-base-content/70">
            Tempat penyimpanan dana kas dan saldo otomatis
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-outline font-semibold">
            <FiRefreshCw className="w-4 h-4 mr-1.5" />
            Transfer Antar Pocket
          </button>
          <button className="btn btn-primary font-semibold">
            <FiPlus className="w-4 h-4 mr-1" />
            Tambah Dompet Baru
          </button>
        </div>
      </div>

      {/* Grid Pocket Cards using DaisyUI Card & Card-Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <span className="badge badge-neutral font-bold text-xs uppercase">
                TUNAI
              </span>
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <FiDollarSign className="w-5 h-5 text-primary-content" />
              </div>
            </div>
            <h2 className="card-title text-2xl font-extrabold mt-2">Cash</h2>
            <p className="text-xs text-base-content/70">
              Uang tunai fisik di tangan bendahara
            </p>
            <p className="text-3xl font-black mt-4 text-primary">
              Rp 1.050.000
            </p>

            <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-base-300">
              <span className="text-xs font-semibold text-base-content/70">
                Saldo Awal: Rp 0
              </span>
              <button className="btn btn-sm btn-ghost text-primary font-semibold">
                Lihat Arus Kas &rarr;
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <span className="badge badge-neutral font-bold text-xs uppercase">
                BANK / E-WALLET
              </span>
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <FiCreditCard className="w-5 h-5 text-secondary-content" />
              </div>
            </div>
            <h2 className="card-title text-2xl font-extrabold mt-2">Bank</h2>
            <p className="text-xs text-base-content/70">
              Rekening Bank &amp; E-Wallet Resmi Kas Keluarga
            </p>
            <p className="text-3xl font-black mt-4 text-secondary">
              Rp 3.200.000
            </p>

            <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-base-300">
              <span className="text-xs font-semibold text-base-content/70">
                Saldo Awal: Rp 0
              </span>
              <button className="btn btn-sm btn-ghost text-primary font-semibold">
                Lihat Arus Kas &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box using DaisyUI Card */}
      <div className="card bg-base-300 border border-base-content/10">
        <div className="card-body">
          <h3 className="card-title text-base">Penghitungan Saldo Otomatis</h3>
          <p className="text-sm text-base-content/80">
            Saldo seluruh dompet dihitung secara langsung dari akumulasi setoran iuran dan transaksi kas masuk/keluar melalui database, sehingga tidak akan terjadi kesalahan pencatatan manual.
          </p>
        </div>
      </div>
    </div>
  );
}
