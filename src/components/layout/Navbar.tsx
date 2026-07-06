"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ShoppingBag, 
  User, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ThumbsUp, 
  ChevronDown, 
  Mail,
  Menu,
  X
} from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Section (Sticky on mobile, scrolls away on desktop) */}
      <header className="sticky top-0 lg:relative z-50 bg-white/95 backdrop-blur-md w-full border-b border-gray-100 shadow-sm lg:shadow-none font-sans">
        <div className="container mx-auto px-3 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-5">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <div className="relative w-12 h-12 md:w-[72px] md:h-[72px] rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md bg-white flex items-center justify-center">
                <Image 
                  src="/images/logo.png" 
                  alt="SGlobalExporter Logo" 
                  width={64}
                  height={64}
                  className="object-contain w-full h-full p-1"
                  priority
                />
              </div>
            </Link>
            
            {/* Company Info */}
            <div className="flex flex-col justify-center">
              <Link href="/" className="text-base md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1864b4] to-[#0f3d6e] hover:to-[#1864b4] transition-all tracking-tight leading-tight">
                Shahinur Global Exporter <span className="hidden sm:inline">(Opc) Pvt. Ltd.</span>
              </Link>
              
              <div className="flex flex-wrap items-center text-[11px] md:text-[13px] text-gray-500 mt-0.5 md:mt-1 mb-1 md:mb-1.5 gap-2.5">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 md:w-3.5 h-3 md:h-3.5 text-blue-500" />
                  <span className="font-medium">South Salmara, Assam</span>
                </div>
                <span className="text-gray-300 hidden md:inline">|</span>
                <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100 shadow-sm text-[10px] md:text-[11px]">
                  <CheckCircle2 className="w-3 md:w-3.5 h-3 md:h-3.5 text-emerald-500" />
                  <span className="font-medium">GST: 18ABPCS9031G1ZX</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call Now Button (Desktop) & Hamburger (Mobile) */}
          <div className="flex items-center gap-2">
            <Link href="tel:+910000000000" className="hidden lg:flex">
              <Button className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 h-[42px] shadow-md hover:shadow-lg transition-all duration-300 border-none group relative overflow-hidden">
                <span className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 -translate-x-[150%] group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out z-0"></span>
                <Phone className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">Call Now</span>
              </Button>
            </Link>
            <button 
              className="lg:hidden p-2 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-[100%] left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col z-50 h-[calc(100vh-73px)] overflow-y-auto">
            <div className="p-4 border-b border-gray-100">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl text-sm bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <nav className="flex flex-col py-2">
              <Link href="/" className="px-6 py-3.5 text-[15px] font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-50 flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <div className="px-6 py-3.5 text-[15px] font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-50 flex items-center justify-between cursor-pointer">
                Our Products <ChevronDown className="w-4 h-4" />
              </div>
              <Link href="/about" className="px-6 py-3.5 text-[15px] font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-50 flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                About Us
              </Link>
              <Link href="/contact" className="px-6 py-3.5 text-[15px] font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-50 flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                Contact Us
              </Link>
            </nav>
            
            <div className="p-4 flex gap-3 bg-gray-50 mt-auto">
              <Link href="/auth/login" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                 <Button variant="outline" className="w-full bg-white text-gray-700 h-11 rounded-xl font-semibold border-gray-200">
                    <User className="w-4 h-4 mr-2" /> Login
                 </Button>
              </Link>
              <Link href="/cart" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                 <Button className="w-full bg-[#1864b4] hover:bg-[#0f3d6e] text-white h-11 rounded-xl font-semibold relative">
                    <ShoppingBag className="w-4 h-4 mr-2" /> Cart
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full"></span>
                 </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Bottom Section (Navigation - Desktop) */}
      <nav className="hidden lg:block sticky top-0 z-40 bg-gradient-to-r from-[#1864b4] via-[#155b9a] to-[#0f4477] w-full shadow-lg font-sans">
        <div className="container mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          {/* Left Nav */}
          <div className="flex items-center h-full text-[14px] font-semibold text-white/90">
            <Link href="/" className="px-5 h-full flex items-center hover:text-white transition-colors relative group">
              Home
              <span className="absolute bottom-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-sm"></span>
            </Link>
            
            <div className="px-5 h-full flex items-center hover:text-white transition-colors cursor-pointer group relative">
              <span className="flex items-center gap-1.5">Our Products <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" /></span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-sm"></span>
            </div>
            
            <Link href="/about" className="px-5 h-full flex items-center hover:text-white transition-colors relative group">
              About Us
              <span className="absolute bottom-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-sm"></span>
            </Link>

            <Link href="/contact" className="px-5 h-full flex items-center hover:text-white transition-colors relative group">
              Contact Us
              <span className="absolute bottom-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-sm"></span>
            </Link>
            
            <div className="ml-4">
              <Link href="/enquiry">
                <Button className="bg-white/10 hover:bg-white text-white hover:text-[#1864b4] backdrop-blur-sm rounded-full shadow-sm font-semibold h-9 px-5 transition-all duration-300 border border-white/20">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Enquiry
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Section (Search, Cart, Account) */}
          <div className="flex items-center gap-5 py-1.5">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="pl-5 pr-11 py-2 rounded-full text-[13px] w-[240px] lg:w-[300px] bg-white/10 border border-white/20 focus:bg-white focus:text-gray-900 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 shadow-inner"
              />
              <Search className="w-4 h-4 text-white/70 group-focus-within:text-[#1864b4] absolute right-4 top-1/2 -translate-y-1/2 font-bold transition-colors" />
            </div>
            
            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-all duration-300 relative group">
                <User className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="sr-only">Account</span>
              </Link>
              <Link href="/cart" className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-all duration-300 relative group">
                <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-[1.5px] border-[#155b9a]"></span>
                <span className="sr-only">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
