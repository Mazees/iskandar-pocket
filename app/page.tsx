import Link from "next/link";
import {
  FiEye,
  FiLock,
  FiArrowRight,
  FiUsers,
  FiCheckCircle,
  FiDollarSign,
  FiHeart,
  FiCreditCard,
} from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content font-sans">
      {/* Navbar */}
      <header className="navbar bg-base-200 border-b border-base-300 px-4 sm:px-8 py-3">
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <FiHeart className="w-5 h-5 text-primary-content" />
            </div>
            <div>
              <span className="font-bold text-base sm:text-lg block leading-tight">
                Keluarga Besar Iskandar
              </span>
              <span className="text-xs text-base-content/60 block">
                Portal Kas &amp; Transparansi Keuangan
              </span>
            </div>
          </Link>
        </div>
        <div className="navbar-end gap-2">
          <Link
            href="/laporan"
            className="btn btn-sm btn-secondary font-semibold"
          >
            <FiEye className="w-4 h-4 mr-1" />
            Laporan Kas
          </Link>
          <Link href="/login" className="btn btn-sm btn-primary font-semibold">
            <FiLock className="w-4 h-4 mr-1" />
            Login Admin
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-base-200 border border-base-300 text-primary text-xs font-semibold mx-auto mb-6">
          <FiCheckCircle className="w-4 h-4" />
          Portal Resmi Keluarga Besar Iskandar
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
          Transparansi Kas Keluarga Besar Iskandar
        </h1>

        <p className="text-base sm:text-lg text-base-content/75 max-w-2xl mx-auto leading-relaxed mb-8">
          Dari kita, oleh kita, dan untuk kita. Portal informasi keuangan
          keluarga untuk memantau iuran bulanan per Kepala Keluarga, pengeluaran
          acara silaturahmi, rekreasi, serta saldo kas bersama secara jujur dan
          terbuka.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/laporan"
            className="btn btn-primary btn-md sm:btn-lg font-semibold px-6 shadow-md"
          >
            <FiEye className="w-5 h-5 mr-1.5" />
            Lihat Laporan &amp; Bukti Struk
          </Link>
          <Link
            href="/login"
            className="btn btn-neutral btn-md sm:btn-lg font-semibold px-6 border border-base-300"
          >
            Masuk sebagai Bendahara
            <FiArrowRight className="w-5 h-5 ml-1.5" />
          </Link>
        </div>
      </main>

      {/* Info Cards Section - 3 Equal Height Cards */}
      <section className="bg-base-200/50 border-t border-base-300 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-200 border border-base-300 shadow-md">
            <div className="card-body p-6">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-3">
                <FiDollarSign className="w-6 h-6 text-primary-content" />
              </div>
              <h2 className="card-title text-lg font-bold">
                Iuran Bulanan per KK
              </h2>
              <p className="text-sm text-base-content/75 leading-relaxed">
                Nominal iuran standar adalah{" "}
                <strong className="text-primary">Rp 100.000 / bulan</strong>{" "}
                untuk setiap Kepala Keluarga, disetorkan setiap awal bulan untuk
                operasional acara keluarga.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300 shadow-md">
            <div className="card-body p-6">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-3">
                <FiCreditCard className="w-6 h-6 text-secondary-content" />
              </div>
              <h2 className="card-title text-lg font-bold">Cara Pembayaran</h2>
              <p className="text-sm text-base-content/75 leading-relaxed">
                Setoran dapat ditransfer ke rekening resmi kas keluarga atau
                diserahkan secara tunai langsung kepada Bendahara saat pertemuan
                keluarga.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300 shadow-md">
            <div className="card-body p-6">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-3">
                <FiUsers className="w-6 h-6 text-accent-content" />
              </div>
              <h2 className="card-title text-lg font-bold">
                Transparan Untuk Semua
              </h2>
              <p className="text-sm text-base-content/75 leading-relaxed">
                Seluruh anggota keluarga dapat memeriksa arus kas masuk,
                pengeluaran acara, dan foto bukti struk kapan saja tanpa perlu
                mendaftar akun.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center bg-base-300 text-base-content py-6 border-t border-base-300">
        <aside>
          <p className="text-xs font-semibold text-base-content/60">
            &copy; 2026 Keluarga Besar Iskandar — Guyub Rukun &amp; Transparan
          </p>
        </aside>
      </footer>
    </div>
  );
}
