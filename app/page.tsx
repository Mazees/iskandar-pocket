import Link from "next/link";
import {
  FiShield,
  FiEye,
  FiLock,
  FiArrowRight,
  FiUsers,
  FiCheckCircle,
  FiFileText,
} from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      {/* DaisyUI Navbar Component */}
      <div className="navbar bg-base-300 shadow-sm px-4 sm:px-8">
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <FiShield className="w-5 h-5 text-primary-content" />
            </div>
            <div>
              <span className="font-bold text-lg block">Iskandar Pocket</span>
              <span className="text-xs text-base-content/70 block">
                Kas Keluarga Transparan
              </span>
            </div>
          </Link>
        </div>
        <div className="navbar-end gap-2">
          <Link
            href="/laporan"
            className="btn btn-sm btn-secondary font-medium"
          >
            <FiEye className="w-4 h-4 mr-1" />
            Laporan Publik
          </Link>
          <Link href="/login" className="btn btn-sm btn-primary font-medium">
            <FiLock className="w-4 h-4 mr-1" />
            Login Admin
          </Link>
        </div>
      </div>

      {/* DaisyUI Hero Component */}
      <div className="hero flex-1 bg-base-100">
        <div className="hero-content text-center max-w-4xl py-12">
          <div>
            <div className="badge badge-primary badge-lg mb-6 gap-2 font-semibold">
              <FiCheckCircle className="w-4 h-4" />
              Sistem Pengelolaan Kas Keterbukaan Penuh
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
              Kelola Kas Keluarga Secara Terbuka &amp; Terpercaya
            </h1>

            <p className="py-4 text-lg text-base-content/80 max-w-2xl mx-auto">
              Pencatatan iuran per Kepala Keluarga, pengeluaran acara rekreasi, serta saldo kas tunai dan bank yang dapat dipantau oleh seluruh anggota keluarga kapan saja.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              <Link
                href="/laporan"
                className="btn btn-primary btn-lg font-semibold"
              >
                <FiEye className="w-5 h-5 mr-1" />
                Lihat Transparansi Kas
              </Link>
              <Link
                href="/login"
                className="btn btn-neutral btn-lg font-semibold border border-base-300"
              >
                Masuk sebagai Bendahara
                <FiArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section using DaisyUI Cards */}
      <div className="max-w-6xl mx-auto w-full px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-2">
              <FiUsers className="w-6 h-6 text-primary-content" />
            </div>
            <h2 className="card-title">Pencatatan per KK</h2>
            <p className="text-sm text-base-content/80">
              Rekap iuran bulanan dari setiap Kepala Keluarga tersusun rapi per periode tanpa terlewat.
            </p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-2">
              <FiShield className="w-6 h-6 text-secondary-content" />
            </div>
            <h2 className="card-title">Transparan Tanpa Login</h2>
            <p className="text-sm text-base-content/80">
              Seluruh anggota keluarga dapat memeriksa arus kas dan bukti struk langsung melalui tautan publik.
            </p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-2">
              <FiFileText className="w-6 h-6 text-accent-content" />
            </div>
            <h2 className="card-title">Laporan PDF &amp; Excel</h2>
            <p className="text-sm text-base-content/80">
              Unduh rekap bulanan siap cetak untuk dibagikan dalam pertemuan keluarga besar.
            </p>
          </div>
        </div>
      </div>

      {/* DaisyUI Footer Component */}
      <footer className="footer footer-center bg-base-300 text-base-content p-6 border-t border-base-300">
        <aside>
          <p className="text-xs font-semibold">
            &copy; 2026 Iskandar Pocket — Sistem Kas Keluarga
          </p>
        </aside>
      </footer>
    </div>
  );
}
