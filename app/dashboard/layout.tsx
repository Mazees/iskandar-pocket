import Link from "next/link";
import React from "react";
import {
  FiHome,
  FiUsers,
  FiDollarSign,
  FiCreditCard,
  FiFileText,
  FiSettings,
  FiLogOut,
  FiShield,
  FiFolder,
  FiMenu,
  FiGrid,
} from "react-icons/fi";
import { logout } from "@/app/login/actions";

const NAV_LINKS = [
  { href: "/dashboard", label: "Overview", icon: FiHome },
  { href: "/dashboard/keluarga", label: "Keluarga", icon: FiUsers },
  { href: "/dashboard/iuran", label: "Setoran Iuran", icon: FiDollarSign },
  { href: "/dashboard/transaksi", label: "Transaksi Kas", icon: FiCreditCard },
  { href: "/dashboard/pocket", label: "Dompet Pocket", icon: FiFolder },
  { href: "/dashboard/laporan", label: "Export Laporan", icon: FiFileText },
  { href: "/dashboard/settings", label: "Pengaturan", icon: FiSettings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open bg-base-100 text-base-content min-h-screen">
      {/* Drawer Toggle Checkbox for Mobile */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar Component (Microsoft Excel 365 Ribbon Header Style) */}
        <div className="navbar bg-base-100 border-b border-base-300 shadow-xs px-4 sm:px-8">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost btn-sm"
            >
              <FiMenu className="w-5 h-5" />
            </label>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg">
                Panel Pengelolaan Kas Keluarga
              </span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto bg-base-100">
          {children}
        </main>
      </div>

      {/* Sidebar Drawer Area */}
      <div className="drawer-side z-30">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu bg-base-200 text-base-content min-h-full w-72 p-4 flex flex-col justify-between border-r border-base-300">
          <div>
            {/* Brand Title (Microsoft Excel Green Style) */}
            <div className="p-2 mb-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center shadow-xs">
                <FiGrid className="w-5 h-5 text-primary-content" />
              </div>
              <div>
                <h2 className="font-bold text-base tracking-tight leading-none text-base-content">
                  Iskandar Pocket
                </h2>
                <p className="text-xs text-base-content/60 mt-1 font-medium">
                  Admin Bendahara
                </p>
              </div>
            </div>

            {/* Navigation Menu (DaisyUI Menu with Excel Active State) */}
            <ul className="menu w-full gap-1 p-0">
              {NAV_LINKS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 py-2.5 font-medium rounded-md active:bg-primary active:text-primary-content hover:bg-base-300/60"
                    >
                      <IconComponent className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sidebar Footer Action (With REAL Logout Server Action!) */}
          <div className="pt-4 border-t border-base-300 space-y-2">
            <Link
              href="/"
              className="btn btn-sm btn-outline border-base-300 w-full justify-center gap-2 font-semibold rounded-md"
            >
              Lihat Web Publik
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="btn btn-sm btn-error w-full justify-center gap-2 font-semibold rounded-md"
              >
                <FiLogOut className="w-4 h-4" />
                Keluar (Logout)
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
