"use client";

import React, { useState, useEffect } from "react";
import { FiX, FiCheck, FiAlertCircle, FiDollarSign } from "react-icons/fi";
import { createIuran } from "@/lib/actions/iuran-actions";
import { showErrorAlert, showSuccessToast } from "@/lib/utils/swal";

interface KeluargaOption {
  id: string;
  nama_keluarga: string;
}

interface PocketOption {
  id: string;
  nama_pocket: string;
}

interface IuranFormProps {
  isOpen: boolean;
  onClose: () => void;
  listKeluarga: KeluargaOption[];
  listPocket: PocketOption[];
  defaultNominal?: number;
}

/**
 * IuranForm Component
 * -------------------
 * Form Modal minimalis untuk mencatat setoran iuran baru.
 * Hanya butuh Pilih Keluarga, Nominal Diterima, dan Pocket (Cash/Bank).
 * Sistem secara otomatis membagi setoran ke bulan-bulan tertunggak (FIFO).
 */
export function IuranForm({
  isOpen,
  onClose,
  listKeluarga,
  listPocket,
  defaultNominal = 100000,
}: IuranFormProps) {
  const [keluargaId, setKeluargaId] = useState("");
  const [nominal, setNominal] = useState(defaultNominal.toString());
  const [pocketId, setPocketId] = useState("");
  const [tanggalSetor, setTanggalSetor] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [keterangan, setKeterangan] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      if (listPocket.length > 0 && !pocketId) {
        setPocketId(listPocket[0].id);
      }
      if (listKeluarga.length > 0 && !keluargaId) {
        setKeluargaId(listKeluarga[0].id);
      }
    }
  }, [isOpen, listPocket, listKeluarga]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("keluarga_id", keluargaId);
    formData.append("nominal", nominal);
    formData.append("pocket_id", pocketId);
    formData.append("tanggal_setor", tanggalSetor);
    if (keterangan.trim()) {
      formData.append("keterangan", keterangan.trim());
    }

    // Tentukan metode berdasarkan nama pocket (misal "Bank" -> transfer, "Cash" -> cash)
    const selectedPocket = listPocket.find((p) => p.id === pocketId);
    const isBank = selectedPocket?.nama_pocket.toLowerCase().includes("bank");
    formData.append("metode", isBank ? "transfer" : "cash");

    try {
      const res = await createIuran(formData);

      if (res.error) {
        setError(res.error);
        showErrorAlert("Validasi Gagal", res.error);
      } else {
        onClose();
        showSuccessToast("Setoran iuran berhasil dicatat!");
      }
    } catch {
      const msg = "Terjadi kesalahan pada sistem. Silakan coba kembali.";
      setError(msg);
      showErrorAlert("Terjadi Kesalahan", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal modal-open z-50">
      <div className="modal-box bg-base-100 border border-base-300 shadow-2xl max-w-md">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-base-300">
          <h3 className="font-bold text-lg text-base-content flex items-center gap-2">
            <FiDollarSign className="w-5 h-5 text-primary" />
            Catat Setoran Iuran Baru
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost"
            disabled={loading}
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {error && (
            <div className="alert alert-error py-2 text-xs font-semibold">
              <FiAlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. Input Pilih Nama Kepala Keluarga */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">
                Nama Kepala Keluarga
              </span>
            </label>
            <select
              required
              value={keluargaId}
              onChange={(e) => setKeluargaId(e.target.value)}
              className="select select-bordered w-full font-medium"
              disabled={loading}
            >
              <option value="" disabled>
                -- Pilih Kepala Keluarga --
              </option>
              {listKeluarga.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama_keluarga}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Input Nominal Diterima */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Nominal Diterima</span>
            </label>

            <label className="input input-bordered flex items-center gap-2 font-bold text-primary">
              <span>Rp</span>
              <input
                type="number"
                required
                min={1000}
                step={1000}
                placeholder="100000"
                value={nominal}
                onChange={(e) => setNominal(e.target.value)}
                className="grow text-base"
                disabled={loading}
              />
            </label>
            <label className="label">
              <span className="label-text-alt text-base-content/60 text-wrap text-xs">
                Sistem akan membagi otomatis nominal ini ke bulan-bulan
                tertunggak
              </span>
            </label>
          </div>

          {/* 3. Input Pocket / Dompet Tujuan */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">
                Masuk ke Pocket / Dompet
              </span>
            </label>
            <select
              required
              value={pocketId}
              onChange={(e) => setPocketId(e.target.value)}
              className="select select-bordered w-full font-medium"
              disabled={loading}
            >
              {listPocket.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama_pocket}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Input Tanggal Setor */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Tanggal Setor</span>
            </label>
            <input
              type="date"
              required
              value={tanggalSetor}
              onChange={(e) => setTanggalSetor(e.target.value)}
              className="input input-bordered w-full font-medium"
              disabled={loading}
            />
          </div>

          {/* 5. Catatan / Keterangan (Opsional) */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">
                Catatan (Opsional)
              </span>
            </label>
            <input
              type="text"
              placeholder="Contoh: Titip via Mas Budi"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              className="input input-bordered w-full text-sm font-medium"
              disabled={loading}
            />
          </div>

          {/* Modal Actions */}
          <div className="modal-action pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost font-semibold"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn btn-primary font-semibold"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                <FiCheck className="w-4 h-4 mr-1" />
              )}
              Simpan Setoran
            </button>
          </div>
        </form>
      </div>
      <label className="modal-backdrop" onClick={onClose}>
        Close
      </label>
    </div>
  );
}
