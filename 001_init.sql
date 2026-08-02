-- =========================================================
-- Iskandar Pocket — Initial Migration (001_init.sql)
-- Target: Supabase (PostgreSQL)
-- =========================================================

create extension if not exists "pgcrypto"; -- untuk gen_random_uuid()

-- ---------------------------------------------------------
-- Login Admin: TIDAK pakai tabel manual.
-- Gunakan Supabase Auth bawaan (auth.users) — buat 1 user admin
-- lewat Supabase Dashboard > Authentication > Add User.
-- Semua policy RLS di bawah memakai auth.role() = 'authenticated'
-- untuk mengenali admin yang sudah login.
-- ---------------------------------------------------------

-- ---------------------------------------------------------
-- 1. KELUARGA (Member) — data dikelola Admin, bukan akun
-- ---------------------------------------------------------
create table if not exists keluarga (
    id             uuid primary key default gen_random_uuid(),
    nama_keluarga  text not null,
    created_at     timestamptz not null default now()
);

-- ---------------------------------------------------------
-- 2. CONFIGURATION — histori nominal iuran bulanan
-- ---------------------------------------------------------
-- Tiap kali admin ubah nominal, insert baris baru (jangan update baris lama)
-- supaya histori nominal per periode tetap akurat.
create table if not exists configuration (
    id                     uuid primary key default gen_random_uuid(),
    nominal_iuran_bulanan  numeric(14,2) not null,
    berlaku_mulai          date not null,
    created_at             timestamptz not null default now()
);

-- Seed nominal default awal: Rp100.000, berlaku sejak hari ini
insert into configuration (nominal_iuran_bulanan, berlaku_mulai)
values (100000, current_date)
on conflict do nothing;

-- ---------------------------------------------------------
-- 3. POCKET (Cash & Bank)
-- ---------------------------------------------------------
create table if not exists pocket (
    id          uuid primary key default gen_random_uuid(),
    nama_pocket text not null,
    saldo_awal  numeric(14,2) not null default 0,
    created_at  timestamptz not null default now()
);

-- Seed 2 pocket default
insert into pocket (nama_pocket, saldo_awal)
values ('Cash', 0), ('Bank', 0)
on conflict do nothing;

-- ---------------------------------------------------------
-- 4. IURAN (setoran per keluarga per bulan)
-- ---------------------------------------------------------
create table if not exists iuran (
    id            uuid primary key default gen_random_uuid(),
    keluarga_id   uuid not null references keluarga(id) on delete cascade,
    periode       char(7) not null, -- format 'YYYY-MM', misal '2026-08'
    tanggal_setor date not null default current_date,
    nominal       numeric(14,2) not null check (nominal > 0),
    metode        text not null check (metode in ('cash', 'transfer')),
    keterangan    text,
    bukti_url     text,
    pocket_id     uuid not null references pocket(id),
    created_at    timestamptz not null default now()
);

create index if not exists idx_iuran_keluarga_periode on iuran (keluarga_id, periode);

-- ---------------------------------------------------------
-- 5. TRANSAKSI (kas masuk/keluar umum, di luar iuran)
-- ---------------------------------------------------------
-- Murni dicatat & dimiliki oleh Admin — tidak ada relasi ke tabel keluarga,
-- karena transaksi bukan sesuatu yang "dipegang" atau diinisiasi oleh keluarga.
create table if not exists transaksi (
    id          uuid primary key default gen_random_uuid(),
    tanggal     date not null default current_date,
    jenis       text not null check (jenis in ('masuk', 'keluar')),
    kategori    text not null,
    nominal     numeric(14,2) not null check (nominal > 0),
    keterangan  text,
    bukti_url   text[], -- bisa banyak gambar bukti
    pocket_id   uuid not null references pocket(id),
    created_at  timestamptz not null default now()
);

create index if not exists idx_transaksi_tanggal on transaksi (tanggal);
create index if not exists idx_transaksi_pocket on transaksi (pocket_id);

-- ---------------------------------------------------------
-- 6. VIEW: Saldo otomatis per Pocket
-- ---------------------------------------------------------
create or replace view v_saldo_pocket as
select
    p.id                as pocket_id,
    p.nama_pocket,
    p.saldo_awal
        + coalesce((select sum(i.nominal) from iuran i where i.pocket_id = p.id), 0)
        + coalesce((select sum(t.nominal) from transaksi t where t.pocket_id = p.id and t.jenis = 'masuk'), 0)
        - coalesce((select sum(t.nominal) from transaksi t where t.pocket_id = p.id and t.jenis = 'keluar'), 0)
        as saldo
from pocket p;

-- ---------------------------------------------------------
-- 7. VIEW: Status setoran iuran per keluarga per bulan berjalan
-- ---------------------------------------------------------
create or replace view v_status_iuran_bulan_ini as
select
    keluarga.id            as keluarga_id,
    keluarga.nama_keluarga,
    coalesce(sum(i.nominal), 0) as total_setor_bulan_ini,
    case when sum(i.nominal) > 0 then true else false end as sudah_setor
from keluarga
left join iuran i
    on i.keluarga_id = keluarga.id
group by keluarga.id, keluarga.nama_keluarga;

-- ---------------------------------------------------------
-- 7B. VIEW: Status setoran iuran per keluarga untuk Tahun berjalan
-- ---------------------------------------------------------
create or replace view v_status_iuran_tahun_ini as
select
    keluarga.id            as keluarga_id,
    keluarga.nama_keluarga,
    to_char(current_date, 'YYYY') as tahun,
    coalesce(sum(i.nominal), 0)   as total_setor_tahun_ini,
    count(i.id)                   as jumlah_bulan_setor,
    case 
      when count(i.id) >= 12 then true 
      else false 
    end as lunas_setahun
from keluarga
left join iuran i
    on i.keluarga_id = keluarga.id
    and i.periode like to_char(current_date, 'YYYY') || '-%'
group by keluarga.id, keluarga.nama_keluarga;

-- ---------------------------------------------------------
-- 7C. VIEW: Rekap 1 baris untuk angka Pemasukan (Iuran + Transaksi Masuk) & Pengeluaran bulan berjalan
-- ---------------------------------------------------------
create or replace view v_rekap_bulan_ini as
select
    -- Total Pemasukan: Iuran bulanan + Transaksi Kas Masuk
    (
        coalesce((select sum(nominal) from iuran where periode = to_char(current_date, 'YYYY-MM')), 0)
      + coalesce((select sum(nominal) from transaksi where jenis = 'masuk' and to_char(tanggal, 'YYYY-MM') = to_char(current_date, 'YYYY-MM')), 0)
    ) as total_pemasukan,
    -- Total Pengeluaran: Transaksi Kas Keluar
    coalesce((
        select sum(nominal) 
        from transaksi 
        where jenis = 'keluar' 
          and to_char(tanggal, 'YYYY-MM') = to_char(current_date, 'YYYY-MM')
    ), 0) as total_pengeluaran;

-- ---------------------------------------------------------
-- 7D. VIEW: Rekap 1 baris untuk angka Pemasukan (Iuran + Transaksi Masuk) & Pengeluaran tahun berjalan
-- ---------------------------------------------------------
create or replace view v_rekap_tahun_ini as
select
    -- Total Pemasukan: Iuran bulanan + Transaksi Kas Masuk tahun ini
    (
        coalesce((select sum(nominal) from iuran where periode like to_char(current_date, 'YYYY') || '-%'), 0)
      + coalesce((select sum(nominal) from transaksi where jenis = 'masuk' and to_char(tanggal, 'YYYY') = to_char(current_date, 'YYYY')), 0)
    ) as total_pemasukan,
    -- Total Pengeluaran: Transaksi Kas Keluar tahun ini
    coalesce((
        select sum(nominal) 
        from transaksi 
        where jenis = 'keluar' 
          and to_char(tanggal, 'YYYY') = to_char(current_date, 'YYYY')
    ), 0) as total_pengeluaran;

-- ---------------------------------------------------------
-- 8. ROW LEVEL SECURITY (RLS)
-- Konsep akses: Admin (authenticated via Supabase Auth) bisa CRUD semua,
-- Publik (anon) hanya bisa SELECT (read-only, transparansi).
-- ---------------------------------------------------------
alter table keluarga enable row level security;
alter table configuration enable row level security;
alter table pocket enable row level security;
alter table iuran enable row level security;
alter table transaksi enable row level security;

-- Publik & Admin: boleh SELECT semua (transparansi penuh)
create policy "public read keluarga" on keluarga for select using (true);
create policy "public read configuration" on configuration for select using (true);
create policy "public read pocket" on pocket for select using (true);
create policy "public read iuran" on iuran for select using (true);
create policy "public read transaksi" on transaksi for select using (true);

-- Hanya Admin (authenticated via Supabase Auth) yang boleh INSERT/UPDATE/DELETE
create policy "admin write keluarga" on keluarga for all
    using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write configuration" on configuration for all
    using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write pocket" on pocket for all
    using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write iuran" on iuran for all
    using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write transaksi" on transaksi for all
    using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
