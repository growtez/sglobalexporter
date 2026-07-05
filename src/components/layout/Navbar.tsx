import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-stone-200 bg-cream/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="text-2xl font-serif tracking-tight text-forest">
          SGlobalExporter
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="text-stone-600 hover:text-forest transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-stone-600 hover:text-forest transition-colors">
            About Us
          </Link>
          <Link href="/products" className="text-stone-600 hover:text-forest transition-colors">
            Products
          </Link>
          <Link href="/contact" className="text-stone-600 hover:text-forest transition-colors">
            Contact Us
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-stone-600 hover:text-forest transition-colors">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </button>
          <Link href="/auth/login" className="p-2 text-stone-600 hover:text-forest transition-colors">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Link>
          <Link href="/cart" className="p-2 text-stone-600 hover:text-forest transition-colors relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
