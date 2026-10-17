/**
 * Modul utilitas terpusat untuk kalkulasi keuangan, deteksi transfer,
 * dan penyusunan matriks status iuran (DRY).
 */

export interface TransaksiLike {
  jenis: "masuk" | "keluar" | string;
  nominal: number | string;
  kategori?: string | null;
  keterangan?: string | null;
}

export interface IuranLike {
  keluarga_id?: string;
  nominal: number | string;
  periode?: string;
}

export interface KeluargaLike {
  id: string;
  nama_keluarga: string;
}

export interface StatusIuranBulananItem {
  keluarga_id: string;
  nama_keluarga: string;
  total_setor_bulan_ini: number;
  sudah_setor: boolean;
  lunas_bulan_ini: boolean;
}

export interface MatriksIuranTahunanItem {
  keluarga_id: string;
  nama_keluarga: string;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  mei: number;
  jun: number;
  jul: number;
  agu: number;
  sep: number;
  okt: number;
  nov: number;
  des: number;
  total_setor_tahun_ini: number;
  [key: string]: any;
}

/**
 * Deteksi apakah transaksi merupakan mutasi internal/pindah saldo.
 */
export function isTransferTransaction(t: {
  kategori?: string | null;
  keterangan?: string | null;
}): boolean {
  const isTransferKat =
    !!t.kategori && ["Transfer Masuk", "Transfer Keluar"].includes(t.kategori);
  const isTransferKet =
    !!t.keterangan && t.keterangan.toLowerCase().startsWith("pindah saldo");
  return isTransferKat || isTransferKet;
}

/**
 * Menghasilkan rentang tanggal (startDate, endDate) dari format "YYYY-MM".
 */
export function getDateRangeFromMonth(monthStr: string): {
  startDate: string;
  endDate: string;
} {
  const [yStr, mStr] = monthStr.split("-");
  const year = parseInt(yStr, 10);
  const month = parseInt(mStr, 10);
  const lastDay = new Date(year, month, 0).getDate();

  return {
    startDate: `${monthStr}-01`,
    endDate: `${monthStr}-${String(lastDay).padStart(2, "0")}`,
  };
}

/**
 * Menghitung ringkasan kas: Total Iuran, Total Transaksi Masuk,
 * Total Pemasukan, Total Pengeluaran, dan Saldo Bersih.
 * Transaksi transfer/pindah saldo OTOMATIS dikecualikan.
 */
export function calculateRekapKeuangan(
  iuranList: IuranLike[] = [],
  transaksiList: TransaksiLike[] = [],
) {
  const totalIuran = iuranList.reduce(
    (acc, row) => acc + Number(row.nominal || 0),
    0,
  );

  const nonTransferTx = transaksiList.filter((t) => !isTransferTransaction(t));

  const totalTransaksiMasuk = nonTransferTx
    .filter((t) => t.jenis === "masuk")
    .reduce((acc, t) => acc + Number(t.nominal || 0), 0);

  const totalPengeluaran = nonTransferTx
    .filter((t) => t.jenis === "keluar")
    .reduce((acc, t) => acc + Number(t.nominal || 0), 0);

  const totalPemasukan = totalIuran + totalTransaksiMasuk;
  const saldoBersih = totalPemasukan - totalPengeluaran;

  return {
    totalIuran,
    totalTransaksiMasuk,
    totalPemasukan,
    totalPengeluaran,
    saldoBersih,
  };
}

/**
 * Menyusun daftar status setoran bulanan KK.
 */
export function buildStatusIuranBulanan(
  listKeluarga: KeluargaLike[] = [],
  iuranBulanSelected: IuranLike[] = [],
  targetNominalBulanan: number = 100000,
): StatusIuranBulananItem[] {
  const totalSetorMap: Record<string, number> = {};

  iuranBulanSelected.forEach((row) => {
    if (row.keluarga_id) {
      totalSetorMap[row.keluarga_id] =
        (totalSetorMap[row.keluarga_id] || 0) + Number(row.nominal || 0);
    }
  });

  return listKeluarga.map((k) => {
    const totalSetor = totalSetorMap[k.id] || 0;
    return {
      keluarga_id: k.id,
      nama_keluarga: k.nama_keluarga,
      total_setor_bulan_ini: totalSetor,
      sudah_setor: totalSetor > 0,
      lunas_bulan_ini: totalSetor >= targetNominalBulanan,
    };
  });
}

/**
 * Menyusun matriks 12 bulan (Jan - Des) iuran tahunan per KK.
 */
export function buildMatriksIuranTahunan(
  listKeluarga: KeluargaLike[] = [],
  iuranTahunSelected: IuranLike[] = [],
): MatriksIuranTahunanItem[] {
  const monthKeys = [
    "jan",
    "feb",
    "mar",
    "apr",
    "mei",
    "jun",
    "jul",
    "agu",
    "sep",
    "okt",
    "nov",
    "des",
  ];

  const matrixMap: Record<string, MatriksIuranTahunanItem> = {};

  listKeluarga.forEach((k) => {
    matrixMap[k.id] = {
      keluarga_id: k.id,
      nama_keluarga: k.nama_keluarga,
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      mei: 0,
      jun: 0,
      jul: 0,
      agu: 0,
      sep: 0,
      okt: 0,
      nov: 0,
      des: 0,
      total_setor_tahun_ini: 0,
    };
  });

  iuranTahunSelected.forEach((row) => {
    if (row.keluarga_id && matrixMap[row.keluarga_id] && row.periode) {
      const parts = row.periode.split("-");
      if (parts.length >= 2) {
        const mIndex = parseInt(parts[1], 10) - 1;
        if (mIndex >= 0 && mIndex < 12) {
          const mKey = monthKeys[mIndex];
          const val = Number(row.nominal || 0);
          matrixMap[row.keluarga_id][mKey] += val;
          matrixMap[row.keluarga_id].total_setor_tahun_ini += val;
        }
      }
    }
  });

  return Object.values(matrixMap).sort((a, b) =>
    a.nama_keluarga.localeCompare(b.nama_keluarga),
  );
}

