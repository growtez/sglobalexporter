"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  User, MapPin, Mail, Phone, ChevronDown,
  CheckCircle2, Send, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeFAQ from "@/components/sections/HomeFAQ";

// Custom SVG Brand Icons since Lucide v1.x has removed brand icons.
const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

function ContactContent() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const productParam = searchParams?.get("product");
    if (productParam) {
      setProduct(productParam);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setProduct("");
    }, 5000);
  };

  return (
    <main className="min-h-screen bg-stone-50/50 pt-4 pb-8 md:pt-6 md:pb-10 font-sans flex items-center">
      <div className="container mx-auto px-4 max-w-6xl w-full">
        <div className="mb-4 flex md:hidden items-center text-[12px] font-medium text-stone-500">
          <a href="/" className="hover:text-gold transition-colors">Home</a>
          <span className="mx-2 text-stone-300">/</span>
          <span className="text-stone-900 font-semibold">Contact Us</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* Left Column: Contact Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="bg-forest text-white rounded-2xl p-5 md:p-7 shadow-[0_15px_40px_rgb(0,0,0,0.05)] relative overflow-hidden flex-1 flex flex-col justify-between">
              {/* Decorative circles */}
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-gold/15 rounded-full blur-2xl"></div>

              <div className="relative z-10 space-y-4 my-auto">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 text-gold text-[10px] font-bold uppercase tracking-wider">
                  <Star className="w-3 h-3 fill-current" /> SGlobalExporter
                </span>
                <h2 className="text-xl md:text-2xl font-bold">Get in Touch</h2>
                <p className="text-stone-300 text-xs leading-relaxed max-w-sm">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>

                <div className="space-y-3.5">
                  <div className="flex items-center gap-3 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/10">
                      <User className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="text-stone-300 text-[9px] font-bold uppercase tracking-wider">Contact Person</p>
                      <p className="font-bold text-xs md:text-sm">Mr. Shahinur Islam</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/10">
                      <MapPin className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="text-stone-300 text-[9px] font-bold uppercase tracking-wider">Office Address</p>
                      <p className="font-medium text-[11px] md:text-xs leading-relaxed text-stone-200">
                        HN 27, Hatigarh Chariali, Guwahati, Kamrup Metropolitan, Assam - 781038
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-[10px] font-semibold text-stone-300 uppercase tracking-wider mb-1.5">Connect with us</p>
                  <div className="flex gap-2">
                    {[
                      { icon: Facebook, name: 'Facebook' },
                      { icon: Twitter, name: 'Twitter' },
                      { icon: Linkedin, name: 'LinkedIn' },
                      { icon: Instagram, name: 'Instagram' }
                    ].map((social, i) => {
                      const Icon = social.icon;
                      return (
                        <div key={i} className="w-7 h-7 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-colors backdrop-blur-sm border border-white/10" title={social.name}>
                          <Icon className="w-3.5 h-3.5 text-stone-200" />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-stone-300">Response Time</p>
                  <p className="text-[11px] text-gold font-medium">Replies within 24h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form Card (7 cols) */}
          <div id="inquiry-form" className="lg:col-span-7 bg-white rounded-2xl p-5 md:p-7 shadow-[0_15px_40px_rgb(0,0,0,0.03)] border border-stone-100 scroll-mt-20">
            <h2 className="text-xl md:text-2xl font-bold text-stone-900 mb-1">Send an Inquiry</h2>
            <p className="text-stone-500 mb-5 text-xs leading-relaxed">
              Tell us what you're looking for, and our team will get back to you with the best quote.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 text-center text-emerald-800 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-base">Inquiry Submitted Successfully!</h3>
                <p className="text-xs text-emerald-700">Thank you for contacting us. We will get back to you shortly with the details.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-bold text-stone-700 uppercase tracking-widest mb-1.5">Product / Service</label>
                  <input 
                    required 
                    type="text" 
                    value={product} 
                    onChange={(e) => setProduct(e.target.value)} 
                    placeholder="e.g., Premium Assam CTC Tea" 
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest focus:bg-white transition-all shadow-sm placeholder-stone-400 font-medium" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-bold text-stone-700 uppercase tracking-widest mb-1.5">Quantity</label>
                    <input required type="number" placeholder="Enter quantity" className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest focus:bg-white transition-all shadow-sm placeholder-stone-400 font-medium" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-stone-700 uppercase tracking-widest mb-1.5">Unit</label>
                    <div className="relative">
                      <select className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-3 pr-8 py-2.5 text-xs text-stone-700 font-medium focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest focus:bg-white transition-all shadow-sm appearance-none cursor-pointer">
                        <option>Kilograms (kg)</option>
                        <option>Metric Tons (MT)</option>
                        <option>Boxes</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-stone-700 uppercase tracking-widest mb-1.5">Mobile Number</label>
                  <div className="flex bg-stone-50 border border-stone-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-forest/20 focus-within:border-forest focus-within:bg-white transition-all shadow-sm">
                    <div className="bg-stone-100 px-3 py-2.5 border-r border-stone-200 text-xs text-stone-700 font-bold flex items-center gap-1.5 shrink-0">
                      +91
                    </div>
                    <input required type="tel" placeholder="Enter your mobile number" className="flex-1 px-3 py-2.5 text-xs font-medium focus:outline-none bg-transparent placeholder-stone-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-stone-700 uppercase tracking-widest mb-1.5">Message (Optional)</label>
                  <textarea placeholder="Any specific requirements or queries..." rows={2} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest focus:bg-white transition-all shadow-sm placeholder-stone-400 font-medium resize-none"></textarea>
                </div>

                <div className="pt-1">
                  <Button type="submit" className="w-full bg-forest hover:bg-forest/90 text-white h-11 text-sm font-bold rounded-lg shadow-sm hover:shadow transition-all duration-300 flex items-center justify-center gap-2">
                    <Send className="w-3.5 h-3.5" /> Submit Inquiry
                  </Button>
                </div>
              </form>
            )}
          </div>

        </div>

        <div id="faq-section" className="mt-12 scroll-mt-20">
          <HomeFAQ />
        </div>

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
