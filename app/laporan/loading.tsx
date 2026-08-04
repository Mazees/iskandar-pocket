import React from "react";
import { PublicNavbar } from "@/components/layout/public-navbar";

export default function PublicLaporanLoading() {
  return (
    <PublicNavbar>
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 lg:p-8 animate-pulse space-y-6">
        {/* Header Tabs Skeleton */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-base-300 pb-4">
          <div className="space-y-2">
            <div className="skeleton h-7 w-56 rounded-md bg-base-300" />
            <div className="skeleton h-4 w-72 rounded-md bg-base-300/70" />
          </div>
          <div className="skeleton h-10 w-60 rounded-xl bg-base-300" />
        </div>

        {/* 4 Stat Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="card bg-base-200 border border-base-300 shadow-sm p-5 space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="skeleton h-4 w-28 bg-base-300" />
                <div className="skeleton h-10 w-10 rounded-xl bg-base-300" />
              </div>
              <div className="skeleton h-7 w-36 bg-base-300" />
              <div className="skeleton h-3 w-40 bg-base-300/60" />
            </div>
          ))}
        </div>

        {/* Rincian Dompet & Status Keluarga Skeleton */}
        <div className="space-y-6">
          <div className="card bg-base-200 shadow-sm border border-base-300 p-5 space-y-4">
            <div className="skeleton h-5 w-48 bg-base-300" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="skeleton h-14 w-full rounded-xl bg-base-300"
                />
              ))}
            </div>
          </div>

          <div className="card bg-base-200 shadow-sm border border-base-300 p-5 space-y-4">
            <div className="skeleton h-5 w-56 bg-base-300" />
            <div className="skeleton h-40 w-full rounded-xl bg-base-300" />
          </div>
        </div>
      </main>
    </PublicNavbar>
  );
}
