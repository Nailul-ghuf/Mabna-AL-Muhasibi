import type { Metadata } from "next";
import { Montserrat, Open_Sans, Amiri } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Al Muhasibi - Asrama Pendidikan Islam",
  description: "Media Dakwah & Dokumentasi Asrama Al Muhasibi, pusat pengembangan spiritual dan intelektual bagi mahasiswa dalam naungan nilai-nilai Islam.",
  icons: {
    icon: "/assets/FotoGeneral/logo2.png",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { AosInit } from "@/components/AosInit";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${openSans.variable} ${amiri.variable} antialiased bg-[var(--background)] text-[var(--text-primary)]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AosInit />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

