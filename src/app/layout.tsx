import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SuggestEventHoverProvider } from '../context/SuggestEventHoverContext';
import VerificationCheck from "@/components/VerificationCheck";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FÜBET - Fırat Üniversitesi Bilişim ve Eğitim Topluluğu",
  description: "Fırat Üniversitesi Bilişim ve Eğitim Topluluğu resmi web sitesi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className="font-sans">
        <SuggestEventHoverProvider>
          <VerificationCheck>
            {children}
          </VerificationCheck>
        </SuggestEventHoverProvider>
      </body>
    </html>
  );
}
