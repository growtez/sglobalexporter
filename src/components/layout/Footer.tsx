"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="w-full bg-forest text-cream py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col gap-4 lg:col-span-1">
          <Link href="/" className="text-2xl font-serif tracking-tight">
            SGlobalExporter
          </Link>
          <p className="text-cream/70 text-sm leading-relaxed max-w-xs">
            Established in 2023, we are a leading Manufacturer, Exporter, Supplier & Trader of premium teas for the global market.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-lg text-white">Our Products</h4>
          <Link href="/products?category=ctc" className="text-sm text-cream/70 hover:text-white transition-colors">CTC Tea</Link>
          <Link href="/products" className="text-sm text-cream/70 hover:text-white transition-colors">Premium Blends</Link>
          <Link href="/contact" className="text-sm text-cream/70 hover:text-white transition-colors">Bulk Inquiries</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-lg text-white">Company</h4>
          <Link href="/about" className="text-sm text-cream/70 hover:text-white transition-colors">About Us</Link>
          <Link href="/products" className="text-sm text-cream/70 hover:text-white transition-colors">Our Products</Link>
          <Link href="/contact" className="text-sm text-cream/70 hover:text-white transition-colors">Contact Us</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-lg text-white">Legal</h4>
          <Link href="/terms" className="text-sm text-cream/70 hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="text-sm text-cream/70 hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/shipping" className="text-sm text-cream/70 hover:text-white transition-colors">Shipping Policy</Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-cream/20 flex flex-col items-center justify-center gap-2.5 text-sm text-cream/50 text-center">
        <p>
          &copy; {new Date().getFullYear()} Shahinur Global Exporter. All rights reserved.
        </p>
        <p>
          Made by <a href="https://growtez.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white font-medium transition-colors">Growtez</a>
        </p>
      </div>
    </footer>
  );
}

