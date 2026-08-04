import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iskandar Pocket — Kas Keluarga Transparan",
  description: "Aplikasi kas keluarga transparan berbasis web",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      data-theme="excel"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body
        className={`${poppins.className} min-h-full flex flex-col bg-base-100 text-base-content`}
      >
        {children}
      </body>
    </html>
  );
}
