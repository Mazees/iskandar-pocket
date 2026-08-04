"use client";

import React, { useState, useEffect } from "react";
import { FiX, FiCheck, FiAlertCircle, FiSettings } from "react-icons/fi";
import { createConfiguration } from "@/lib/actions/config-actions";
import { showErrorAlert, showSuccessToast } from "@/lib/utils/swal";

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeNominal?: number;
}

/**
 * ConfigModal Component
 * --------------------
 * Form Modal murni berbasis Bulan (Month Picker YYYY-MM) untuk
 * mengubah / menetapkan tarif iuran bulanan baru.
 */
export function ConfigModal({
  isOpen,
  onClose,
  activeNominal = 100000,
}: ConfigModalProps) {
  const [nominal, setNominal] = useState(activeNominal.toString());
  const [berlakuMulaiBulan, setBerlakuMulaiBulan] = useState(
    new Date().toISOString().slice(0, 7) // Format "YYYY-MM"
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setNominal(activeNominal.toString());
      setBerlakuMulaiBulan(new Date().toISOString().slice(0, 7));
    }
  }, [isOpen, activeNominal]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("nominal_iuran_bulanan", nominal);
    formData.append("berlaku_mulai", berlakuMulaiBulan);

    try {
      const res = await createConfiguration(formData);

      if (res.error) {
        setError(res.error);
        showErrorAlert("Validasi Gagal", res.error);
      } else {
        onClose();
        showSuccessToast("Kebijakan tarif nominal iuran berhasil diperbarui!");
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
            <FiSettings className="w-5 h-5 text-primary" />
            Ubah Nominal Iuran Bulanan
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

          {/* 1. Input Nominal Baru */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">
                Nominal Tarif Baru (Per Bulan)
              </span>
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
              <span className="label-text-alt text-base-content/60">
                Nominal ini akan menjadi tarif wajib iuran per KK
              </span>
            </label>
          </div>

          {/* 2. Input Month Picker (Berlaku Mulai Bulan) */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">
                Berlaku Mulai Bulan
              </span>
            </label>
            <input
              type="month"
              required
              value={berlakuMulaiBulan}
              onChange={(e) => setBerlakuMulaiBulan(e.target.value)}
              className="input input-bordered w-full font-medium"
              disabled={loading}
            />
            <label className="label">
              <span className="label-text-alt text-base-content/60">
                Pilih bulan mulai berlakunya tarif baru ini
              </span>
            </label>
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
              Simpan Kebijakan Baru
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
