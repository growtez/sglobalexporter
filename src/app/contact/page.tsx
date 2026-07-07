"use client";

import { Suspense } from "react";
import ContactSection from "@/components/sections/ContactSection";

function ContactContent() {
  return (
    <main className="bg-stone-50/50 py-8 md:py-10 font-sans">
      <div className="container mx-auto px-4 max-w-6xl w-full">

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
