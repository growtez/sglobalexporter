import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/pages/SiteFooter";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
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
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-stone-900 bg-[#F9F9F8]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
