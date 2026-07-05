import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-forest text-cream py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-2xl font-serif tracking-tight">
            SGlobalExporter
          </Link>
          <p className="text-cream/70 text-sm leading-relaxed max-w-xs">
            Curating the finest Assamese tea and premium rice for the global market. Heritage in every grain and leaf.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-lg">Shop</h4>
          <Link href="/products?category=tea" className="text-sm text-cream/70 hover:text-white transition-colors">Assam Tea</Link>
          <Link href="/products?category=rice" className="text-sm text-cream/70 hover:text-white transition-colors">Premium Rice</Link>
          <Link href="/b2b" className="text-sm text-cream/70 hover:text-white transition-colors">Wholesale Requests</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-lg">Company</h4>
          <Link href="/about" className="text-sm text-cream/70 hover:text-white transition-colors">Our Heritage</Link>
          <Link href="/sustainability" className="text-sm text-cream/70 hover:text-white transition-colors">Sustainability</Link>
          <Link href="/contact" className="text-sm text-cream/70 hover:text-white transition-colors">Contact Us</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-lg">Legal</h4>
          <Link href="/terms" className="text-sm text-cream/70 hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="text-sm text-cream/70 hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/shipping" className="text-sm text-cream/70 hover:text-white transition-colors">Shipping Policy</Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-cream/20 text-center text-sm text-cream/50">
        &copy; {new Date().getFullYear()} SGlobalExporter. All rights reserved.
      </div>
    </footer>
  );
}
