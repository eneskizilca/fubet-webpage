import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FUBET - Fırat Üniversitesi Bilişim ve Eğitim Topluluğu",
  description: "Fırat Üniversitesi Bilişim ve Eğitim Topluluğu resmi web sitesi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
