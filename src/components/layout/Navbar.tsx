"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ShoppingBag, 
  User, 
  Phone, 
  ChevronDown, 
  Mail,
  Menu,
  X,
  ArrowRight
} from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full font-sans transition-colors duration-300 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.04)] border-b border-stone-200/50" 
          : "bg-white border-b border-stone-100/40"
      }`}
    >
      {/* Top micro-bar */}
      <div className="hidden sm:block bg-forest text-white overflow-hidden w-full">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-9 text-[11px] tracking-wide">
          <div className="flex items-center gap-4">
            <a href="tel:+910000000000" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Phone className="w-3 h-3" />
              <span>+91 00000 00000</span>
            </a>
            <span className="w-px h-3.5 bg-white/20 hidden sm:block" />
            <a href="mailto:info@sglobalexporter.com" className="hidden sm:flex items-center gap-1.5 hover:text-gold transition-colors">
              <Mail className="w-3 h-3" />
              <span>info@sglobalexporter.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-white/50">GST: 18ABPCS9031G1ZX</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Left: Logo + Brand */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative rounded-xl overflow-hidden border border-gray-100/80 bg-white flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.03] w-12 h-12 lg:w-14 lg:h-14">
              <Image 
                src="/images/logo.png" 
                alt="SGlobalExporter Logo" 
                width={56}
                height={56}
                className="object-contain w-full h-full p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight leading-none text-forest transition-all duration-300 text-base lg:text-xl">
                S<span className="text-gold">Global</span>Exporter
              </span>
              <span className="text-[10px] text-stone-400 font-medium tracking-wider uppercase mt-0.5 hidden sm:block">
                Premium Tea Exporters
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 h-full">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              
              return (
                <div key={link.label} className="relative group h-full flex items-center">
                  {link.hasDropdown ? (
                    <div className="relative flex items-center h-full px-4 cursor-pointer">
                      <span className={`text-[13px] font-semibold transition-colors flex items-center gap-1 ${
                        isActive ? "text-gold" : "text-stone-600 group-hover:text-gold"
                      }`}>
                        {link.label}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180 ${
                          isActive ? "text-gold" : "text-stone-400 group-hover:text-stone-600"
                        }`} />
                      </span>
                      {/* Animated underline */}
                      <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-gold rounded-full transition-transform duration-300 origin-left ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`} />
                    </div>
                  ) : (
                    <Link 
                      href={link.href} 
                      className="relative flex items-center h-full px-4"
                    >
                      <span className={`text-[13px] font-semibold transition-colors ${
                        isActive ? "text-gold" : "text-stone-600 group-hover:text-gold"
                      }`}>
                        {link.label}
                      </span>
                      <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-gold rounded-full transition-transform duration-300 origin-left ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`} />
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Search Toggle (Desktop) */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden lg:flex w-9 h-9 items-center justify-center rounded-xl text-stone-500 hover:text-gold hover:bg-stone-100 transition-all duration-200"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            {/* Account */}
            <Link 
              href="/auth/login" 
              className="hidden lg:flex w-9 h-9 items-center justify-center rounded-xl text-stone-500 hover:text-gold hover:bg-stone-100 transition-all duration-200"
            >
              <User className="w-[18px] h-[18px]" />
            </Link>

            {/* Cart */}
            <Link 
              href="/cart" 
              className="hidden lg:flex w-9 h-9 items-center justify-center rounded-xl text-stone-500 hover:text-gold hover:bg-stone-100 transition-all duration-200 relative"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full ring-2 ring-white" />
            </Link>

            {/* Call Now CTA Button (Desktop) */}
            <Link href="tel:+910000000000" className="hidden lg:block ml-2">
              <Button variant="outline" className="rounded-xl border-forest text-forest hover:bg-forest/5 hover:text-forest font-semibold px-4 h-9 text-[13px] transition-all duration-300">
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                Call Now
              </Button>
            </Link>

            {/* Send Enquiry CTA Button (Desktop) */}
            <Link href="/contact#inquiry-form" className="hidden lg:block">
              <Button className="rounded-xl bg-forest hover:bg-forest/90 text-white font-bold px-5 h-9 text-[13px] shadow-sm hover:shadow-md transition-all duration-300 border-none">
                <Mail className="w-3.5 h-3.5 mr-1.5" />
                Send Enquiry
              </Button>
            </Link>

            {/* Mobile: Cart + Hamburger */}
            <Link 
              href="/cart" 
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-stone-600 hover:bg-stone-100 transition-all relative"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full ring-2 ring-white" />
            </Link>
            <button 
              className="lg:hidden w-10 h-10 flex items-center justify-center text-stone-700 rounded-xl hover:bg-stone-100 transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <span className={`absolute left-0 w-5 h-[2px] bg-stone-700 rounded-full transition-all duration-300 ${isMobileMenuOpen ? "top-[9px] rotate-45" : "top-[3px]"}`} />
                <span className={`absolute left-0 top-[9px] w-5 h-[2px] bg-stone-700 rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 scale-0" : "opacity-100"}`} />
                <span className={`absolute left-0 w-5 h-[2px] bg-stone-700 rounded-full transition-all duration-300 ${isMobileMenuOpen ? "top-[9px] -rotate-45" : "top-[15px]"}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Expandable Search Bar (Desktop) */}
        <div className={`hidden lg:block overflow-hidden transition-all duration-300 ${searchOpen ? "max-h-16 pb-3 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for teas, products, categories..." 
              className="w-full pl-12 pr-5 py-3 rounded-xl text-sm bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all placeholder:text-stone-400"
            />
            <Search className="w-[18px] h-[18px] text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-0 top-[65px] z-50 transition-all duration-400 ${
          isMobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMobileMenuOpen(false)} 
        />

        {/* Panel */}
        <div 
          className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex-1 overflow-y-auto py-2">
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center justify-between px-6 py-4 text-[15px] font-semibold text-stone-700 hover:bg-stone-50 hover:text-gold transition-all duration-200 ${
                  isMobileMenuOpen ? "animate-in slide-in-from-right" : ""
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
                {link.hasDropdown ? (
                  <ChevronDown className="w-4 h-4 text-stone-400" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-stone-300" />
                )}
              </Link>
            ))}

            <div className="mx-6 my-3 h-px bg-stone-100" />

            <Link
              href="/contact#inquiry-form"
              className="flex items-center gap-3 px-6 py-4 text-[15px] font-semibold text-gold hover:bg-stone-50 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Mail className="w-4 h-4" />
              Send Enquiry
            </Link>
          </nav>

          {/* Mobile Bottom Actions */}
          <div className="border-t border-gray-100 p-4 space-y-3 bg-stone-50/50">
            <div className="flex gap-2">
              <Link href="/auth/login" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full bg-white text-stone-700 h-11 rounded-xl font-semibold border-stone-200 hover:bg-stone-50 transition-all text-xs">
                  <User className="w-3.5 h-3.5 mr-1.5" /> Sign In
                </Button>
              </Link>
              <Link href="tel:+910000000000" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full bg-white border-forest text-forest h-11 rounded-xl font-semibold hover:bg-forest/5 transition-all text-xs">
                  <Phone className="w-3.5 h-3.5 mr-1.5" /> Call Now
                </Button>
              </Link>
            </div>
            <Link href="/contact#inquiry-form" className="block w-full" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-forest hover:bg-forest/90 text-white h-12 rounded-xl font-bold shadow-md transition-all flex items-center justify-center">
                <Mail className="w-4 h-4 mr-2" /> Send Enquiry
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
