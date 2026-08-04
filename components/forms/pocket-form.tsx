"use client";

import React, { useState, useEffect } from "react";
import { FiX, FiCheck, FiAlertCircle, FiFolder } from "react-icons/fi";
import { createPocket, updatePocket } from "@/lib/actions/pocket-actions";
import { showErrorAlert, showSuccessToast } from "@/lib/utils/swal";

interface PocketFormProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: { id: string; nama_pocket: string; saldo_awal: number } | null;
}

/**
 * PocketForm Component
 * --------------------
 * Modal Client Component untuk menambah atau mengedit Akun Pocket (Cash/Bank).
 */
export function PocketForm({ isOpen, onClose, editData }: PocketFormProps) {
  const [namaPocket, setNamaPocket] = useState("");
  const [saldoAwal, setSaldoAwal] = useState("0");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      if (editData) {
        setNamaPocket(editData.nama_pocket);
        setSaldoAwal(editData.saldo_awal.toString());
      } else {
        setNamaPocket("");
        setSaldoAwal("0");
      }
    }
  }, [isOpen, editData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("nama_pocket", namaPocket);
    formData.append("saldo_awal", saldoAwal);

    try {
      let res;
      if (editData?.id) {
        res = await updatePocket(editData.id, formData);
      } else {
        res = await createPocket(formData);
      }

      if (res.error) {
        setError(res.error);
        showErrorAlert("Validasi Gagal", res.error);
      } else {
        onClose();
        showSuccessToast(
          editData
            ? "Pocket berhasil diperbarui!"
            : "Pocket baru berhasil ditambahkan!"
        );
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
            <FiFolder className="w-5 h-5 text-primary" />
            {editData ? "Edit Akun Pocket" : "Tambah Pocket Baru"}
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

          {/* 1. Nama Pocket */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Nama Pocket / Akun Kas</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Kas Cash Bendahara, Rekening BCA, dll"
              value={namaPocket}
              onChange={(e) => setNamaPocket(e.target.value)}
              className="input input-bordered w-full font-medium"
              disabled={loading}
            />
          </div>

          {/* 2. Saldo Awal */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Saldo Awal (Rp)</span>
            </label>
            <label className="input input-bordered flex items-center gap-2 font-bold text-primary">
              <span>Rp</span>
              <input
                type="number"
                required
                min={0}
                placeholder="0"
                value={saldoAwal}
                onChange={(e) => setSaldoAwal(e.target.value)}
                className="grow text-base"
                disabled={loading}
              />
            </label>
            <label className="label">
              <span className="label-text-alt text-base-content/60">
                Nominal saldo saat pertama kali pocket dibuka
              </span>
            </label>
          </div>

          {/* Actions */}
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
              {editData ? "Simpan Perubahan" : "Tambah Pocket"}
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
