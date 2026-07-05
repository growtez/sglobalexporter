import Link from "next/link";
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
  Mail 
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full flex flex-col z-50 shadow-sm font-sans">
      {/* Top Section */}
      <div className="bg-white w-full border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo Placeholder */}
            <Link href="/" className="flex-shrink-0">
              <div className="bg-[#9d1829] text-white w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center text-2xl font-serif font-bold border border-gray-200 shadow-sm relative overflow-hidden">
                <span className="relative z-10">SG</span>
                {/* Decorative circle text effect approximation */}
                <div className="absolute inset-0 border-4 border-white/20 rounded-full scale-110"></div>
              </div>
            </Link>
            
            {/* Company Info */}
            <div className="flex flex-col justify-center py-1">
              <Link href="/" className="text-xl md:text-[22px] font-semibold text-[#1864b4] hover:text-blue-800 transition-colors">
                Shahinur Global Exporter (Opc) Private Limited
              </Link>
              
              <div className="flex items-center text-sm text-gray-500 mt-1 mb-1.5 gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>South Salmara, Assam</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 md:gap-5 text-xs md:text-[13px]">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-600 fill-green-600 text-white" />
                  <span>GST : 18ABPCS9031G1ZX</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-600 fill-green-600 text-white" />
                  <span>Mobile</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-600 fill-green-600 text-white" />
                  <span>Email</span>
                </div>
                <div className="flex items-center gap-1 font-bold text-gray-700 ml-1">
                  <ThumbsUp className="w-4 h-4 text-[#1864b4] fill-[#1864b4]" />
                  <span>5.0</span> <span className="text-gray-400 font-normal">/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call Now Button */}
          <div className="hidden lg:flex items-center">
            <Link href="tel:+910000000000">
              <Button variant="outline" className="rounded-full border-[#1864b4] text-[#1864b4] hover:bg-blue-50 font-semibold px-5 h-10 shadow-sm">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section (Navigation) */}
      <div className="bg-[#1864b4] w-full">
        <div className="container mx-auto px-4 md:px-8 h-12 flex items-center justify-between">
          {/* Left Nav */}
          <div className="flex items-center h-full text-sm font-semibold text-white">
            <Link href="/" className="px-4 h-full flex items-center hover:bg-white/10 transition-colors border-r border-blue-400/30">
              Home
            </Link>
            
            <div className="px-4 h-full flex items-center hover:bg-white/10 transition-colors cursor-pointer group relative border-r border-blue-400/30">
              <span className="flex items-center gap-1">Our Products <ChevronDown className="w-4 h-4" /></span>
            </div>
            
            <div className="px-4 h-full flex items-center hover:bg-white/10 transition-colors cursor-pointer group relative border-r border-blue-400/30">
              <span className="flex items-center gap-1">About Us <ChevronDown className="w-4 h-4" /></span>
            </div>

            <Link href="/contact" className="px-4 h-full flex items-center hover:bg-white/10 transition-colors border-r border-blue-400/30">
              Contact Us
            </Link>
            
            <div className="ml-3 hidden sm:block">
              <Link href="/enquiry">
                <Button className="bg-white text-[#1864b4] hover:bg-gray-100 rounded shadow-sm font-semibold h-9 px-4">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Enquiry
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Section (Search, Cart, Account) */}
          <div className="flex items-center gap-4 py-1.5">
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search Product/Services" 
                className="pl-4 pr-10 py-1.5 rounded-full text-[13px] w-[220px] lg:w-[280px] focus:outline-none text-gray-800 shadow-inner"
              />
              <Search className="w-4 h-4 text-gray-600 absolute right-3 top-1/2 -translate-y-1/2 font-bold" />
            </div>
            
            <div className="flex items-center gap-2">
              <Link href="/auth/login" className="p-1.5 text-white hover:bg-white/10 rounded-full transition-colors">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
              <Link href="/cart" className="p-1.5 text-white hover:bg-white/10 rounded-full transition-colors relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
