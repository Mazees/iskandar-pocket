"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiCalendar, FiFilter } from "react-icons/fi";

interface MonthDateFilterProps {
  defaultValue: string; // Format YYYY-MM
}

interface YearFilterProps {
  defaultValue: string; // Format YYYY (misal: "2026")
  availableYears?: string[];
}

/**
 * MonthDateFilter (Client Component)
 * Native HTML <input type="month"> untuk memfilter bulan di Tabel 1
 */
export function MonthDateFilter({ defaultValue }: MonthDateFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="flex items-center gap-1.5">
      <FiCalendar className="w-4 h-4 text-base-content/60" />
      <input
        type="month"
        defaultValue={defaultValue}
        onChange={(e) => {
          const val = e.target.value;
          if (!val) return;
          const params = new URLSearchParams(searchParams.toString());
          params.set("bulan", val);
          router.push(`/dashboard?${params.toString()}`);
        }}
        className="input input-bordered input-sm font-semibold bg-base-100"
      />
    </div>
  );
}

/**
 * YearFilter (Client Component)
 * Dropdown pilihan Tahun yang sleek (HTML5 tidak memiliki type="year" bawaan)
 */
export function YearFilter({ defaultValue, availableYears }: YearFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentYearNum = new Date().getFullYear();
  const defaultList = [
    (currentYearNum + 1).toString(),
    currentYearNum.toString(),
    (currentYearNum - 1).toString(),
    (currentYearNum - 2).toString(),
    (currentYearNum - 3).toString(),
  ];

  const yearList =
    availableYears && availableYears.length > 0 ? availableYears : defaultList;

  return (
    <div className="flex items-center gap-1.5">
      <FiFilter className="w-4 h-4 text-base-content/60" />
      <select
        value={defaultValue}
        onChange={(e) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("tahun", e.target.value);
          router.push(`/dashboard?${params.toString()}`);
        }}
        className="select select-bordered select-sm font-bold bg-base-100"
      >
        {yearList.map((y) => (
          <option key={y} value={y}>
            Tahun {y}
          </option>
        ))}
      </select>
    </div>
  );
}
