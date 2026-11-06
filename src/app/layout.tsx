import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import GlobalBreadcrumb from "@/components/layout/GlobalBreadcrumb";
import { ThemeProvider } from "@/components/ThemeProvider";
import SiteFooter from "@/components/sections/SiteFooter";
import CartSync from "@/components/cart/CartSync";
import "./globals.css";
import MaintenancePage from "./maintenance/page";

// FAKE 500 MODE: When true, the whole site shows a fake
// "500 Internal Server Error" page. No site code is removed or changed
// below -- set this back to false to restore the original site exactly.
const SHOW_FAKE_500_ERROR = true;

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
  if (SHOW_FAKE_500_ERROR) {
    return (
      <html
        lang="en"
        className={`${outfit.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-screen flex items-center justify-center bg-white font-sans text-stone-900">
          <main className="px-6 text-center">
            <h1 className="mb-4 text-6xl font-bold">500</h1>
            <p className="mb-2 text-xl font-medium">Internal Server Error</p>
            <p className="text-sm text-stone-500">
              The server encountered an internal error and was unable to
              complete your request.
            </p>
          </main>
        </body>
      </html>
    );
  }

  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  if (isMaintenanceMode) {
    return (
      <html
        lang="en"
        className={`${outfit.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col font-sans text-stone-900 bg-[#FDFBF7] dark:bg-[#1C1C1C] dark:text-stone-100 transition-colors">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <MaintenancePage />
          </ThemeProvider>
        </body>
      </html>
    );
  }

  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans text-stone-900 bg-[#FDFBF7] dark:bg-[#1C1C1C] dark:text-stone-100 transition-colors">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CartSync />
          <Navbar />
          <GlobalBreadcrumb />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
