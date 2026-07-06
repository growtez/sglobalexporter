import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/sections/SiteFooter";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SGlobalExporter | Premium Assam Tea Export – Worldwide",
  description:
    "SGlobalExporter sources and exports the finest single-origin Assam teas — CTC, Orthodox, Green, White, and Golden Tips — to 30+ countries. B2B wholesale, private label, and retail export.",
  keywords: [
    "Assam tea export",
    "premium tea exporter India",
    "CTC Assam tea wholesale",
    "orthodox tea export",
    "B2B tea supplier",
    "golden tips tea",
    "SGlobalExporter",
  ],
  openGraph: {
    title: "SGlobalExporter | Premium Assam Tea Export",
    description: "Exporting the finest Assamese teas to 30+ countries worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-stone-900 bg-[#FDFBF7]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
