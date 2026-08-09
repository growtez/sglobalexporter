import { Metadata } from "next";
import Link from "next/link";
import { Ship, Plane, FileText, CheckCircle2, ShoppingBag } from "lucide-react";
import ContactSection from "@/components/sections/ContactSection";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Wholesale & Bulk Tea Export | Shahinur Global Exporter",
  description: "Request tea samples, explore our global shipping/export process, and request bulk pricing for Assamese CTC and Orthodox teas.",
};

export default function B2BPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#1C1C1C]">
      {/* Hero Section */}
      <section className="py-20 bg-forest text-cream text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="container mx-auto px-4 max-w-4xl space-y-6 relative z-10">
          <span className="uppercase tracking-widest text-sm font-semibold text-gold">B2B & Wholesale</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold leading-tight">
            Global Bulk Tea Supply & Export
          </h1>
          <p className="text-cream/80 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Partner with Shahinur Global Exporter for premium CTC, Orthodox, and Specialty tea sourcing directly from the estates of Assam.
          </p>
        </div>
      </section>

      {/* Export Process Section */}
      <section id="export-process" className="py-16 border-b border-stone-200/50 dark:border-stone-800 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-5xl space-y-12">
          <div className="text-center space-y-3">
            <span className="uppercase tracking-widest text-sm font-semibold text-gold">How We Work</span>
            <h2 className="text-3xl font-serif font-bold text-forest dark:text-cream">Our Seamless Export Process</h2>
            <p className="text-stone-500 dark:text-stone-400 max-w-xl mx-auto text-sm">
              From fresh harvest sourcing to custom customs clearance and logistics, we manage the complete lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-700/40 relative">
              <span className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center font-bold text-sm">1</span>
              <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mt-2 mb-2">1. Request & Quote</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Specify your tea grades, packing configurations (bulk sacks, custom bags), and target volume. We provide FOB/CIF quotes.
              </p>
            </div>

            <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-700/40 relative">
              <span className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center font-bold text-sm">2</span>
              <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mt-2 mb-2">2. Sample Approval</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                We dispatch pre-shipment samples directly to your office. Once you evaluate and approve the sample, we initiate batch processing.
              </p>
            </div>

            <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-700/40 relative">
              <span className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center font-bold text-sm">3</span>
              <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mt-2 mb-2">3. Docs & Compliance</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Our export team compiles phytosanitary certificates, certificates of origin, FSSAI clearance, and customs paperwork.
              </p>
            </div>

            <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-700/40 relative">
              <span className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center font-bold text-sm">4</span>
              <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mt-2 mb-2">4. Cargo Shipping</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Shipment is sealed in moisture-proof containers and dispatched via ocean (Kolkata Port) or air cargo to your target destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wholesale Capacity Section */}
      <section className="py-16 bg-cream/40 dark:bg-stone-900/10 border-b border-stone-200/50 dark:border-stone-800">
        <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="uppercase tracking-widest text-sm font-semibold text-gold">Capacity & Customization</span>
            <h2 className="text-3xl font-serif font-bold text-forest dark:text-cream">Tailored to Your Specifications</h2>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-light">
              We offer multiple bulk packing and customization options to accommodate retail brands, hotel chains, and local wholesalers globally.
            </p>
            
            <div className="space-y-3">
              <div className="flex gap-3 items-center text-sm text-stone-700 dark:text-stone-200 font-medium">
                <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                <span>Bulk packing (20kg to 50kg multi-layer kraft paper bags or jute bags)</span>
              </div>
              <div className="flex gap-3 items-center text-sm text-stone-700 dark:text-stone-200 font-medium">
                <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                <span>Custom private label retail packaging configuration</span>
              </div>
              <div className="flex gap-3 items-center text-sm text-stone-700 dark:text-stone-200 font-medium">
                <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                <span>Minimum Order Quantity (MOQ) negotiable starting from 100 kg</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-700/40 text-center space-y-2">
              <Ship className="w-8 h-8 text-gold mx-auto" />
              <h4 className="font-bold text-stone-800 dark:text-stone-100">Sea Freight</h4>
              <p className="text-[11px] text-stone-500">CIF / FOB / CFR terms</p>
            </div>
            <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-700/40 text-center space-y-2">
              <Plane className="w-8 h-8 text-gold mx-auto" />
              <h4 className="font-bold text-stone-800 dark:text-stone-100">Air Freight</h4>
              <p className="text-[11px] text-stone-500">Express custom delivery</p>
            </div>
            <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl border border-stone-200/40 dark:border-stone-700/40 text-center space-y-2 col-span-2">
              <FileText className="w-8 h-8 text-gold mx-auto" />
              <h4 className="font-bold text-stone-800 dark:text-stone-100">Quality Certifications</h4>
              <p className="text-[11px] text-stone-500">Tea Board of India, FSSAI, APEDA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form / Request Sample */}
      <section id="sample" className="py-16 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-5xl space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-serif font-bold text-forest dark:text-cream">Request B2B Pricing & Samples</h2>
            <p className="text-stone-500 max-w-md mx-auto text-sm">
              Use the inquiry desk below to specify your wholesale requirement or request a physical pre-shipment sample.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 sm:p-10 border border-stone-200/50 dark:border-stone-700/50">
            <Suspense fallback={
              <div className="text-center py-10 text-stone-500">Loading B2B Desk...</div>
            }>
              <ContactSection />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
