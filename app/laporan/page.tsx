import { createClient } from "@/utils/supabase/server";
import { PublicOverviewView } from "@/components/laporan/public-overview-view";
import { PublicNavbar } from "@/components/layout/public-navbar";
import {
  getDateRangeFromMonth,
  calculateRekapKeuangan,
  buildStatusIuranBulanan,
  buildMatriksIuranTahunan,
} from "@/lib/utils/finance";

export const metadata = {
  title: "Laporan Transparansi Kas — ISPOCKET",
  description: "Laporan transparansi kas publik kas keluarga ISPOCKET",
};

interface PublicLaporanPageProps {
  searchParams: Promise<{ bulan?: string; tahun?: string }>;
}

export default async function PublicLaporanPage({
  searchParams,
}: PublicLaporanPageProps) {
  const supabase = await createClient();
  const params = await searchParams;

  const currentDate = new Date();
  const selectedBulan = params.bulan || currentDate.toISOString().slice(0, 7); // e.g. "2026-08"
  const selectedTahun = params.tahun || currentDate.getFullYear().toString(); // e.g. "2026"

  // 1. Ambil data Pocket dan Transaksi Terakhir
  const { data: listPocketRaw } = await supabase
    .from("v_saldo_pocket")
    .select("*");

  const { data: transaksiTerakhirRaw } = await supabase
    .from("transaksi")
    .select(
      `
      id,
      tanggal,
      jenis,
      nominal,
      keterangan,
      bukti_url,
      pocket_id,
      pocket (
        id,
        nama_pocket
      )
    `,
    )
    .order("tanggal", { ascending: false })
    .limit(5);

  // 2. Ambil seluruh data keluarga (urut abjad)
  const { data: listKeluarga } = await supabase
    .from("keluarga")
    .select("id, nama_keluarga")
    .order("nama_keluarga", { ascending: true });

  // 3. Iuran & Transaksi untuk selectedBulan
  const { data: iuranBulanSelected } = await supabase
    .from("iuran")
    .select("keluarga_id, nominal")
    .eq("periode", selectedBulan);

  const { startDate, endDate } = getDateRangeFromMonth(selectedBulan);
  const { data: txBulanSelected } = await supabase
    .from("transaksi")
    .select("jenis, nominal, keterangan")
    .gte("tanggal", startDate)
    .lte("tanggal", endDate);

  // 4. Ambil tarif wajib untuk selectedBulan
  const firstDateOfSelectedBulan = `${selectedBulan}-01`;
  const { data: configSelectedBulan } = await supabase
    .from("configuration")
    .select("nominal_iuran_bulanan")
    .lte("berlaku_mulai", firstDateOfSelectedBulan)
    .order("berlaku_mulai", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  const targetNominalBulanan = Number(
    configSelectedBulan?.nominal_iuran_bulanan || 100000,
  );

  // 5. Susun Status Bulanan
  const statusBulanIni = buildStatusIuranBulanan(
    listKeluarga || [],
    iuranBulanSelected || [],
    targetNominalBulanan,
  );

  // 6. Matriks 12 Bulan untuk selectedTahun
  const { data: iuranTahunSelected } = await supabase
    .from("iuran")
    .select("keluarga_id, periode, nominal")
    .gte("periode", `${selectedTahun}-01`)
    .lte("periode", `${selectedTahun}-12`);

  const statusTahunIni = buildMatriksIuranTahunan(
    listKeluarga || [],
    iuranTahunSelected || [],
  );

  // 7. Hitung statistik kartu atas secara dinamis (bebas mutasi pindah saldo)
  const totalSaldo =
    (listPocketRaw as any[])?.reduce(
      (acc, item) => acc + Number(item.saldo || 0),
      0,
    ) ?? 0;

  const { totalPemasukan: totalPemasukanBulanIni, totalPengeluaran } =
    calculateRekapKeuangan(iuranBulanSelected || [], txBulanSelected || []);

  const formattedPocket = (listPocketRaw || []).map((p: any) => ({
    pocket_id: p.pocket_id,
    nama_pocket: p.nama_pocket,
    saldo: Number(p.saldo || 0),
  }));

  const formattedTransaksiTerakhir = (transaksiTerakhirRaw || []).map(
    (tx: any) => ({
      id: tx.id,
      tanggal: tx.tanggal,
      jenis: tx.jenis,
      nominal: Number(tx.nominal || 0),
      keterangan: tx.keterangan || "",
      bukti_url: tx.bukti_url || "",
      pocket_id: tx.pocket_id,
      pocket: {
        nama_pocket: tx.pocket?.nama_pocket || "-",
      },
    }),
  );

  const [yStr, mStr] = selectedBulan.split("-");
  const selectedDateObj = new Date(
    parseInt(yStr, 10),
    parseInt(mStr, 10) - 1,
    1,
  );
  const currentMonthName = selectedDateObj.toLocaleString("id-ID", {
    month: "long",
  });
  const periodeLabelFormatted = `${currentMonthName} ${selectedTahun}`;

  return (
    <PublicNavbar>
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 lg:p-8">
        <PublicOverviewView
          totalSaldo={totalSaldo}
          totalPemasukanBulanIni={totalPemasukanBulanIni}
          totalPengeluaran={totalPengeluaran}
          listPocket={formattedPocket}
          transaksiTerakhir={formattedTransaksiTerakhir}
          statusBulanIni={statusBulanIni}
          statusTahunIni={statusTahunIni}
          periodeLabel={periodeLabelFormatted}
          currentBulanStr={selectedBulan}
          currentTahunStr={selectedTahun}
        />
      </main>
    </PublicNavbar>
  );
}
