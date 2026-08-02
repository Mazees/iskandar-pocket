<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Iskandar Pocket — Agent Guidelines

## Tentang Proyek

Iskandar Pocket adalah **aplikasi kas keluarga transparan** berbasis web. Dikelola oleh 1 Admin (bendahara), bisa diakses publik tanpa login untuk melihat laporan transparansi kas.

## Dokumen Referensi

Sebelum menulis kode, **wajib** baca dokumen berikut:

| Dokumen | Path | Isi |
|---|---|---|
| **PRD** | `PRD-Iskandar-Pocket.md` | Product Requirements, user flow, fitur, ERD, routing |
| **SRS** | `SRS-Iskandar-Pocket.md` | Spesifikasi teknis lengkap: arsitektur, API, komponen, schema, konvensi kode |
| **SQL Migration** | `001_init.sql` | Database schema (tabel, view, RLS policies, indexes) |

## Tech Stack

| Komponen | Teknologi | Versi |
|---|---|---|
| Framework | **Next.js** (App Router) | 16.2.12 |
| UI Library | **React** | 19.2.4 |
| Language | **TypeScript** | ^5 (strict mode) |
| Styling | **Tailwind CSS** | ^4 |
| Backend/DB | **Supabase** (PostgreSQL, Auth, Storage) | Free tier |
| PDF Export | `jspdf` + `jspdf-autotable` | |
| Excel Export | `xlsx` (SheetJS) | |

## Aturan Arsitektur

1. **Server-first**: Gunakan React Server Components (RSC) sebagai default. `'use client'` hanya untuk komponen yang butuh interaktivitas (form, state, event handler).
2. **Supabase sebagai Backend**: Semua data lewat Supabase JS SDK. Tidak ada backend custom.
3. **Server Actions untuk mutasi data**: Semua operasi CRUD pakai Server Actions di `lib/actions/`. Bukan Route Handlers.
4. **Route Handlers** hanya untuk: cron job, export file (PDF/Excel).
5. **RLS sebagai security**: Semua akses data dikontrol via Row Level Security di database level.

## Struktur Folder Kunci

```
app/                  → Halaman (App Router)
  dashboard/          → Area admin (protected)
  laporan/            → Halaman publik transparansi
  login/              → Login admin
  api/                → Route Handlers (cron, export)
components/
  ui/                 → Komponen UI reusable (button, card, table, dll)
  layout/             → Sidebar, header, mobile-nav
  forms/              → Form components (keluarga, iuran, transaksi, pocket)
  tables/             → Table/data display components
lib/
  supabase/           → Supabase client (browser & server), types
  actions/            → Server Actions (CRUD operations)
  utils/              → Format, constants, validators (Zod)
middleware.ts         → Auth redirect (dashboard → login jika belum auth)
```

## Konvensi Kode

| Aspek | Konvensi |
|---|---|
| Bahasa komentar | **Bahasa Indonesia** |
| Nama file/folder | **kebab-case** (`keluarga-form.tsx`) |
| Nama komponen | **PascalCase** (`KeluargaForm`) |
| Nama fungsi/variabel | **camelCase** (`getKeluargaList`) |
| Kolom database | **snake_case** (`nama_keluarga`) |
| Konstanta | **UPPER_SNAKE_CASE** (`MAX_FILE_SIZE`) |

## Aturan Penting

1. **Jangan buat tabel `admin`** — login pakai Supabase Auth bawaan (`auth.users`).
2. **Member (KK) bukan akun** — hanya data yang dikelola admin. Tidak ada login/sesi member.
3. **Saldo pocket dihitung dari view** `v_saldo_pocket` — jangan simpan saldo sebagai kolom statis.
4. **Nominal iuran**: INSERT baris baru ke `configuration`, jangan UPDATE — supaya histori tetap utuh.
5. **Transaksi keluar wajib ada keterangan** — enforced via Zod validation.
6. **Transfer antar pocket** = 2 transaksi atomik (keluar dari sumber + masuk ke tujuan).
7. **Upload bukti** ke Supabase Storage bucket `bukti` — public read, authenticated write.
8. **Semua tabel punya RLS** — publik boleh SELECT, hanya authenticated boleh write.

## Supabase Client Pattern

```typescript
// Server (RSC, Server Actions): import dari lib/supabase/server.ts
import { createClient } from '@/lib/supabase/server'
const supabase = await createClient()

// Browser (Client Components): import dari lib/supabase/client.ts
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()
```

## Server Action Pattern

```typescript
'use server'
// 1. Cek auth (supabase.auth.getUser())
// 2. Validasi input (Zod schema)
// 3. Operasi database
// 4. revalidatePath() + redirect()
// 5. Return { error: string } jika gagal — jangan throw
```

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
CRON_SECRET=
```
