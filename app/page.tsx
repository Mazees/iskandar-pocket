import Link from "next/link";
import {
  FiEye,
  FiLock,
  FiArrowRight,
  FiCheckCircle,
  FiHeart,
  FiCompass,
  FiShield,
} from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content font-sans">
      {/* 1. Official DaisyUI Navbar */}
      <header className="navbar bg-base-200 border-b border-base-300 px-4 sm:px-8 py-3.5 sticky top-0 z-50">
        <div className="flex-1 min-w-0">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-sm">
              <FiHeart className="w-5 h-5 text-primary-content" />
            </div>
            <div className="truncate">
              <span className="font-extrabold text-base sm:text-lg block leading-tight truncate">
                ISKANDAR POCKET
              </span>
              <span className="text-xs text-base-content/60 hidden sm:block mt-0.5">
                Portal Kas &amp; Transparansi Keuangan
              </span>
            </div>
          </Link>
        </div>

        <div className="flex-none flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="btn btn-sm sm:btn-md btn-primary font-bold rounded-xl shrink-0"
          >
            <FiLock className="w-4 h-4 sm:mr-1" />
            <span className="hidden sm:inline">Login Admin</span>
            <span className="sm:hidden">Login</span>
          </Link>
        </div>
      </header>

      {/* 2. Clean Centered Family Welcoming Hero (No Widget Card, No Stats) */}
      <main className="flex-1 flex flex-col justify-center max-w-4xl mx-auto px-6 py-20 lg:py-28 text-center">
        <div>
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-base-200 border border-base-300 text-primary text-xs font-bold mb-8">
            <FiCheckCircle className="w-4 h-4" />
            Portal Resmi Keluarga Besar Iskandar
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Transparansi Kas Keluarga Besar Iskandar
          </h1>

          <p className="text-base sm:text-lg text-base-content/75 max-w-2xl mx-auto leading-relaxed mb-10">
            Dari kita, oleh kita, dan untuk kita. Portal informasi keuangan keluarga untuk memantau iuran bulanan per Kepala Keluarga, pengeluaran acara silaturahmi, rekreasi, serta saldo kas bersama secara jujur dan terbuka.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/laporan"
              className="btn btn-primary btn-md sm:btn-lg font-bold rounded-xl px-8 shadow-lg"
            >
              <FiEye className="w-5 h-5 mr-1.5" />
              Lihat Laporan Keuangan
            </Link>
            <Link
              href="/login"
              className="btn btn-neutral btn-md sm:btn-lg font-bold rounded-xl px-8 border border-base-300"
            >
              Masuk sebagai Bendahara
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* 3. Section: Tujuan & Alokasi Dana Kas Keluarga */}
      <section className="bg-base-200 border-t border-base-300 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Tujuan &amp; Alokasi Kas Keluarga
            </h2>
            <p className="text-base text-base-content/70 mt-3">
              Untuk apa saja dana iuran yang terkumpul dari seluruh keluarga besar kita?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Silaturahmi */}
            <div className="card bg-base-300 border border-base-content/10 shadow-xl rounded-2xl">
              <div className="card-body p-8">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4">
                  <FiHeart className="w-7 h-7 text-primary-content" />
                </div>
                <h3 className="card-title text-xl font-bold">
                  Silaturahmi &amp; Halal Bihalal
                </h3>
                <p className="text-sm text-base-content/75 leading-relaxed mt-2">
                  Mendukung penyelenggaraan pertemuan rutin tahunan, halal bihalal hari raya, dan arisan keluarga besar agar tali persaudaraan selalu erat terjaga.
                </p>
              </div>
            </div>

            {/* Card 2: Rekreasi */}
            <div className="card bg-base-300 border border-base-content/10 shadow-xl rounded-2xl">
              <div className="card-body p-8">
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                  <FiCompass className="w-7 h-7 text-secondary-content" />
                </div>
                <h3 className="card-title text-xl font-bold">
                  Rekreasi &amp; Liburan Bersama
                </h3>
                <p className="text-sm text-base-content/75 leading-relaxed mt-2">
                  Subsidi biaya sewa penginapan villa, transportasi, hingga konsumsi untuk acara liburan dan rekreasi keluarga besar dari kita dan untuk kita.
                </p>
              </div>
            </div>

            {/* Card 3: Solidaritas */}
            <div className="card bg-base-300 border border-base-content/10 shadow-xl rounded-2xl">
              <div className="card-body p-8">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-4">
                  <FiShield className="w-7 h-7 text-accent-content" />
                </div>
                <h3 className="card-title text-xl font-bold">
                  Solidaritas &amp; Duka Cita
                </h3>
                <p className="text-sm text-base-content/75 leading-relaxed mt-2">
                  Dana kebersamaan yang siap disalurkan untuk menjenguk anggota keluarga yang sedang sakit atau musibah sebagai wujud saling peduli.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Official DaisyUI Footer Component */}
      <footer className="footer footer-center bg-base-300 text-base-content py-8 border-t border-base-content/10">
        <aside>
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mx-auto mb-2">
            <FiHeart className="w-5 h-5 text-primary-content" />
          </div>
          <p className="text-sm font-bold">
            Keluarga Besar Iskandar
          </p>
          <p className="text-xs font-semibold text-base-content/60">
            &copy; 2026 — Guyub Rukun, Transparan &amp; Selamanya Bersatu
          </p>
        </aside>
      </footer>
    </div>
  );
}
