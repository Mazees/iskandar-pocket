# 📖 Iskandar Pocket

**Iskandar Pocket** adalah aplikasi pencatatan dan pelaporan transparansi kas keluarga berbasis web yang dibangun khusus untuk Keluarga Besar Bapak Iskandar. Aplikasi ini diciptakan untuk memastikan pengelolaan dana iuran, pengeluaran acara keluarga, rekreasi, serta saldo kas bersama berjalan secara jujur, rapi, dan transparan.

![Iskandar Pocket](https://img.shields.io/badge/Status-Active-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwind-css)

---

## ✨ Fitur Utama

### 1. 🌐 Portal Publik (Transparansi)
*   **Tanpa Login:** Siapapun anggota keluarga dapat memantau saldo, daftar pemasukan/pengeluaran, dan status pembayaran kapan saja melalui tautan publik.
*   **Ringkasan Keuangan:** Tampilan langsung mengenai sisa Saldo Bersih, Pemasukan Bulan Ini, dan Pengeluaran Bulan Ini.
*   **Rekap Iuran Lengkap:** Tabel rekapitulasi setoran iuran per keluarga per bulan, lengkap dengan Matriks 12 Bulan (Januari - Desember) + Total Setoran setahun.
*   **Export File:** Dukungan untuk mengunduh arsip laporan dalam bentuk resmi **PDF** maupun lembar kerja spreadsheet **Excel** (.xlsx).

### 2. 🔐 Dasbor Bendahara (Admin)
*   **Keamanan Ekstra:** Autentikasi ketat menggunakan *Supabase Auth* dan pembatasan data via *Row-Level Security (RLS)* di database.
*   **Kelola Data Keluarga & Tarif:** Pendaftaran anggota/KK keluarga, pengelolaan tarif iuran bulanan wajib yang bisa disesuaikan secara dinamis.
*   **Pencatatan Transaksi:** Mencatat pemasukan (Iuran/Lainnya), pengeluaran operasional/acara, serta fitur Transfer Antar Pocket/Rekening dengan dukungan unggah bukti foto (*receipt*).
*   **Manajemen Multi-Pocket:** Sistem pembagian kas (Kas Tunai, Rekening Bank BCA, dll) agar arus dana selalu tercatat akurat.

---

## 🛠️ Teknologi yang Digunakan

*   **Framework Utama:** [Next.js](https://nextjs.org/) (App Router, React Server Components, Server Actions)
*   **Bahasa Pemrograman:** TypeScript (Strict Mode)
*   **Styling & UI:** [Tailwind CSS v4](https://tailwindcss.com/) + [DaisyUI v5](https://daisyui.com/), [React Icons](https://react-icons.github.io/react-icons/), [SweetAlert2](https://sweetalert2.github.io/)
*   **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL Database, Auth, Storage, Views)
*   **Export Data:** `jspdf`, `jspdf-autotable`, `xlsx` (SheetJS)

---

## 🚀 Cara Menjalankan (Development)

1.  **Clone Repository:**
    ```bash
    git clone https://github.com/yourusername/iskandar-pocket.git
    cd iskandar-pocket
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Pengaturan Environment (.env):**
    Buat file `.env.local` di *root directory* dan masukkan kredensial Supabase Anda:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    ```

4.  **Jalankan Aplikasi:**
    ```bash
    npm run dev
    ```
    Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat aplikasi lokal.

---

## 📂 Struktur Proyek

```text
iskandar-pocket/
├── app/
│   ├── dashboard/       # Dasbor Admin (Protected via Middleware)
│   ├── laporan/         # Portal Transparansi Publik
│   ├── login/           # Halaman Login Admin
│   └── page.tsx         # Halaman Utama (Landing Page)
├── components/
│   ├── forms/           # Komponen Form (Iuran, Transaksi, Keluarga, Konfigurasi)
│   ├── laporan/         # Komponen Render Tampilan Laporan (Publik & Admin)
│   ├── layout/          # Navbar Publik & Sidebar Admin Dasbor
│   ├── tables/          # Komponen Tabel Interaktif
│   └── ui/              # Komponen User Interface Reusable
├── lib/
│   ├── actions/         # Server Actions (Mutasi DB secara aman)
│   ├── supabase/        # Konfigurasi Supabase Client & Server
│   └── utils/           # Helper Utils (Export PDF/Excel, SweetAlert Config)
└── supabase/
    └── 001_init.sql     # Berkas Skema Database & Row-Level Security
```

---

## 🛡️ Aturan Kontribusi & Pengembangan
Harap mematuhi aturan standar arsitektur di dalam berkas `AGENTS.md` & `SRS-Iskandar-Pocket.md`:
*   *Default* penggunaan komponen adalah `React Server Components`.
*   Operasi manipulasi data *Database* selalu menggunakan `Server Actions`, bukan Route Handlers (API Route).
*   Gunakan gaya variabel dengan notasi `camelCase` dan nama berkas menggunakan `kebab-case`.

<p align="center">
  <b>Dari kita, oleh kita, dan untuk kita. Guyub Rukun, Transparan & Selamanya Bersatu.</b>
</p>
