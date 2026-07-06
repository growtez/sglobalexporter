"use client";

import { useState } from "react";
import { 
  User, MapPin, Mail, Phone, ChevronDown, 
  CheckCircle2, Send, Star, MessageSquare 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-stone-50/50 py-16 md:py-24 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-4 tracking-tight">
            Contact Us
          </h1>
          <p className="text-stone-600 text-lg">
            Have questions about our premium tea collections or export services? Get in touch with our team today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-forest text-white rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgb(0,0,0,0.05)] relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-gold/15 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-gold text-xs font-bold uppercase tracking-wider mb-6">
                  <Star className="w-3.5 h-3.5 fill-current" /> SGlobalExporter
                </span>
                <h2 className="text-3xl font-bold mb-3">Get in Touch</h2>
                <p className="text-stone-300 text-sm mb-10 leading-relaxed">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/10">
                      <User className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-stone-300 text-xs font-bold uppercase tracking-wider mb-1">Contact Person</p>
                      <p className="font-bold text-lg">Mr. Shahinur Islam</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/10">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-stone-300 text-xs font-bold uppercase tracking-wider mb-1">Office Address</p>
                      <p className="font-medium text-sm leading-relaxed text-stone-200">
                        Pipulbari part 1, Hatsingimari, Mankachar, Dhubri, South Salmara, Assam - 783135
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/20">
                  <p className="text-sm font-semibold mb-4 text-stone-100">Connect with us</p>
                  <div className="flex gap-3">
                    {['Facebook', 'Twitter', 'LinkedIn', 'Pinterest'].map((social, i) => (
                      <div key={i} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-colors backdrop-blur-sm border border-white/10">
                        <span className="text-xs font-bold">{social[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick response note */}
            <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold flex-shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-sm">Response Time</h4>
                <p className="text-stone-500 text-xs mt-0.5">We typically reply within 24 business hours.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form Card (7 cols) */}
          <div id="inquiry-form" className="lg:col-span-7 bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgb(0,0,0,0.03)] border border-stone-100 scroll-mt-24">
            <h2 className="text-2xl font-bold text-stone-900 mb-2">Send an Inquiry</h2>
            <p className="text-stone-500 mb-8 text-sm leading-relaxed">
              Tell us what you're looking for, and our team will get back to you with the best quote.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center text-emerald-800 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-lg">Inquiry Submitted Successfully!</h3>
                <p className="text-sm text-emerald-700">Thank you for contacting us. We will get back to you shortly with the details.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-widest mb-2">Product / Service</label>
                  <input required type="text" placeholder="e.g., Premium Assam CTC Tea" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest focus:bg-white transition-all shadow-sm placeholder-stone-400 font-medium" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-widest mb-2">Quantity</label>
                    <input required type="number" placeholder="Enter quantity" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest focus:bg-white transition-all shadow-sm placeholder-stone-400 font-medium" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-widest mb-2">Unit</label>
                    <div className="relative">
                      <select className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-4 pr-10 py-3.5 text-sm text-stone-700 font-medium focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest focus:bg-white transition-all shadow-sm appearance-none cursor-pointer">
                        <option>Kilograms (kg)</option>
                        <option>Metric Tons (MT)</option>
                        <option>Boxes</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-widest mb-2">Mobile Number</label>
                  <div className="flex bg-stone-50 border border-stone-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-forest/20 focus-within:border-forest focus-within:bg-white transition-all shadow-sm">
                    <div className="bg-stone-100 px-4 py-3.5 border-r border-stone-200 text-sm text-stone-700 font-bold flex items-center gap-2 shrink-0">
                      +91
                    </div>
                    <input required type="tel" placeholder="Enter your mobile number" className="flex-1 px-4 py-3.5 text-sm font-medium focus:outline-none bg-transparent placeholder-stone-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-widest mb-2">Message (Optional)</label>
                  <textarea placeholder="Any specific requirements or queries..." rows={4} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest focus:bg-white transition-all shadow-sm placeholder-stone-400 font-medium resize-none"></textarea>
                </div>
                
                <div className="pt-3">
                  <Button type="submit" className="w-full bg-forest hover:bg-forest/90 text-white py-6 h-auto text-base font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Submit Inquiry
                  </Button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}
