import Link from "next/link";
import Image from "next/image";
import {
  FiEye,
  FiArrowRight,
  FiCheckCircle,
  FiHeart,
  FiCompass,
  FiSmile,
  FiGrid,
} from "react-icons/fi";
import { PublicNavbar } from "@/components/layout/public-navbar";

export default function Home() {
  return (
    <PublicNavbar>
      {/* 1. Clean Centered Family Welcoming Hero */}
      <main className="relative w-full h-[calc(100vh-72px)]">
        <Image
          src="/bg-hero.jpeg"
          alt="Latar belakang hero"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="bg-black/70 h-full w-full absolute left-0 top-0 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-md bg-secondary text-white text-xs font-semibold mb-8 border border-primary/20">
            Portal Resmi Keluarga Besar Bapak Iskandar
          </div>

          <h1 className="text-3xl lg:text-5xl max-w-3xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-white">
            Transparansi Kas Keluarga Besar Bapak Iskandar
          </h1>

          <p className="text-sm text-green-400 lg:text-lg max-w-xl not-lg:w-[80%] mx-auto mb-10">
            Portal informasi untuk memantau setoran iuran bulanan, alokasi
            pengeluaran acara, serta saldo kas keluarga kita secara jujur dan
            terbuka.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/laporan"
              className="btn btn-primary btn-md lg:btn-lg font-semibold rounded-lg px-8 shadow-xs"
            >
              <FiEye className="w-5 h-5 mr-1.5" />
              Lihat Laporan Keuangan
            </Link>
          </div>
        </div>
      </main>

      {/* 2. Section: Tujuan & Alokasi Dana Kas Keluarga */}
      <section className="bg-base-200/60 border-t border-base-300 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
              Tujuan &amp; Alokasi Kas Keluarga
            </h2>
            <p className="text-sm text-base-content/70 mt-2">
              Untuk apa saja dana iuran yang terkumpul dari seluruh keluarga
              besar kita?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Silaturahmi */}
            <div className="card bg-base-100 border border-base-300 shadow-xs rounded-lg hover:shadow-md transition-shadow">
              <div className="card-body p-6">
                <div className="w-11 h-11 rounded-md bg-secondary flex items-center justify-center mb-3">
                  <FiHeart className="w-5 h-5 text-primary" />
                </div>
                <h3 className="card-title text-lg font-bold">Silaturahmi</h3>
                <p className="text-sm text-base-content/75 leading-relaxed mt-1">
                  Mendukung penyelenggaraan pertemuan rutin agar tali
                  persaudaraan selalu erat terjaga.
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
                  Subsidi biaya sewa penginapan villa, transportasi, hingga
                  konsumsi untuk acara liburan dan rekreasi keluarga besar dari
                  kita dan untuk kita.
                </p>
              </div>
            </div>

            {/* Card 3: Acara & Makan Bersama */}
            <div className="card bg-base-100 border border-base-300 shadow-xs rounded-lg hover:shadow-md transition-shadow">
              <div className="card-body p-6">
                <div className="w-11 h-11 rounded-md bg-secondary flex items-center justify-center mb-3">
                  <FiSmile className="w-5 h-5 text-primary" />
                </div>
                <h3 className="card-title text-lg font-bold">
                  Acara &amp; Makan-Makan Bersama
                </h3>
                <p className="text-sm text-base-content/75 leading-relaxed mt-1">
                  Dana kas yang siap digunakan untuk berbagai acara santai
                  keluarga, makan bersama, serta perayaan momen bahagia agar
                  kumpul keluarga semakin guyub dan menyenangkan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Official DaisyUI Footer Component */}
      <footer className="footer footer-center bg-base-100 text-base-content py-8 border-t border-base-300">
        <aside>
          <div className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center mx-auto mb-2">
            <FiGrid className="w-4 h-4 text-primary" />
          </div>
          <p className="text-sm font-bold">Keluarga Besar Iskandar</p>
          <p className="text-xs font-semibold text-base-content/60">
            Guyub Rukun, Transparan &amp; Selamanya Bersatu
          </p>
        </aside>
      </footer>
    </PublicNavbar>
  );
}
