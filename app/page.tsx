import Link from "next/link";
import {
  FiEye,
  FiLock,
  FiArrowRight,
  FiCheckCircle,
  FiHeart,
  FiCompass,
  FiShield,
  FiGrid,
} from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content font-sans">
      {/* 1. Official DaisyUI Navbar with Microsoft 365 Green Top Accent Bar */}
      <header className="navbar bg-base-100 border-t-4 border-t-primary border-b border-base-300 px-4 sm:px-8 py-3.5 sticky top-0 z-50">
        <div className="flex-1 min-w-0">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-xs">
              <FiGrid className="w-5 h-5 text-primary-content" />
            </div>
            <div className="truncate">
              <span className="font-bold text-base sm:text-lg block leading-tight truncate tracking-tight">
                ISKANDAR POCKET
              </span>
              <span className="text-xs text-base-content/60 hidden sm:block mt-0.5 font-medium">
                Portal Kas &amp; Transparansi Keuangan Keluarga
              </span>
            </div>
          </Link>
        </div>

        <div className="flex-none flex items-center gap-2 sm:gap-3">
          <Link
            href="/laporan"
            className="btn btn-sm sm:btn-md btn-outline border-base-300 font-semibold rounded-lg shrink-0"
          >
            <FiEye className="w-4 h-4 sm:mr-1" />
            <span className="hidden sm:inline">Laporan Publik</span>
            <span className="sm:hidden">Laporan</span>
          </Link>
          <Link
            href="/login"
            className="btn btn-sm sm:btn-md btn-primary font-semibold rounded-lg shrink-0"
          >
            <FiLock className="w-4 h-4 sm:mr-1" />
            <span className="hidden sm:inline">Login Admin</span>
            <span className="sm:hidden">Login</span>
          </Link>
        </div>
      </header>

      {/* 2. Clean Centered Family Welcoming Hero (Microsoft 365 Clean Sheet Style) */}
      <main className="flex-1 flex flex-col justify-center max-w-4xl mx-auto px-6 py-20 lg:py-28 text-center">
        <div>
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-md bg-secondary text-secondary-content text-xs font-semibold mb-8 border border-primary/20">
            <FiCheckCircle className="w-4 h-4 text-primary" />
            Portal Resmi Keluarga Besar Iskandar
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-base-content">
            Transparansi Kas Keluarga Besar Iskandar
          </h1>

          <p className="text-base sm:text-lg text-base-content/75 max-w-2xl mx-auto leading-relaxed mb-10">
            Dari kita, oleh kita, dan untuk kita. Portal informasi keuangan keluarga untuk memantau iuran bulanan per Keluarga, pengeluaran acara silaturahmi, rekreasi, serta saldo kas bersama secara jujur dan terbuka.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/laporan"
              className="btn btn-primary btn-md sm:btn-lg font-semibold rounded-lg px-8 shadow-xs"
            >
              <FiEye className="w-5 h-5 mr-1.5" />
              Lihat Laporan Keuangan
            </Link>
            <Link
              href="/login"
              className="btn btn-neutral btn-md sm:btn-lg font-semibold rounded-lg px-8 border border-base-300"
            >
              Masuk sebagai Bendahara
              <FiArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </div>
      </main>

      {/* 3. Section: Tujuan & Alokasi Dana Kas Keluarga (Spreadsheet Cell Cards) */}
      <section className="bg-base-200/60 border-t border-base-300 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Tujuan &amp; Alokasi Kas Keluarga
            </h2>
            <p className="text-sm text-base-content/70 mt-2">
              Untuk apa saja dana iuran yang terkumpul dari seluruh keluarga besar kita?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Silaturahmi */}
            <div className="card bg-base-100 border border-base-300 shadow-xs rounded-lg hover:shadow-md transition-shadow">
              <div className="card-body p-6">
                <div className="w-11 h-11 rounded-md bg-secondary flex items-center justify-center mb-3">
                  <FiHeart className="w-5 h-5 text-primary" />
                </div>
                <h3 className="card-title text-lg font-bold">
                  Silaturahmi &amp; Halal Bihalal
                </h3>
                <p className="text-sm text-base-content/75 leading-relaxed mt-1">
                  Mendukung penyelenggaraan pertemuan rutin tahunan, halal bihalal hari raya, dan arisan keluarga besar agar tali persaudaraan selalu erat terjaga.
                </p>
              </div>
            </div>

            {/* Card 2: Rekreasi */}
            <div className="card bg-base-100 border border-base-300 shadow-xs rounded-lg hover:shadow-md transition-shadow">
              <div className="card-body p-6">
                <div className="w-11 h-11 rounded-md bg-secondary flex items-center justify-center mb-3">
                  <FiCompass className="w-5 h-5 text-primary" />
                </div>
                <h3 className="card-title text-lg font-bold">
                  Rekreasi &amp; Liburan Bersama
                </h3>
                <p className="text-sm text-base-content/75 leading-relaxed mt-1">
                  Subsidi biaya sewa penginapan villa, transportasi, hingga konsumsi untuk acara liburan dan rekreasi keluarga besar dari kita dan untuk kita.
                </p>
              </div>
            </div>

            {/* Card 3: Solidaritas */}
            <div className="card bg-base-100 border border-base-300 shadow-xs rounded-lg hover:shadow-md transition-shadow">
              <div className="card-body p-6">
                <div className="w-11 h-11 rounded-md bg-secondary flex items-center justify-center mb-3">
                  <FiShield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="card-title text-lg font-bold">
                  Solidaritas &amp; Duka Cita
                </h3>
                <p className="text-sm text-base-content/75 leading-relaxed mt-1">
                  Dana kebersamaan yang siap disalurkan untuk menjenguk anggota keluarga yang sedang sakit atau musibah sebagai wujud saling peduli.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Official DaisyUI Footer Component */}
      <footer className="footer footer-center bg-base-100 text-base-content py-8 border-t border-base-300">
        <aside>
          <div className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center mx-auto mb-2">
            <FiGrid className="w-4 h-4 text-primary" />
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
