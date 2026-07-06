"use client";

import { Suspense } from "react";
import ContactSection from "@/components/sections/ContactSection";

function ContactContent() {
  return (
    <main className="min-h-screen bg-stone-50/50 pt-4 pb-8 md:pt-6 md:pb-10 font-sans flex items-center">
      <div className="container mx-auto px-4 max-w-6xl w-full">
        <div className="mb-4 flex md:hidden items-center text-[12px] font-medium text-stone-500">
          <a href="/" className="hover:text-gold transition-colors">Home</a>
          <span className="mx-2 text-stone-300">/</span>
          <span className="text-stone-900 font-semibold">Contact Us</span>
        </div>

        <ContactSection />
      </div>
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-stone-50/50 flex items-center justify-center font-sans">
        <div className="text-stone-500">Loading form...</div>
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}
