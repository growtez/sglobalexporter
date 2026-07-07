"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cartStore";
import { useSearchStore } from "@/lib/store/searchStore";
import { 
  Search, 
  ShoppingBag, 
  User, 
  Phone, 
  ChevronDown, 
  ChevronRight,
  Mail,
  Menu,
  X,
  ArrowRight
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const itemCount = items.length;
  const { query, setQuery } = useSearchStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    fetchUser();
  }, []);

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

  if (pathname?.startsWith("/admin")) {
    return null;
  }

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
          ? "bg-white/90 dark:bg-stone-950/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.04)] border-b border-stone-200/50 dark:border-stone-800/50" 
          : "bg-white dark:bg-stone-950 border-b border-stone-100/40 dark:border-stone-800/40"
      }`}
    >
      {/* Top micro-bar */}
      <div className="hidden sm:block bg-forest text-white overflow-hidden w-full">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-9 text-[11px] tracking-wide">
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-white/50">GST: 18ABPCS9031G1ZX</span>
            <span className="w-px h-3.5 bg-white/20 hidden md:block" />
            <a href="tel:+919181147813" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Phone className="w-3 h-3" />
              <span>+91 91811 47813</span>
            </a>
            <span className="w-px h-3.5 bg-white/20 hidden sm:block" />
            <a href="mailto:shahinur23287@gmail.com" className="hidden sm:flex items-center gap-1.5 hover:text-gold transition-colors">
              <Mail className="w-3 h-3" />
              <span>shahinur23287@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            {/* Desktop CTA buttons relocated to the top micro-bar */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="tel:+919181147813">
                <button className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white rounded-md px-2.5 py-1 text-[10px] font-bold transition-all cursor-pointer">
                  <Phone className="w-3 h-3 text-gold" />
                  Call Now
                </button>
              </Link>
              <Link href="/contact#inquiry-form">
                <button className="flex items-center gap-1 bg-white hover:bg-white/90 text-forest rounded-md px-2.5 py-1 text-[10px] font-extrabold transition-all cursor-pointer">
                  <Mail className="w-3 h-3 text-forest" />
                  Send Enquiry
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-14 lg:h-[60px]">
          {/* Left: Logo + Brand */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative rounded-xl overflow-hidden border border-gray-100/80 bg-white flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.03] w-10 h-10 lg:w-12 lg:h-12">
              <Image 
                src="/images/logo.webp" 
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
                </div>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Search Input (Desktop) - Shown by default */}
            <div className="hidden lg:block relative w-44 xl:w-56 transition-all duration-300">
              <input 
                type="text" 
                placeholder="Search..." 
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (pathname !== "/products") {
                    router.push("/products");
                  }
                }}
                className="w-full pl-9 pr-8 h-9 rounded-xl text-[12px] bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gold/30 focus:border-gold transition-all placeholder:text-stone-400 font-medium"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {query && (
                <button 
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Theme Toggle (Desktop) */}
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            {/* Cart */}
            <Link 
              href="/cart" 
              className={`hidden lg:flex w-9 h-9 items-center justify-center rounded-xl transition-all duration-200 relative ${
                pathname === "/cart"
                  ? "text-gold bg-stone-100 ring-1 ring-gold/15"
                  : "text-stone-500 hover:text-gold hover:bg-stone-100"
              }`}
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1.5 bg-forest text-white text-[10px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link 
              href={user ? "/profile" : "/auth/login"}
              className={`hidden lg:flex items-center gap-2 rounded-xl h-9 px-2.5 transition-all duration-200 ${
                pathname === "/profile" || pathname.startsWith("/auth/")
                  ? "text-gold bg-stone-100 ring-1 ring-gold/15"
                  : "text-stone-500 hover:text-gold hover:bg-stone-100"
              }`}
            >
              <User className="w-[18px] h-[18px]" />
              {user && (
                <span className={`text-[13px] font-semibold truncate max-w-[100px] ${
                  pathname === "/profile" || pathname.startsWith("/auth/") ? "text-gold" : "text-stone-600"
                }`}>
                  {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                </span>
              )}
            </Link>

            {/* Theme Toggle (Mobile) */}
            <div className="lg:hidden">
              <ThemeToggle />
            </div>

            {/* Mobile: Cart + Hamburger */}
            <Link 
              href="/cart"  
              className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-all relative ${
                pathname === "/cart"
                  ? "text-gold bg-stone-100 ring-1 ring-gold/15"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1.5 bg-forest text-white text-[10px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                  {itemCount}
                </span>
              )}
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
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-0 top-[56px] z-50 transition-all duration-400 ${
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
          className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white dark:bg-stone-950 shadow-2xl flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile Search */}
          <div className="p-4 border-b border-gray-100 dark:border-stone-800">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (pathname !== "/products") {
                    router.push("/products");
                  }
                }}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl text-sm bg-stone-50 border border-stone-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {query && (
                <button 
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex-1 overflow-y-auto py-2">
            {navLinks.map((link, i) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center justify-between px-6 py-4 text-[15px] font-semibold transition-all duration-200 ${
                    isActive ? "text-gold bg-stone-50/80 border-r-4 border-gold" : "text-stone-700 hover:bg-stone-50 hover:text-gold"
                  } ${isMobileMenuOpen ? "animate-in slide-in-from-right" : ""}`}
                  style={{ animationDelay: `${i * 50}ms` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                  <ArrowRight className={`w-4 h-4 transition-colors ${isActive ? "text-gold" : "text-stone-300"}`} />
                </Link>
              );
            })}
          </nav>

          {/* Mobile Bottom Actions */}
          <div className="border-t border-gray-100 p-4 space-y-3 bg-stone-50/50">
            <div className="flex gap-2">
              <Link href={user ? "/profile" : "/auth/login"} className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className={`w-full bg-white h-11 rounded-xl font-semibold border-stone-200 hover:bg-stone-50 transition-all text-xs ${
                  pathname === "/profile" || pathname.startsWith("/auth/")
                    ? "text-gold border-gold/40 bg-stone-50 ring-1 ring-gold/10"
                    : "text-stone-700"
                }`}>
                  <User className="w-3.5 h-3.5 mr-1.5" /> {user ? "Profile" : "Sign In"}
                </Button>
              </Link>
              <Link href="tel:+919181147813" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
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
